import mongoose from "mongoose";


const OrderScheema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    selectedPackage: {
        type: String,
        required: true
    },
    packageType: {
        type: String,
        required: true
    },
    needs: {
        type: [String],
    },
    price: {
        type: String,
        required: true
    },

    isAlreadyExist: {
        type: Boolean,
        default: false,
    },
    logopath: {
        type: String
    },

    colors: {
        type: [String],
    },
    choice: {
        type: Boolean,
        default: false,
    },
    dataGraphics: {
        type: [String],
    },
    dataFOrweb: {
        type: String
    },
    description:{
        type: String
    },
    order_id:{
        type:String
    }

})

export default mongoose.model('Order', OrderScheema);