# Academic Homepage Deployment Guide

## Overview

This guide provides detailed instructions on how to deploy your PhD student personal academic homepage to the internet, making your academic achievements accessible to scholars and peers worldwide. We'll use GitHub Pages as our example, which is a free, reliable, and professional website hosting service particularly suitable for academic personnel.

## Prerequisites

### 1. Register a GitHub Account

If you don't have a GitHub account yet, please follow these steps:

1. Visit [GitHub official website](https://github.com)
2. Click the "Sign up" button in the top right corner
3. Fill in your username, email address, and password
4. Complete email verification
5. Choose the free plan

**Important Note:** Please remember your username, as it will become part of your website URL.

### 2. Understanding the File Structure

Your website contains the following files and folders:

```
academic-homepage/
├── index.html          # Main page file
├── css/
│   └── style.css       # Stylesheet
├── js/
│   └── script.js       # Functionality script
├── assets/
│   ├── images/
│   │   └── profile-photo.jpg  # Personal photo
│   └── cv/
│       ├── CV_ZhangSan_CN.pdf  # Chinese CV (you need to add)
│       └── CV_JohnZhang_EN.pdf # English CV (you need to add)
└── DEPLOYMENT_GUIDE.md # This guide file
```

## Step 1: Create GitHub Repository

### 1.1 Login to GitHub

Log in to GitHub using your newly registered account.

### 1.2 Create New Repository

1. Click the "+" sign in the top right corner, select "New repository"
2. In the "Repository name" field, enter: `your-username.github.io`
   - **Important:** Replace `your-username` with your actual GitHub username
   - For example: if your username is `johnzhang`, the repository name should be `johnzhang.github.io`
3. Ensure the repository is set to "Public"
4. Check "Add a README file"
5. Click "Create repository"

### 1.3 Why Use This Special Naming Format?

GitHub Pages has a special rule: if your repository name follows the format `username.github.io`, GitHub will automatically recognize it as your personal homepage and make it accessible directly through `https://username.github.io`.

## Step 2: Upload Website Files

### 2.1 Method 1: Upload via GitHub Web Interface (Recommended for Beginners)

1. In your newly created repository page, click the "uploading an existing file" link
2. Drag all website files to the upload area, or click "choose your files" to select files
3. Make sure to upload the following files:
   - `index.html`
   - `css/style.css`
   - `js/script.js`
   - `assets/images/profile-photo.jpg`
4. In the "Commit changes" section at the bottom:
   - In the title box, enter: `Add academic homepage files`
   - In the description box, enter: `Initial upload of personal academic homepage`
5. Click "Commit changes"

### 2.2 Method 2: Using Git Command Line (For Technically Inclined Users)

If you're familiar with command line operations, you can use the following steps:

```bash
# Clone your repository
git clone https://github.com/your-username/your-username.github.io.git

# Enter repository directory
cd your-username.github.io

# Copy website files to repository directory
# (Copy all files from academic-homepage folder here)

# Add all files
git add .

# Commit changes
git commit -m "Add academic homepage files"

# Push to GitHub
git push origin main
```

## Step 3: Enable GitHub Pages

### 3.1 Access Repository Settings

1. In your repository page, click the "Settings" tab at the top
2. Find and click the "Pages" option in the left menu

### 3.2 Configure Pages Settings

1. In the "Source" section, select "Deploy from a branch"
2. In the "Branch" dropdown menu, select "main"
3. Keep "/ (root)" in the folder selection
4. Click "Save"

### 3.3 Wait for Deployment to Complete

GitHub needs a few minutes to build and deploy your website. You'll see a green checkmark and deployment status.

## Step 4: Access Your Website

### 4.1 Get Website Address

After deployment is complete, your website will be accessible at:
`https://your-username.github.io`

For example: if your username is `johnzhang`, your website address will be:
`https://johnzhang.github.io`

### 4.2 Test Website Functionality

Visit your website and test the following features:
- Page switching (Home, Research, More About Me)
- Language switching (Chinese/English)
- Responsive design (view on mobile)
- Contact links

## Step 5: Customize Your Content

### 5.1 Replace Personal Information

You need to edit the `index.html` file to replace placeholder content:

1. In your GitHub repository, click the `index.html` file
2. Click the edit button (pencil icon)
3. Find and replace the following placeholders:

**Personal Information Placeholders:**
- `张三` → Your Chinese name
- `John Zhang` → Your English name
- `john.zhang@university.edu` → Your email address
- Various link URLs (Google Scholar, LinkedIn, GitHub, etc.)

**Education Background Placeholders:**
- Degree information
- Institution names
- Advisor information
- Time periods

**Research Content Placeholders:**
- Research interest tags
- Paper titles and authors
- Publication venues/conferences

### 5.2 Upload Personal Photo

1. Prepare a high-quality personal photo (recommended 300x300 pixels, JPG format)
2. In your GitHub repository, navigate to the `assets/images/` folder
3. Click "Add file" → "Upload files"
4. Upload your photo, naming it `profile-photo.jpg` (replace the existing placeholder image)

### 5.3 Upload CV Files

1. Prepare your Chinese and English CV PDF files
2. In your GitHub repository, navigate to the `assets/cv/` folder
3. Upload CV files:
   - Chinese CV: `CV_YourName_CN.pdf`
   - English CV: `CV_YourName_EN.pdf`
4. Update the CV link paths in `index.html`

### 5.4 Customize Background (Optional)

If you want to change the website background, follow these steps:

1. Edit the `css/style.css` file
2. Find the background customization guide comments at the beginning of the file
3. Uncomment your preferred background option, or add your own background image

## Step 6: Update Website Content

### 6.1 Daily Update Process

When you need to update website content:

1. Find the file you need to modify in your GitHub repository
2. Click the edit button
3. Make your changes
4. Fill in the change description at the bottom of the page
5. Click "Commit changes"
6. Wait a few minutes for the changes to be automatically deployed to your website

### 6.2 Adding New Research Achievements

When you have new papers published:

1. Edit the `index.html` file
2. Add new paper entries in the Publications section
3. Add related updates in the News section
4. Commit changes

### 6.3 Update Personal Information

As your academic career progresses, you may need to update:
- Education background (such as obtaining degrees)
- Research interests
- Contact information
- Personal photos

## Troubleshooting

### Common Issues and Solutions

**Issue 1: Website Cannot Be Accessed**
- Check if repository name is correct (must be in `username.github.io` format)
- Confirm GitHub Pages is enabled
- Wait 5-10 minutes for deployment to complete

**Issue 2: Page Displays Incorrectly**
- Check if file paths are correct
- Confirm all CSS and JS files have been uploaded
- Check browser developer tools for error messages

**Issue 3: Images Cannot Be Displayed**
- Confirm image files have been uploaded to the correct location
- Check if image file names match the references in HTML
- Confirm image formats are supported (JPG, PNG, WebP, etc.)

**Issue 4: CV Download Links Invalid**
- Confirm PDF files have been uploaded to the `assets/cv/` folder
- Check if link paths in HTML are correct
- Confirm file names match the names in links

### Getting Help

If you encounter technical issues, you can:
1. Check GitHub Pages official documentation
2. Seek help in GitHub community forums
3. Contact your institution's IT support department

## Advanced Features

### Custom Domain (Optional)

If you own your own domain, you can point it to GitHub Pages:

1. Create a file named `CNAME` in the repository root directory
2. Enter your domain in the file (e.g., `www.yourname.com`)
3. Set up DNS records with your domain provider
4. Configure custom domain in GitHub Pages settings

### Adding Google Analytics (Optional)

To understand website traffic:

1. Register for a Google Analytics account
2. Get the tracking code
3. Add the code to the `<head>` section of `index.html`

### SEO Optimization

To improve search engine rankings:

1. Add meta descriptions in the `<head>` section
2. Use semantic HTML tags
3. Add structured data markup
4. Ensure fast website loading speed

## Maintenance Recommendations

### Regular Updates

We recommend you:
- Check website functionality once a month
- Update research achievements and personal information promptly
- Regularly backup important files
- Stay informed about GitHub Pages updates and changes

### Security Considerations

- Don't publish overly detailed personal information on the website
- Regularly check the validity of external links
- Protect your GitHub account security

## Conclusion

Congratulations! You now have a professional academic personal homepage. This website will become an important platform for showcasing your academic identity, helping you connect with researchers worldwide, display your research achievements, and advance your academic career.

Remember, an excellent academic homepage requires continuous maintenance and updates. As your research work progresses, continuously enrich and improve your website content, making it truly the best showcase for your academic achievements.

If you have any questions or suggestions during use, please feel free to submit them through the GitHub Issues feature. We will continue to improve this template to help more scholars.

---

**Author:** Manus AI  
**Last Updated:** June 29, 2024  
**Version:** 1.0

