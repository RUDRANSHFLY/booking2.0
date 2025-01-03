export class Booking{
    constructor(customerName , phoneNumber , email , checkInDateTime , checkOutDateTime , guestCount){
        this.customerName = customerName ;
        this.phoneNumber = phoneNumber ;
        this.email = email ; 
        this.guestCount = guestCount ; 
        this.checkInDateTime = new Date(checkInDateTime);
        this.checkOutDateTime = new Date(checkOutDateTime);
        this.createdAt = new Date()
    }

    getDetails(){
        return {
            customerName : this.customerName,
            phoneNumber : this.phoneNumber,
            email : this.email ,
            guestCount : this.guestCount,
            checkInDateTime: this.checkInDateTime,
            checkOutDateTime : this.checkOutDateTime,
            createdAt : this.createdAt,
        }
    }
}