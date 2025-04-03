# MERN Stack Project E-commerce

Welcome to the **MERN Stack Project E-commerce!** This project demonstrates the implementation of a full-stack e-commerce application using **JavaScript**, **Tailwind CSS**, **React**, **Redux Toolkit**, **Node.js**, **Express.js**, **MongoDB** and **Nodemailer**.

## Project Overview

This is a fully functional e-commerce platform with comprehensive user and admin functionalities. The project focuses on providing a wide range of office wear fashion, offering a seamless shopping experience. It was developed to enhance both frontend and backend skills, integrating modern web technologies to create a responsive, user-friendly design.

### User Features:

- **Registration & Login**: Users can create an account, log in, and securely access their profile.
- **Password Reset**: If a user forgets their password, they can reset it via an OTP sent to their email.
- **Product Browsing**: Users can view a list of products and see detailed information about each item.
- **Product Filtering**: Users can filter products by color or price range (low to high, high to low).
- **Cart Management**: Users can add products to their cart, modify quantities, or remove items.
- **Order Placement**: Users can place orders, and once the order is successful, they will receive an email confirmation.
- **Order Management**: Users can view the status of their orders through their accounts. Orders can only be placed when logged in.

### Admin Features:

- **Revenue Management**: Admins can view the total revenue generated by the platform.
- **Product Management**: Admins can add, update, or remove products from the catalog.
- **Account Management**: Admins can manage both employee and customer accounts, including updating their details.
- **Order Management**: Admins can update the status of customer orders and view all orders placed on the platform.

## Demo

You can view a live demo of the project here: [Demo Link](https://www.youtube.com/watch?v=BX1nILdTlLg)

## Getting Started

To run this project, you need to have the following software installed on your machine:

- **Node.js**
- **npm** (Node Package Manager)
- **MongoDB**

### Installation

1. **Clone the repository to your local machine:**

```bash
git clone https://github.com/LuanDHV/MERN-Stack-Project-Ecommerce.git
```

2. **Navigate to the project directory:**

```bash
cd MERN-Stack-Project-Ecommerce
```

### Setting up Environment Variables

Before starting the server, you need to create a .env file in the server directory. To do this:

1. **Copy the .env.example file to .env:**

2. **Configure your environment variables:**
   Open the newly copied .env file and replace the placeholders with your actual values.

### Setting up Email Configuration

Before using the email functionality in the app, you need to set up an App Password for your email account (e.g., Gmail) due to security measures like two-step verification.

Follow these steps to generate an App Password for Gmail:

1. **Enable Two-Step Verification:**

- Go to your Google Account.
- Navigate to the **Security** tab.
- Under **Signing in to Google**, click on **2-Step Verification**.
- Follow the instructions to enable it.

2. **Generate an App Password:**

- Once Two-Step Verification is enabled, in the Security tab, find the **App passwords** section.
- Click on **Manage App passwords**.
- You will need to re-enter your Google account password.
- From the dropdown, select **Mail** as the app and choose the device you are using (e.g., Windows Computer).

2. **Update the .env file:**
   Copy the generated App Password and paste it into the .env file in the server directory for the EMAIL_PASSWORD variable.

### Running the Project

1. **Install client dependencies:**

```bash
cd client
```

```bash
npm install
```

```bash
npm run dev
```

2. Install server dependencies:\*\*

```bash
cd server
```

```bash
npm install
```

```bash
npm start
```

Once this is done, the application will start running. You can now access the client at **http://localhost:3000** and interact with the server at **http://localhost:8000**.
