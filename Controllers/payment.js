import { instance } from '../index.js';
import crypto from 'crypto';
import order from '../Models/orders.js';
import orderDetails from '../Models/orderDetails.js';
export const checkout = async (req, res) => {
    try {
        const options = {
            amount: Number(req.body.amount * 100), 
            currency: "INR",
        };
        const order = await instance.orders.create(options);
        res.status(200).json({ "Success": true, order });
    } catch (error) {
        console.log(error);
    }
}

export const paymentVerification = async (req, res) => { 
    console.log(req.body);
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    
    var expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_KEY)
        .update(body.toString())
        .digest('hex');
  
    const isAuthenticate = expectedSignature === razorpay_signature;
    
   if (isAuthenticate) {
    const orderdetails =  new orderDetails({
        razorpay_order_id: req.body.razorpay_order_id,
        razorpay_payment_id: req.body.razorpay_payment_id,
        razorpay_signature: expectedSignature,
    })
    await orderdetails.save();
    res.redirect('http://localhost:3000/paymentsuccess');
   }else{
    res.status(400).json({ "success": false })  
   }
}