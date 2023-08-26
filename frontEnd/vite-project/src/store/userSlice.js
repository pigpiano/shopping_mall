import {createSlice} from '@reduxjs/toolkit'
import { loginUser, registerUser, authUser, logoutUser, addToCart, getCartItems, removeCartItem, payProducts } from './thunkFunctions';
import { toast } from 'react-toastify';
// eslint-disable-next-line no-unused-vars
const initialState = {
    userData: {
        id: '',
        email: '',
        name: '',
        role: '0', // 0은 일반유저, 1은 관리자
        image: '',
    },
    isAuth: false,
    isLoading: false, // 가져오는 중에는 True, 가져왔으면 false
    error: ""
}

// eslint-disable-next-line no-undef
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    // eslint-disable-next-line no-unused-vars
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.isLoading = false;
                toast.info('회원가입을 성공했습니다.');
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userData = action.payload
                state.isAuth = true;
                localStorage.setItem('accessToken', action.payload.accessToken)
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })
            .addCase(authUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(authUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userData = action.payload
                state.isAuth = true;
               
            })
            .addCase(authUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                // 유저 데이터 초기화
                state.userData = initialState.userData
                state.isAuth = false;
                // 만약 토큰이 만료된 사람이면
                localStorage.removeItem('accessToken')
            })
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoading = false;
                state.userData = initialState.userData;
                state.isAuth = false;
                localStorage.removeItem('accessToken')
               
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload)
            })
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userData.cart = action.payload // 백엔드에서 반환된 부분을 리덕스 userData.cart에 담아준다. 브라우더 리덕스에서 확인하기
                toast.info('장바구니에 추가되었습니다.')
               
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload)
            })
            .addCase(getCartItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCartItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartDetail = action.payload // 백엔드에서 반환된 부분을 리덕스 cartDetail에 담아준다. 브라우더 리덕스에서 확인하기
                
               
            })
            .addCase(getCartItems.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload)
            })
            .addCase(removeCartItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeCartItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartDetail = action.payload.productInfo // 백엔드에서 반환된 부분을 리덕스 cartDetail에 담아준다. 브라우더 리덕스에서 확인하기
                state.userData.cart = action.payload.cart;
                toast.info('상품이 장바구니에서 제거되었습니다.')
               
            })
            .addCase(removeCartItem.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload)
            })
            .addCase(payProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(payProducts.fulfilled, (state) => {
                state.isLoading = false;
                state.cartDetail = []; // 백엔드에서 반환된 부분을 리덕스 cartDetail에 담아준다. 브라우더 리덕스에서 확인하기
                state.userData.cart = [];
                toast.info('성공적으로 상품을 구매했습니다.')
               
            })
            .addCase(payProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload)
            })
            
    }
    
})

export default userSlice.reducer;