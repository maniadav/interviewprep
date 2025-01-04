# Deploying Docker Container on Google Cloud with GitHub Actions

This guide provides a step-by-step walkthrough for deploying a Docker container on Google Cloud using GitHub Actions. It includes approaches for both the Google Cloud UI and Google Cloud Console. We will also address relevant questions as they arise during the process.

---

## Prerequisites

1. **Google Cloud Platform (GCP)**
   * A Google Cloud project with billing enabled.
   * Cloud Run and Artifact Registry APIs enabled.
   * A service account with appropriate IAM roles.
2. **GitHub Repository**
   * A repository containing the code and `Dockerfile`.
   * GitHub Actions configured in the repository.
3. **Installed Tools** (for local testing)
   * `gcloud` CLI
   * Docker
4. **Secrets**
   * Store `GCP_CREDENTIALS` (JSON key for the service account) and `GCP_PROJECT` (Google Cloud Project ID) as GitHub secrets.

---

## Steps for Deployment

### **1. Configure Google Cloud**

#### Using Google Cloud UI

1. Go to the [IAM &amp; Admin](https://console.cloud.google.com/iam-admin) page.
2. Create a new **service account** named `github-actions`.
3. Grant the following roles to the service account:
   * Cloud Run Admin (`roles/run.admin`)
   * Artifact Registry Admin (`roles/artifactregistry.admin`)
4. Download the JSON key for the service account.

#### Using Google Cloud Console

Run the following commands:

```bash
# Create the service account
gcloud iam service-accounts create github-actions \
    --display-name "GitHub Actions Service Account"

# Assign roles
PROJECT_ID=$(gcloud config get-value project)
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:github-actions@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/run.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:github-actions@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/artifactregistry.admin"
```

**Question:** *Where is this file needed?*

* The JSON key file from the service account must be added as a secret in your GitHub repository under the name `GCP_CREDENTIALS`.

---

### **2. Add a GitHub Actions Workflow**

1. Create a directory `.github/workflows` in your repository.
2. Add a `deploy.yml` file with the following content:

```yaml
name: Deploy to Google Cloud Run

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Authenticate with Google Cloud
      uses: google-github-actions/auth@v1
      with:
        credentials_json: ${{ secrets.GCP_CREDENTIALS }}

    - name: Set up Cloud SDK
      uses: google-github-actions/setup-gcloud@v1
      with:
        project_id: ${{ secrets.GCP_PROJECT }}
        service_account_email: github-actions@${{ secrets.GCP_PROJECT }}.iam.gserviceaccount.com

    - name: Configure Docker to use Google Artifact Registry
      run: gcloud auth configure-docker

    - name: Build and Tag Docker Image
      run: |
        docker build -t gcr.io/${{ secrets.GCP_PROJECT }}/my-app:$GITHUB_SHA .
        docker push gcr.io/${{ secrets.GCP_PROJECT }}/my-app:$GITHUB_SHA

    - name: Deploy to Cloud Run
      run: |
        gcloud run deploy my-app \
          --image gcr.io/${{ secrets.GCP_PROJECT }}/my-app:$GITHUB_SHA \
          --region us-central1 \
          --platform managed \
          --allow-unauthenticated \
          --port 3000
```

3. Commit and push the file to the repository.

---

### **3. Setup Cloud Build (Optional)**

If you want to trigger builds automatically from a GitHub branch:

1. Navigate to **Cloud Build** > **Triggers** in the Google Cloud UI.
2. Set up a new trigger with the following configuration:
   * **Source Repository** : Select your GitHub repository.
   * **Build Configuration** : Use Dockerfile or specify custom build steps.

**Question:** *What should I choose here?*

* **Build Type** : Select `Dockerfile` if you have one, or use `Google Cloud's buildpacks` for supported languages like Node.js.

---

### **4. Deploy Using Google Cloud Run**

#### Using Google Cloud UI

1. Navigate to **Cloud Run** in the Google Cloud Console.
2. Click  **Create Service** .
3. Configure the following:
   * **Source** : Select `Deploy one revision from an existing container image`.
   * **Container URL** : Provide the image URL from Artifact Registry (e.g., `gcr.io/[PROJECT_ID]/my-app`).
   * Set the appropriate  **memory** ,  **CPU** , and **port** settings.
   * Enable **unauthenticated access** if required.

#### Using Google Cloud Console

Run the following command:

```bash
gcloud run deploy my-app \
    --image gcr.io/$PROJECT_ID/my-app:$GITHUB_SHA \
    --region us-central1 \
    --platform managed \
    --allow-unauthenticated \
    --port 3000
```

---

### **5. Cleanup Policies for Artifact Registry**

**Question:** *What type should I select?*

* **Delete Artifacts** : Automatically delete artifacts based on criteria.
* **Dry Run** : Test the cleanup process without actual deletion.

Choose **Delete Artifacts** if you want automatic cleanup, or use **Dry Run** to verify policies first.

---

## Additional Notes

* Ensure that your Dockerfile is correctly configured for multi-stage builds if needed.
* Regularly update your IAM policies to maintain security.
* Test deployments locally before automating them with GitHub Actions.


`gcr.io` stands for  **Google Container Registry** . It is a domain provided by Google Cloud to host and manage Docker container images securely.

### Key Points about `gcr.io`:

1. **Purpose** :

* It is part of Google Artifact Registry (or the older Container Registry) and is used to store and serve container images for deployment to Google Cloud services like Cloud Run, GKE (Google Kubernetes Engine), and others.

1. **Structure** :
   A typical image URL looks like this:

```
   gcr.io/[PROJECT_ID]/[IMAGE_NAME]:[TAG]
```

* **`[PROJECT_ID]`** : The Google Cloud project ID where the image is stored.
* **`[IMAGE_NAME]`** : The name you assign to your Docker image (e.g., `rock-oak-soccer-frontend`).
* **`[TAG]`** : A version tag for the image, commonly `latest` or a Git commit hash (e.g., `$GITHUB_SHA`).

1. **Examples** :

* `gcr.io/my-project/my-app:latest` (Project ID: `my-project`, Image Name: `my-app`, Tag: `latest`).
* `gcr.io/sample-project/webapp:v1.0.0`.

1. **Usage** :

* Integrated seamlessly with Google Cloud services for building, storing, and deploying containerized applications.
* Accessible using the `gcloud` CLI or Docker CLI.

### Why Use `gcr.io`?

* **Security** : Managed by Google, with built-in encryption and role-based access control (RBAC).
* **Integration** : Simplifies workflows for Google Cloud deployments.
* **Performance** : Optimized for Google Cloud's infrastructure.

If you're using the newer  **Artifact Registry** , the domain might differ, such as `us-central1-docker.pkg.dev`. Let me know if you'd like to know more about transitioning to Artifact Registry!
