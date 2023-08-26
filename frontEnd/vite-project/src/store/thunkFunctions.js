/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";

export const registerUser = createAsyncThunk(
    "user/registerUser",
    async (body, thunkAPI) => {
        try {
            const response = await axiosInstance.post(
                `/users/register`,
                body
            )
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)

export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (body, thunkAPI) => {
        try {
            const response = await axiosInstance.post(
                `/users/login`,
                body
            )
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)

export const authUser = createAsyncThunk(
    // typePrefix
    "user/authUser",
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get(
                `/users/auth`
            );

            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)

export const logoutUser = createAsyncThunk(
    "user/logoutUser",
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.post(
                `/users/logout`
            );

            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)


// 백엔드에 요청을 보내는 부분.
export const addToCart = createAsyncThunk(
    "user/addToCart",
    async (body, thunkAPI) => { // thunkAPI 인자는 항상 두번째에 있어야한다. body에 해당 product에 대한 정보 담겨있음
        try {
            const response = await axiosInstance.post(
                `users/cart`,
                body // ProductInfo component의 productId: product._id 가 담겨 있다, dispatch(addToCart({productId: product._id}));
            )
            return response.data; // 백엔드에서 받은 데이터를 클라이언트에게 반환한다.
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }

    }
)


// 백엔드 요청 -> 라우트 생성
export const getCartItems = createAsyncThunk(
    "user/getCartItems",
    async ({cartItemIds, userCart }, thunkAPI) => { // body라 두지말고 distructuring 즉, {cartitem, userCart} 처럼 해준다.
        try {
            const response = await axiosInstance.get(
                `/products/${cartItemIds}?type=array`, // type이 single이 아닌 array로 준다.
            )

            // CartItem들에 해당하는 정보들을
            // Product Collection에서 가져온 후에
            // Quantity 정보를 넣어 준다. 
            userCart.forEach(cartItem => {
                response.data.forEach((productDetail, index) => {
                    if (cartItem.id === productDetail._id) {
                        response.data[index].quantity = cartItem.quantity // 두개이 데이터 collection을 합쳐준다.
                    }
                })
            })
            return response.data; // action.payload
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response || error.message)
            
        }
    }
)

// 백엔드 요청 -> 라우트 생성
export const removeCartItem = createAsyncThunk(
    "user/removeCartItem",
    async ( productId , thunkAPI) => { 
        try {
            const response = await axiosInstance.delete(
                `/users/cart?productId=${productId}`, 
            )
            
        // productInfo, cart 정보를 조합해서 CartDetail을 만든다.
        response.data.cart.forEach(item => { 
            response.data.productInfo.forEach((product, index) => {
                if (item.id === product._id) {
                    response.data.productInfo[index].quantity = item.quantity
                }
            })
        })

            return response.data; // action.payload
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response || error.message)
            
        }
    }
)

// 1. 씽크함수 작성하고  2. 백엔드로가서 씽크함수를 처리하는 라우츠 만들기
export const payProducts = createAsyncThunk(
    "user/payProducts", // typePrefix
    async (body, thunkAPI) => { // payProducts에서 body라는 이름으로 가져온다. 
        try {
            const response = await axiosInstance.post(
                `/users/payment`, // 이 경로로 요청을 준다.
                body // {cartDetail: cartDetail}
            )
            return response.data;
        } catch(error) {
            console.log(error)
            return thunkAPI.rejectWithValue(error.response || error.message)
        }
    }
)
