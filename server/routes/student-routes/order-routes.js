import express from 'express';
import {capturePaymentAndFinalize, createOrder} from "../../controllers/student-controller/order-controller.js";


const router = express.Router()

router.post('/create', createOrder)
router.post('/capture', capturePaymentAndFinalize)

export default router;