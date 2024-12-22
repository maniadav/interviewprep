Here's a detailed documentation for sending emails in Node.js using Nodemailer and Gmail. This includes the code you've shared, broken into parts with explanations of the process and potential issues you might encounter.

---

## **Introduction to Sending Emails with Nodemailer and Gmail**

Nodemailer is a popular Node.js module for sending emails. When combined with Gmail, it requires OAuth2 authentication to ensure secure access.

---

### **Step 1: Setting Up OAuth2**

To use Gmail's SMTP server with OAuth2, you need to configure an OAuth2 client in Google Cloud.

#### **1. Create a Google Cloud Project**

* Go to the [Google Cloud Console](https://console.cloud.google.com/).
* Create a new project or select an existing one.
* Enable the **Gmail API** under  **APIs & Services > Library** .

#### **2. Generate OAuth2 Credentials**

* Go to  **APIs & Services > Credentials** .
* Create a new **OAuth 2.0 Client ID** with the application type as "Web Application."
* Add the redirect URI `https://developers.google.com/oauthplayground` to the  **Authorized Redirect URIs** .

#### **3. Generate a Refresh Token**

* Go to [OAuth 2.0 Playground](https://developers.google.com/oauthplayground).
* Configure it to use your project by clicking the gear icon and selecting "Use your credentials."
* Select the Gmail API scope `https://mail.google.com/` and authorize.
* Exchange the authorization code for an access token and a refresh token.

---

### **Step 2: Install Dependencies**

Run the following command to install the required libraries:

```bash
npm install nodemailer googleapis
```

---

### **Step 3: Code Walkthrough**

Here’s the full code explained step by step:

---

#### **1. Import Required Libraries**

```typescript
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { error } from 'console';
```

* `nodemailer`: To send emails.
* `googleapis`: To use Google OAuth2 for authentication.

---

#### **2. OAuth2 Configuration**

```typescript
const CLIENT_ID = 'your-client-id';
const CLIENT_SECRET = 'your-client-secret';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = 'your-refresh-token';
const EMAIL_ID = 'your-email@gmail.com';

// Create an OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
```

* Replace `your-client-id`, `your-client-secret`, and `your-refresh-token` with your actual credentials.
* Set the refresh token to maintain continuous access without reauthorization.

---

#### **3. Define the `sendGmail` Function**

```typescript
interface EmailOptions {
  fromEmail: string;
  toEmail: string;
  subject: string;
  textContent?: string;
  htmlContent?: string;
}

export async function sendGmail(options: EmailOptions) {
  const { toEmail, fromEmail, subject, textContent, htmlContent } = options;
```

* This function takes an object `EmailOptions` as input, which specifies the email details.

---

#### **4. Get an Access Token**

```typescript
  try {
    const accessToken = await oauth2Client.getAccessToken();
    if (!accessToken.token) {
      throw error("Couldn't get an access token");
    }
```

* The access token is generated dynamically using the refresh token.
* If an access token cannot be retrieved, an error is thrown.

---

#### **5. Configure Nodemailer Transport**

```typescript
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: EMAIL_ID,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: `${accessToken.token}`,
      },
    });
```

* `host`: Gmail's SMTP server.
* `port`: Use `465` for SSL or `587` for TLS.
* `secure`: Set `true` for port `465` (SSL).
* OAuth2 authentication requires:
  * `user`: Your Gmail address.
  * `clientId` and `clientSecret`: From your Google Cloud project.
  * `refreshToken`: To regenerate access tokens.

---

#### **6. Create Mail Options**

```typescript
    const mailOptions = {
      from: fromEmail,
      to: toEmail,
      subject,
      text: textContent,
      html: htmlContent,
    };
```

* Specify the sender, recipient, subject, and email body (text or HTML).

---

#### **7. Send the Email**

```typescript
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
```

* Use `transporter.sendMail` to send the email.
* Log the result on success or the error on failure.

---

### **Step 4: Common Issues and Fixes**

1. **`redirect_uri_mismatch` Error** :

* Ensure the redirect URI in your Google Cloud Console matches the one in your code (`https://developers.google.com/oauthplayground`).

1. **`invalid_grant` Error** :

* This happens if the refresh token is revoked or expired. Generate a new one using the OAuth2 Playground.

1. **403: `access_denied` Error** :

* Ensure the app is in testing mode and your email is added as a test user in the Google Cloud Console.

1. **`EAUTH` Authentication Error** :

* Verify all OAuth2 credentials (`CLIENT_ID`, `CLIENT_SECRET`, `REFRESH_TOKEN`).

---

### **Step 5: Usage**

Here’s an example of calling the `sendGmail` function:

```typescript
import { sendGmail } from './emailService';

const emailOptions = {
  fromEmail: 'your-email@gmail.com',
  toEmail: 'recipient-email@gmail.com',
  subject: 'Test Email',
  textContent: 'Hello, this is a test email sent from Node.js!',
  htmlContent: '<p>Hello, this is a <b>test email</b> sent from Node.js!</p>',
};

sendGmail(emailOptions)
  .then(() => console.log('Email sent successfully'))
  .catch((err) => console.error('Error:', err));
```

---

### **Conclusion**

This setup allows you to send emails securely using Nodemailer with Gmail and OAuth2. Ensure proper configuration and handle errors gracefully for a smooth email-sending experience. Let me know if you need further assistance!
