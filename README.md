# BankApp

This project is an online banking application that allows users to:

- Register and open an account with an initial balance
- Login to check their balance
- Withdraw and deposit money from their account

## Features

- User Registration: Create a new account with a username, password, and initial balance.
- User Authentication: Login with username and password to access account details.
- Account Management: Deposit and withdraw funds from the account.
- Balance Inquiry: Check the current balance.

## Technologies Used

- **Frontend**: React
- **Backend**: Node.js, Express.js
- **Database**: MySQL

## Installation

1. **Installations**:
   - [MySQL](https://dev.mysql.com/downloads/installer/)
   - [Node.js and npm](https://nodejs.org/)

2. **Build Database**:
    - Set up MySQL Workbench:
        - Open MySQL Workbench and connect to local instance 3306.
        - Create schema:
            - Use the SQL script provided in `bankAcct.sql` to create the database and table.
    - Set up database account:
        - Open the `db.js` file, replace the `username` and `password` with yours

3. Clone the repository:
    ```bash
    git clone https://github.com/yuehcw/BankApp.git
    cd BankApp
    ```

4. Install main directory dependencies:
    ```bash
    npm install
    ```

5. Install server dependencies:
    ```bash
    cd server
    npm install
    ```

6. Install client dependencies:
    ```bash
    cd ../client
    npm install
    ```

7. Run the server:
    ```bash
    cd ../server
    npm start
    ```

9. Run the client:
    ```bash
    cd ../client
    npm start
    ```
