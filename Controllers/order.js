import order from '../Models/orders.js';
import multer from 'multer';
import path from 'path';
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename: (req,file,cb)=>{
        const ext = path.extname(file.originalname);
        cb(null,Date.now()+ext);
    }
})

export const upload = multer({
    storage,
    fileFilter:(req,file,cb)=>{
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null,true);
        }else{
            console.log("Only jpg or png or jpeg file supported");
            cb(null,false);
        }
    },
    limits: {
        fileSize: 1024*1024*2
    }
});

export const doOrder = async(req,res,next)=>{
    try {
        
        let newOrder =new order({
            userid : req.body.userid,
            selectedPackage: req.body.selectedPackage,
            packageType:req.body.packageType,
            needs: req.body.needs,
            price: req.body.price,
            forWeb: req.body.forWeb,
            isAlreadyExist: req.body.isAlreadyExist,
            colors: req.body.colors,
            choice: req.body.choice,
            dataFOrweb: req.body.dataFOrweb,
            description: req.body.description,
            order_id:req.body.order_id
        })
        
        if (req.files.logo) {
            console.log(req.files.logo[0]);
            newOrder.logopath = req.files.logo[0].path;
        }

        if (req.files.image) {
            console.log(req.files.image[0]);
            for (let index = 0; index < req.files.image.length; index++) {
                newOrder.dataGraphics.push(req.files.image[index].path)
            }
        }
        await newOrder.save();
        res.send(newOrder);
    } catch (error) {
        next(error)
    }
}

export const getAllOrder = async (req,res,next)=>{
    try {
        const allOrder = await order.find();
        res.status(200).json(allOrder);
    } catch (error) {
        next(error);
    }
}

export const getOrderByorderid = async(req,res,next) => {
    try {
        const oredrbyorderid = await order.findOne({_id: req.params.orderid}).exec();
        res.status(200).json(oredrbyorderid);
    } catch (error) {
        next(error);
    }
}

export const getallorderbyuserid = async(req,res,next) => {
    try {
        const userOrders = await order.find({userid: req.params.userid}).exec();
        res.status(200).json(userOrders);
    } catch (error) {
        next(error);
    }
}