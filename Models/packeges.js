import mongoose from "mongoose";

const packegesScheema = new mongoose.Schema({
    
        title: {
            type: String,
            unique: true
        },
        packagesd: {
            type: [Object],
        },
    
})
export default mongoose.model("Package", packegesScheema);