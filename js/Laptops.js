class Laptops{

    constructor(apiUrl, bankInstance){
        this.apiUrl = apiUrl;
        this.laptopPath = apiUrl+'computers';
        this.data = {};
        this.bankInstance = bankInstance;
    }



    async laptopApi(price){
        console.log(this.laptopPath);
        
        const req = await fetch(this.laptopPath);
        const post = await req.json();

        this.data = post;
    }

    laptopPurchase(id){
        const laptop = this.data[id];

        const price = laptop.price;

        console.log("laptop functionality - bankBalance: "+this.bankInstance.balance+" laptop price: "+price);

        if(price <= this.bankInstance.balance){
            alert("laptop nr. "+laptop.id+" Purchased.");
            console.log("laptop nr. "+laptop.id+" Purchased.");
            this.bankInstance.updateBalance(-price);
        } else {
            alert("Insufficient bank balance.");
            console.log("Insufficient bank balance.");
        }
    

         

    }

}


export default Laptops;