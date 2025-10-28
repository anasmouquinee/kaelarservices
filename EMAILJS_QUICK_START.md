# ⚡ EmailJS Setup - Quick Start

## What You Need To Do (2 Steps)

### Step 1: Create EmailJS Account
1. Go to: https://www.emailjs.com/
2. Click **Sign Up** 
3. Sign up with Google or email
4. **Verify your email**

### Step 2: Create Service & Template

#### A. Create Email Service (Connect Gmail)
1. Go to **Dashboard** → **Email Services**
2. Click **Add Service** 
3. Select **Gmail**
4. Connect your Gmail account (anasmouquine2@gmail.com)
5. Complete setup
6. You'll see a **Service ID** (like: `service_abc123`)
7. **Copy this Service ID**

#### B. Create Email Template
1. Go to **Dashboard** → **Email Templates**
2. Click **Create New Template**
3. Name: "Kaelar Services Contact"
4. Subject: `New Contact Request - {{subject}}`
5. Email Body:

```
Hello,

You have a new contact form submission from Kaelar Services website.

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}
Package: {{package_type}}
Date: {{date}}

Message:
{{message}}

---
Best regards,
Kaelar Services Website
```

6. Click **Save**
7. You'll see a **Template ID** (like: `template_xyz789`)
8. **Copy this Template ID**

### Step 3: Get Your Public Key
1. Go to **Dashboard** → **Account**
2. Find your **Public Key**
3. **Copy it**

## Update Your Website

In `script.js` (around line 1), you'll see:

```javascript
emailjs.init("J4U9xXWh9Dj8K7vL2");
```

Replace `J4U9xXWh9Dj8K7vL2` with your **Public Key**

Also in `script.js` (around line 30), you'll see:

```javascript
emailjs.send("service_kaelar", "template_kaelar", templateParams)
```

Replace:
- `service_kaelar` with your **Service ID**
- `template_kaelar` with your **Template ID**

## Example After Update

```javascript
emailjs.init("your_public_key_here");

// ...later in the code...

emailjs.send("service_abc123", "template_xyz789", templateParams)
```

## Test It!

1. Open your website
2. Scroll to Contact section
3. Fill out the form with test data
4. Click "Envoyer la Demande"
5. You should see: "✓ Merci! Votre demande a été envoyée..."
6. Check **anasmouquine2@gmail.com** inbox

## That's It! 🎉

Your email system is now fully automated and professional!

---

**Questions?** Visit: https://www.emailjs.com/docs/
