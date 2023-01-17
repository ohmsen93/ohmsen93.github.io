class Work{

    constructor(workBalance, salary, bankInstance){


        this.workBalance = workBalance;
        this.salary = salary;
        this.bankInstance = bankInstance;
    }

    getWorkBalance(){
        //returns our workBalance
        return this.workBalance;
    }

    work(salary){
        //adds our salary to our workBalance, and updates the page values.
        this.workBalance += salary;
    }

    bankTransfer(){
        // first we check if the user has an outstanding loan
        if(this.bankInstance.loanBalance != 0){
            // then we check if the loanBalance is below 100
            if(Math.abs(this.bankInstance.loanBalance) < 100){
                const remainingFunds = this.workBalance + this.bankInstance.loanBalance;

                // if the loanBalance is below 100, we update the balance with the remaining funds, and then we zero our loanBalance with math.abs
                this.bankInstance.updateBalance(remainingFunds);
                this.bankInstance.updateLoanBalance(Math.abs(this.bankInstance.loanBalance));
            } else {
                // if the loanBalance is above 100, we first calculate 10% of our workBalance.
                const deduction = this.workBalance*0.1;
                // then we calculate the remaining 90%.
                const transferAmmount = this.workBalance-deduction;
        
                //we then transfer 90% to our bankBalance, and 10% to our loanBalance.
                this.bankInstance.updateBalance(transferAmmount);
                this.bankInstance.updateLoanBalance(deduction);
            }
        } else {
            // if we do not have a current loanBalance, we transfer our workBalance directly to our loanBalance.
            this.bankInstance.updateBalance(this.workBalance);
        }
        //Zeroes out the workBalance and loads our page values.
        this.workBalance = 0;
    }

    loanTransfer(){
        //First we calculate wether we have funds remaining after transfering the money from workBalance to loanBalance.
        const remainingLoanAmmount = this.workBalance + this.bankInstance.loanBalance;
        console.log("workbalance: "+this.workBalance+", loanbalance: "+this.bankInstance.loanBalance+", remainingLoanAmmount: "+remainingLoanAmmount);

        //If we have money remaining
        if(remainingLoanAmmount > 0){
            

            //we zero out the loanBalance using the current loan balance and Math.abs to turn the negative number positive aka. -200 + 200 = 0
            this.bankInstance.updateLoanBalance(Math.abs(this.bankInstance.loanBalance));
            //then we transfer the remaining funds to the bankBalance
            this.bankInstance.updateBalance(remainingLoanAmmount);
            //and then we zero the workBalance
            this.workBalance = 0;
        } else {

            //if we do not have money remaining after the loanTransfer, we simply update the loanBalance and add our workBalance to our loanBalance.
            this.bankInstance.updateLoanBalance(this.workBalance);
            //and then we zero the workBalance
            this.workBalance = 0;
        }

    }

}

export default Work;