import axios from "axios";
import { API_SERVER_HOST } from "./config";

const host = `${API_SERVER_HOST}/member`

// 일반 로그인
export const loginPost = async(loginParam) => {
    const header = {headers: {"Content-Type":"x-www-form-urlencoded"}}

    const form = new FormData()
    form.append('username', loginParam.email)
    form.append('password', loginParam.password)

    const result = await axios.post(`${host}/login`, form, header)

    return result.data
}

// 카카오 로그인
export const kakaoLoginPost = async(data) => {
    const result = await axios.post(`${host}/auth/kakao`, data, {
        withCredentials: true,
        headers: {"Content-Type":"application/json"}
    })
    return result.data
}

// 회원 등록
export const register = async (formdata) => {
    const res = await axios.post(`${host}/register`, formdata, {
        headers: {"Content-Type":"application/json"}
    })
    console.log(res)
    return res.data
}

// 판매자 등록
export const sellerRegister = async (formdata) => {
    const res = await axios.post(`${host}/sellerregister`, formdata, {
        headers: {"Content-Type":"application/json"}
    })
    console.log(res)
    return res.data
}