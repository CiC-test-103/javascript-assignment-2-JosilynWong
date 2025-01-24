// 🏦 Bank and Account System 
// Bank Class: Manages multiple accounts
class Bank {
    constructor() {
        this.accounts = []; // Stores all accounts in the bank
    }

   // Create a new amount for name with initialDeposit and add it to accounts  
   createAccount(name, initialDeposit) {
        const account = new Account(name, initialDeposit);
        this.accounts.push(account);
        return account;
    }

}

// Account Class: Represents a single user's account
class Account {
    constructor(name, balance = 0) {
        this.name = name; // Account holder's name
        this.balance = balance < 0 ? 0 : balance; // Initial balance (default is 0 and ensure no negative value)
        this.transactionHistory = []; // Keeps a record of all transactions
    }

    // Helper function to determine whether deposit amount is valid
    // i.e. must be greater than 0
    #isDepositValid(amount) {
        if (amount <= 0) {
            return false;
        }
        return true;
    }

    // Helper function to determine whether withdrawal amount is valid
    // i.e. must be greater than 0 and smaller than or equal to balance
    #isWithdrawalValid(amount) {
        if (amount <= 0 || amount > this.balance) {
            return false;
        }
        return true;
    }

    // Deposit amount into the account
    deposit(amount) {
        // Add deposit amount to balance and record transaction to transaction history
        // only if the deposit amount is valid
        if (this.#isDepositValid(amount)) {
            this.balance += amount;
            this.transactionHistory.push({ transactionType: 'Deposit', amount: amount });
            return true;
        }
        return false;
    }

    // Withdraw amount from the account
    withdraw(amount){
        // Deduct withdrawal amount from balance and record transaction to transaction history
        // only if the withdrawal amount is valid
        if (this.#isWithdrawalValid(amount)) {
            this.balance -= amount;
            this.transactionHistory.push({ transactionType: 'Withdrawal', amount: amount});
            return true;
        }
        return false;
    }

    // Transfer amount from this account to recipientAccount
    transfer(amount, recipientAccount){
        // Proceed only when the amount to be transferred is a valid withdrawal amount
        if (this.#isWithdrawalValid(amount)) {
            // Deduct transfer amount from sender's balance and record transaction for sender
            this.balance -= amount;
            this.transactionHistory.push({ transactionType: 'Transfer', amount: amount, to: recipientAccount.name });

            // Add transfer amount to recipient's balance and record transaction for recipient
            recipientAccount.balance += amount;
            recipientAccount.transactionHistory.push({ transactionType: 'Received', amount: amount, from: this.name });
            return true;
        }
        return false;
    }
    
    // Return account balance
    checkBalance() {
        return this.balance;
    }

}

//<-------------------------------DO NOT WRITE BELOW THIS LINE------------------------------>

// Function to test bank operations
function testBankOperations() {
    const bank = new Bank();

    // Create new accounts
    const johnAccount = bank.createAccount('John Doe', 1000);
    const janeAccount = bank.createAccount('Jane Doe', 500);
    console.log('Accounts created:', johnAccount, janeAccount);

    // Perform some operations on John's account
    johnAccount.deposit(500);
    johnAccount.withdraw(200);

    // Perform a transfer from John to Jane
    johnAccount.transfer(300, janeAccount);

    // Check balances
    const johnFinalBalance = johnAccount.checkBalance();
    const janeFinalBalance = janeAccount.checkBalance();
    console.log('John\'s balance:', johnFinalBalance);
    console.log('Jane\'s balance:', janeFinalBalance);

    // Return balances for testing
    return { 
        johnFinalBalance, 
        janeFinalBalance, 
        johnTransactionHistory: johnAccount.transactionHistory, 
        janeTransactionHistory: janeAccount.transactionHistory 
    };
}

module.exports = testBankOperations;

//<-------------------------------DO NOT WRITE ABOVE THIS LINE------------------------------>


console.log(testBankOperations());
