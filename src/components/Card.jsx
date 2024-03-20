import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
    let dispatch = useDispatchCart()
    const priceRef = useRef()
    let options = props.options;
    let priceOptions = Object.keys(options)
    let data = useCart()
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")

    const handleAddToCart = async()=>{
        let food = [] 
        for(const item of data){ 
            if(item.id === props.foodItems._id){
                food = item
                break
            }
        }
        if(food != []){
            if(food.size === size){
                await dispatch({type: "UPDATE", id: props.foodItems._id, price: finalPrice, qty: qty})
                return //the above code make sures that same item's quantity gets UPDATED instead of adding it as a new order
            }
            else if(food.size !== size){
                await dispatch({type:"ADD", id:props.foodItems._id, name: props.foodItems.name, price: finalPrice, qty: qty, size: size})
                return
            }
            return
        }   
        await dispatch({type:"ADD", id:props.foodItems._id, name: props.foodItems.name, price: finalPrice, qty: qty, size: size})
    }
    let finalPrice = qty * parseInt(options[size])
    useEffect(()=>{
        setSize(priceRef.current.value)
    },[])
    return (
        <>
            <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "500px" }}>
                <img src={props.foodItems.img} className="card-img-top" style={{"height":"210px"}} alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItems.name}</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <div className='container w-100'>
                        <select className='m-2 h-100 bg-success rounded' onChange={(e)=>setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}> {i + 1} </option>
                                )
                            })}
                        </select>
                        <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
                            {priceOptions.map((data)=>{
                                return <option key={data} value={data}>{data}</option>
                            })}
                        </select>
                        <div className='d-inline h-100 fs-5'>
                            ₹{finalPrice}/-
                        </div>
                    </div>
                    <hr></hr>
                    <button className="btn btn-success justify-center ms-2" onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </>
    )
}
