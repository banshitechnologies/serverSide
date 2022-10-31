import packeges from "../Models/packeges.js";

export const addpackage = async (req,res,next)=>{
    try {
        console.log(req.body.title);
        const newPackageDetails = new packeges({
            title: req.body.title,
            packageDetails: []
        })
        await newPackageDetails.save();
        res.status(200).send('Package created');
    } catch (error) {
        next(error)
    }
}

export const getallpackage = async(req,res,next)=>{
    try {
        const allPackage = await packeges.find();
        res.status(200).json(allPackage);
    } catch (error) {
        next(error);
    }
}

export const getPackagebyTitle = async(req,res,next) =>{
    try {
        const paramTitle = req.params.title;
        const getPackagebyTitle = await packeges.find({"title":paramTitle});
        res.status(200).json(getPackagebyTitle);
    } catch (error) {
        next(error);
    }
}

export const addPackage = async(req,res,next) =>{
    try {
        const newdata = await packeges.findOneAndUpdate({title:req.params.title},{"$push":{"packagesd":req.body}});
        res.status(200).json(newdata);
    } catch (error) {
        next(error);
    }
}