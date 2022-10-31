import express from 'express';
import { doOrder, getAllOrder, getallorderbyuserid, getOrderByorderid, upload } from '../Controllers/order.js';
import main from '../utils/sendMail.js';
import { verifyToken } from '../utils/verifyToken.js';
const router = express.Router();

router.post('/order',upload.fields([{name:'logo',maxCount:1},{name:'image',maxCount:5}]),verifyToken,main,doOrder);
router.get('/getallorders',verifyToken,getAllOrder);
router.get('/getorder/:orderid',verifyToken,getOrderByorderid);
router.get('/getallorder/:userid',verifyToken,getallorderbyuserid);

export default router;