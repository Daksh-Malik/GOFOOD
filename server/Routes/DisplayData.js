import express from "express";
const router = express.Router()

router.post('/fooddata', (req,res)=>{
    try {
        res.send([food_items,foodCategory])
    } catch (error) {
        console.error(error.message)
        res.send("Server Error")
    }
})

export default router;