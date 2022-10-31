import  express  from "express";
import { checkout, paymentVerification } from "../Controllers/payment.js";
import { verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

router.post("/checkout",verifyToken,checkout);

router.post('/paymentvarification',paymentVerification);
export default router;