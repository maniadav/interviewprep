# Docker Basics

This README provides an overview of essential Docker commands and concepts, including working with Docker images, containers, and using Docker in development and production environments.

## Table of Content

- [Introduction to Docker](#introduction-to-docker)
- [Docker Images vs Containers](#docker-images-vs-containers)
- [Docker Commands](#docker-commands)
  - [Working with Images](#working-with-images)
  - [Working with Containers](#working-with-containers)
  - [Development Mode](#development-mode)
  - [Production Mode](#production-mode)
  - [Stop and Remove Containers](#stop-and-remove-containers)
- [How to Build Docker Images](#how-to-build-docker-images)
- [Docker Authentication](#docker-authentication)
- [Common Docker Commands](#common-docker-commands)
- [Production/Development Docker Environment](#productiondevelopment-docker-environment)
  - [Development Dockerfile](#development-dockerfile)
  - [Production Dockerfile](#production-dockerfile)


1. **[Role of Kubernetes and Docker](#role-of-kubernetes-and-docker)**
2. **[Auto Scaling](#auto-scaling)**
3. **[Image Pull Policy](#image-pull-policy)**
4. **[Service and Auto Discovery](#service-and-auto-discovery)**
5. **[Selector and Labels](#selector-and-labels)**
6. **[Load Port and Load Balancer](#load-port-and-load-balancer)**
7. **[External Application Access](#external-application-access)**
8. **[Deployment Strategies](#deployment-strategies)**
9. **[Rolling Deployment](#rolling-deployment)**
10. **[Auto Scaling Deployment](#auto-scaling-deployment)**
11. **[DaemonSet](#daemonset)**


## Introduction to Docker

Docker is a platform for automating the deployment, scaling, and management of applications inside lightweight containers. Containers bundle an application with all its dependencies and configurations.

## Docker Images vs Containers

- **Docker Image**: A read-only template that includes the application and all its dependencies.
- **Docker Container**: A running instance of a Docker image. Containers are isolated from each other and the host system.

### Key Differences:

- **Image**: Immutable, used to create containers.
- **Container**: Mutable, an instance of an image that can be stopped, started, and modified.

## Docker Commands

### Working with Images

- **List all Docker images**:

  ```bash
  docker images
  ```
- **Pull an image from Docker Hub**:

  ```bash
  docker pull <image_name>:<tag>
  ```
- **Build an image from a Dockerfile**:

  ```bash
  docker build -t <image_name>:<tag> .
  ```
- **Remove an image**:

  ```bash
  docker rmi <image_name>:<tag>
  ```

### Working with Containers

- **Run a container**:

  ```bash
  docker run -d --name <container_name> <image_name>:<tag>
  ```

  - `-d`: Run the container in detached mode (in the background).
  - `--name`: Assign a custom name to the container.
- **List all running containers**:

  ```bash
  docker ps
  ```
- **List all containers (including stopped)**:

  ```bash
  docker ps -a
  ```
- **Stop a running container**:

  ```bash
  docker stop <container_name>
  ```
- **Remove a container**:

  ```bash
  docker rm <container_name>
  ```
- **Inspect a container** (view container's metadata):

  ```bash
  docker inspect <container_name>
  ```

## Docker Authentication

- **Login to Docker Hub**:
  To access private Docker repositories or to push your images, you need to authenticate:
  ```bash
  docker login
  ```

## Build Docker Container

To build a Docker container, use the following command:

```bash
docker build -t <container-name-with-version> .
```

This command builds an image based on the `Dockerfile` in the current directory and tags it with the specified name and version.

## Run Your Container

To run a container from an image:

```bash
docker run -p 3000:3000 <container-name-with-version>
```

This command maps the host's port 3000 to the container's port 3000, allowing you to access the application on `localhost:3000`.

## Starting a New Container With Specific Name

To start a container with a specified name and port mapping:

```bash
docker run --name <container_name> -p 8080:80 <container_image_with_version>
```

This command starts a new container named `<container_name>` and maps port 80 inside the container to port 8080 on your host.

## List Docker Containers

To list all containers, including stopped ones:

```bash
docker ps -a
```

## Remove a Container

To remove a stopped container by its ID:

```bash
docker rm <container ID>
```

## List Running Containers

To list only running containers:

```bash
docker ps
```

## Stop a Running Container

To stop a running container:

```bash
docker stop <container name>
```

## Remove a Running Container

To remove a running container:

```bash
docker rm <container name>
```

## Rename a Container

To rename an existing container:

```bash
docker rename <from_name> <to_name>
```

## Production/Development Docker Environment

When developing and deploying with Docker, it’s common to have different configurations for development and production.

### Separate Development and Production Modes

- For **development**, you may want to mount volumes and use tools like `nodemon` to automatically reload the app without rebuilding the container every time.
- For **production**, you will typically want optimized containers that run in detached mode without the need for code changes or hot reloading.

### Enable Hot-Reloading with Volumes

In development, use Docker volumes to mount your local code directory into the container:

```bash
docker run -p 5500:5500 -v $(pwd):/app <image-name>
```

### Simplify the Development Workflow

Install `nodemon` and `tsc` in your dev environment. Then, use `npm run dev` to automatically rebuild and restart the application when changes are detected.

---

### **Development Dockerfile**

For development, use a Dockerfile like the following:

```dockerfile
# Use Node.js Alpine image for smaller builds.
FROM node:23-alpine

# Set working directory
WORKDIR /app

# Copy package.json and lockfile for dependency installation
COPY package.json yarn.lock ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . ./

# Expose application port
EXPOSE 5500

# Set environment variables
ENV NODE_ENV=development
ENV PORT=5500
ENV HOSTNAME="0.0.0.0"

# Default command for development
CMD ["npm", "run", "dev"]
```

### **Running the Development Container**

1. Build the container

   ```
   docker build -f Dockerfile.dev -t rock-oak-backend-dev .
   ```

   Run the Docker Container with Hot-Reloading**:
   Use Docker volumes to map your local code to the container:

   ```bash
   docker run -p 5500:5500 -v $(pwd):/app rock-oak-backend-dev
   ```
2. **Ensure Dependencies are Installed in the Container**:
   If you modify `package.json`, rebuild or reinstall dependencies inside the container:

   ```bash
   docker exec -it <container-id> npm install
   ```
3. **Use `npm run dev`**:
   The `dev` script uses `nodemon` and `tsc` to watch for changes and restart the server automatically.

### **Production Dockerfile**

For production, use a different Dockerfile, `Dockerfile.prod`, optimized for production:

```dockerfile
FROM node:23-alpine

# Set working directory
WORKDIR /app

# Copy package.json and lockfile
COPY package.json yarn.lock ./

# Install production dependencies
RUN npm install --production

# Copy the rest of the application files
COPY . ./

# Build the application
RUN npm run build

# Expose application port
EXPOSE 5500

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5500
ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["npm", "run", "start"]
```

To build and run for production:

```bash
docker build -t <image-name> .
docker run -p 5500:5500 <image-name>
```

---

### Additional Resources

- [Docker Command Cheatsheet](https://www.docker.com/blog/docker-cheat-sheet/)
- [Docker Hub](https://hub.docker.com/)


---


Here are your structured notes for Docker, including a table of contents:

---

## **1. Role of Kubernetes and Docker**
- **Docker** is a containerization platform that packages applications and dependencies into containers.
- **Kubernetes** is an orchestration tool that manages containerized applications across multiple nodes.
- **Kubernetes + Docker**: Kubernetes uses Docker containers to deploy, scale, and manage applications efficiently.

---

## **2. Auto Scaling**
- **Kubernetes Horizontal Pod Autoscaler (HPA)** automatically scales the number of pods based on CPU/memory usage.
- **Cluster Autoscaler** scales the number of worker nodes in a cluster.

---

## **3. Image Pull Policy**
- Defines when Kubernetes pulls an image from a registry.
- **Accepted values**:
  - `Always`: Always pull the image before running the container.
  - `Never`: Never pull, only use local images.
  - `IfNotPresent`: Pull only if the image is not available locally.

---

## **4. Service and Auto Discovery**
- Services provide a stable network endpoint for accessing applications inside a Kubernetes cluster.
- Auto-discovery enables applications to find and communicate with other services dynamically.

---

## **5. Selector and Labels**
- **Labels**: Key-value pairs assigned to pods.
- **Selectors**: Used to filter and group resources based on labels.

---

## **6. Load Port and Load Balancer**
- **Load Port**: The port exposed by a service to receive traffic.
- **Load Balancer**: Distributes incoming traffic to multiple pods for better availability and reliability.

---

## **7. External Application Access**
- Kubernetes provides several options for exposing applications externally:
  - **NodePort**: Exposes a service on a specific port of each node.
  - **LoadBalancer**: Creates an external load balancer.
  - **Ingress**: Manages external access with routing rules.

---

## **8. Deployment Strategies**
- **Rolling Deployment**: Updates pods gradually to avoid downtime.
- **Canary Deployment**: Releases updates to a small subset of users before full rollout.
- **Blue-Green Deployment**: Runs two environments, switching traffic between them.

---

## **9. Rolling Deployment**
- Gradually replaces old versions of an application with new versions.
- Ensures zero downtime by incrementally updating pods.

---

## **10. Auto Scaling Deployment**
- Kubernetes automatically scales pods based on resource usage.
- Uses Horizontal Pod Autoscaler (HPA) to adjust pod count dynamically.

---

## **11. DaemonSet**
- Ensures that a pod runs on every node in the cluster.
- Useful for logging, monitoring, and networking services.
- Unlike deployments, which scale based on load, **DaemonSets ensure a pod runs on all nodes**.

---

Let me know if you need any modifications or additional details! 🚀
