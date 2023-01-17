class Bank {
    constructor(balance, loan, loanBalance) {

        this.balance = balance;
        this.loan = loan;
        this.loanBalance = loanBalance;
    }

    getBalance() {
        //returns our balance.
        return this.balance;
    }

    updateBalance(ammount) {
        console.log("previous balance: " + this.balance);
        //Updates our bankBalance with the input, and reloads the page values.
        this.balance += ammount;

        console.log("new balance: " + this.balance);

    }

    getLoan(balance, loan) {
        //if loanCount is 0, continue, else refuse loan.
        if (this.loanBalance === 0) {
            //if the loan is above double the balance refuse loan else continue
            if (loan <= balance * 2) {
                console.log("loan Allowed ammount: " + loan)
                //updates our balance with the input
                this.updateBalance(loan);
                //updates our loanBalance with a negative input.
                this.updateLoanBalance(-loan);
            } else {
                console.log("error, loan sum to large");
                alert("Error: the sum of the loan has exceeded the loan capacity, the loan capacity is twice the size of the current bank balance.");
            }

        } else {
            console.log("error, loan already taken");
            alert("Error: the current session already has an outstanding loan, please repay the loan before proceeding with requesting a new loan.");
        }
    }

    getLoanBalance() {
        return this.loanBalance;
    }

    updateLoanBalance(ammount) {
        console.log("updateLoanBalance - Loanbalance: " + this.loanBalance + ", updateAmmount: " + ammount);

        //Updates our loanbalance with the input and reloads the page values.
        this.loanBalance += ammount;

        console.log("updateLoanBalance - newLoanBalance: " + this.loanBalance);
    }
}


export default Bank;