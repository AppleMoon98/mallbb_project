import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./slider/LoginSlider";

export default configureStore({
    reducer:{
        "loginSlice":LoginSlice
    }
})