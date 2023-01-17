# Computer Store
Computer store is an application designed to introduce new students to the basics of JavaScript coding.
It is created in HTML, CSS, and JavaScript.

## Access

The application can be accessed through the GitHub pages link [https://ohmsen93.github.io/].

The repository can be accessed through the GitHub link [https://github.com/ohmsen93/ohmsen93.github.io].

## Usage

### Bank
In the bank container, we have access to two values and a button.

The bank balance, which displays the current balance for the bank instance.
The loan balance, which displays the current loan-balance for the bank instance.

The "Get a loan" button, which enables the user to request a loan, the input has to be numbers and be equals or less than twice the size of the current balance for the bank instance, otherwise they will be alerted through message prompts.

### Work
In the work container, we have access to one value, and three buttons.

The work balance, which displays the current work-balance for the work instance.

The "Repay loan" button, which transfers the work-balance towards the loan-balance, it is only visible if the session has an outstanding loan.

The "Bank" button, which transfers 10% of the work-balance towards the loan-balance, and the remaining 90% towards the bank-balance, if no loan-balance is outstanding, it transfers 100% to bank-balance.

The "Work" button, which increments the work-balance by 100.

### Laptops
In the laptops container, we have access to a dropdown, and a list of features.

The dropdown is a selection of laptops that are generated through a supplied API.

The list of features, refers to the specifications for the selected laptop.

### Purchase Area
In the purchase area, we have access to an image, title, description, price and a "Buy Now" button.

The image url is supplied through the api, and is based of the current selection in the laptops dropdown.

The title is supplied through the api, and is based of the current selection in the laptops dropdown.

The description is supplied through the api, and is based of the current selection in the laptops dropdown.
 
The price is supplied through the api, and is based of the current selection in the laptops dropdown.

The "Buy Now" button, checks the price vs the current sessions bank-balance, if higher or equals it buys the selected laptop and withdraws the funds from the bank-balance, if lower it alerts the user.