import mongoose from "mongoose";

const orderDetails = new mongoose.Schema({
    
    razorpay_order_id:{
        type: String,
        
    },
    razorpay_payment_id:{
        type: String,
        
    },
    razorpay_signature:{
        type: String,
        
    },
    
})
export default mongoose.model("orderDetail", orderDetails);