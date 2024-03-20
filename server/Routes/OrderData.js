import express from "express";
import Order from '../models/Orders.js';
const router = express.Router()

router.post('/orderdata', async(req,res)=>{
    let data = Array.isArray(req.body.order_data) ? req.body.order_data : [];
    data.unshift({ Order_date: req.body.order_date });
    try {
        let eId = await Order.findOne({ 'email': req.body.email });
        if (eId === null) {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            });
            res.status(200).json({ success: true });
        } else {
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
            res.status(200).json({ success: true });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error: " + error.message);
    }
});

router.post('/myorderdata', async(req,res)=>{
    try{
        let myData = await Order.findOne({'email':req.body.email})
        res.json({orderData: myData})
    }
    catch(error){
        res.send("Server Error", error.message)
    }
})

export default router;
