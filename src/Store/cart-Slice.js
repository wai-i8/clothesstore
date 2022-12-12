import { createSlice } from "@reduxjs/toolkit";

const initialState = [
]


const cartSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {
        addItem(state,actions){
            console.log("Before addItem: state: ", state[0]);
            let index = state.findIndex(x => x.id===actions.payload.id);
            if(index < 0){
                state.push(actions.payload);
                console.log("actions.payload: ", actions.payload);
            }else{
                state[index].qty ++;
            }
            //state.push({id: 2, name: "Knit melton tailored coat", img: "https://www.gu-global.com/hk/images/chirashi/34/342873/source/items/11_342873.jpg" , price: 299, qty:1});
            //console.log("After addItem: state: ", state);
        },
        increaseItem(state,actions){
            state[actions.payload].qty++;
        },
        decreaseItem(state,actions){
            state[actions.payload].qty--;
            console.log("state[actions.payload].qty: ",state);
            if ( state[actions.payload].qty === 0){
                console.log("tate[actions.payload].qty === 0");
                let temp = state.filter(x => x.qty > 0);
                state.length = 0;
                temp.map(x => state.push(x));
            }
            //console.log("state.length ", state.length);
            //console.log("state[0].name: ", state[0].name);
            
            
        },
        deleteAllItem(state){
            console.log("Before deleteAllItem: state: ", state);
            state.length = 0;
            console.log("After deleteAllItem: state: ", state);
            //localStorage.removeItem("cart");
        }
        
    }


});

export const cartAction = cartSlice.actions;
export default cartSlice;