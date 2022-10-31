import express from "express";
import { addPackage, addpackage, getallpackage, getPackagebyTitle, } from "../Controllers/packeges.js";
import { verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();


router.post("/addpackage",verifyToken,addpackage);
router.get("/getallpackage",verifyToken,getallpackage);
router.get("/getallpackage/:title",verifyToken,getPackagebyTitle);
router.put('/addpackagedetails/:title',verifyToken,addPackage);

export default router;