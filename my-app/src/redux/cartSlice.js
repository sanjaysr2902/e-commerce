import {createSlice} from "@reduxjs/toolkit"
 
const cart=createSlice({
    name:"cart",
    initialState:{
        items: [{
          "id": "1",
          "name": "Car Seat Cover",
          "description": "Premium leather seat cover for ultimate comfort and durability.",
          "price": 79.99,
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVLirVELFk_loBk3zfuVR-p4io9ZZ7Tqf6Aw&s",
          "category": "Interior"
        }]
        
    },
    reducers:{}
})
export default createSlice.reducers