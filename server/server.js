import express from 'express';
import mongoose from 'mongoose';
import createUserRouter from './Routes/CreateUser.js';
import loginUserRouter from './Routes/LoginUser.js';
import orderDataRouter from './Routes/OrderData.js';

const app = express();
app.use(express.json());

//handling cors natively
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000")
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
})

mongoose
  .connect("mongodb://127.0.0.1:27017/FoodDelivery")
  .then(() => {
    console.log("DB Connection Successfull");
  })    
  .catch((err) => {
    console.log(err.message);
  });

app.get("/", async (req,res) => {
    try {
        res.end()
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
})

app.use('/api', createUserRouter)
app.use('/api', loginUserRouter)
app.use('/api', orderDataRouter)

app.get("/api/fooddata", async (req,res) => {
    try {
        const fetch_data = mongoose.connection.db.collection("Foods");
        const foodData = await fetch_data.find({}).toArray();
        
        const foodCategory = mongoose.connection.db.collection("Categories");
        const categoryData = await foodCategory.find({}).toArray();

        res.json([foodData, categoryData]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
})

app.listen(8080, ()=> {
    console.log("Server running at port 8080");
})