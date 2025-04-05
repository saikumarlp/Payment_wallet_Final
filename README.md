# Paytm Wallet Clone

This project implements a **digital wallet application**, simulating a basic **Paytm-like wallet system**. The app provides common wallet-related functionalities such as transferring money, adding balance, viewing transaction history, and more. It aims to give users a smooth and interactive experience while managing their virtual wallet.

---

## Table of Contents

1. [Key Features](#key-features)
2. [Technologies Used](#technologies-used)
3. [Setup and Installation](#setup-and-installation)
---

## Key Features

- **User Authentication**:  
  Secure login and sign-up system with validation, ensuring only authorized users can access their accounts.
  
- **Fund Transfer**:  
  Ability to transfer money between users in real-time, with updates on both sending and receiving accounts.

- **Balance Management**:  
  Add, subtract, and view wallet balance with real-time updates and error handling for invalid actions (e.g., insufficient funds).

- **Transaction History**:  
  View past transactions, with details on sender, recipient, amount, and date.

- **Responsive UI**:  
  A mobile-first design, ensuring a seamless experience on all devices (mobile, tablet, and desktop).

- **Error Handling**:  
  Informative error messages and validation to ensure users can easily navigate any issues they encounter.

---

## Technologies Used

- **Frontend**:  
  - **React**: For building the user interface and handling dynamic state changes.
  - **CSS (Flexbox, Grid)**: For creating a responsive layout.

- **Backend**:  
  - **Node.js**: Server-side JavaScript runtime environment.
  - **Express.js**: Framework for handling routing and API requests.
  
- **Database**:  
  - **MongoDB**: NoSQL database for storing user data, transaction history, and wallet balance.

- **Version Control**:  
  - **Git**: Version control for tracking changes.
  - **GitHub**: Hosting the repository and managing the project.

---

## Setup and Installation

To set up and run the Paytm Wallet Clone on your local machine, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- A text editor or IDE (such as [VSCode](https://code.visualstudio.com/)).
- MongoDB Atlas account for cloud database management (or local MongoDB installation).

### Steps

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/saikumarlp/Paytm_Wallet_Project_Phase1
   ```

2. **Navigate to the project directory:**

   ```bash
   cd Paytm_Wallet_Project_Phase1
   ```

3. **Install Dependencies:**

   For both the backend and frontend, install the necessary packages:

   - For backend (Node.js/Express):
     ```bash
     npm install
     ```

   - For frontend (React):
     ```bash
     cd client
     npm install
     ```

4. **Setup MongoDB Database:**

   - Create a MongoDB Atlas cluster or set up a local MongoDB instance.
   - Update the MongoDB URI in your `.env` file for backend database connection.

5. **Start the Application:**

   - For the backend (server):
     ```bash
     npm start
     ```

   - For the frontend (React app):
     ```bash
     cd client
     npm start
     ```

   Visit `http://localhost:3000` to view the app in your browser.

---
