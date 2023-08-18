import {createSlice} from '@reduxjs/toolkit'
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
    extraReducers: (builder) => {}
    
})

export default userSlice.reducer;