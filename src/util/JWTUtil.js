import axios from "axios";
import { getCookie, setCookie } from "./CookieUtil";
import { API_SERVER_HOST } from "../api/config";
import { createSearchParams, Navigate, useNavigate } from "react-router-dom";

const LOGIN_URL = "/member/login";      // 로그인
const REFRESH_URL = "/member/refresh";  // 리프레시

export const jwtAxios = axios.create();
const refreshJWT = async (accessToken, refreshToken) => {
    const host = API_SERVER_HOST
    const header = { headers: { "Authorization": `Bearer ${accessToken}` } }
    const result = await axios.get(`${host}${REFRESH_URL}?refreshToken=${refreshToken}`, header)

    console.log("--------------------")
    console.log(result.data)

    return result.data
}

const beforeReq = (config) => {
    console.log("before request..........")

    const memberInfo = getCookie("member")
    if (!memberInfo) {
        console.log("Member NOT FOUND")
        return Promise.reject(
            {
                response: {
                    data: {
                        error: "REQUIRE_LOGIN"
                    }
                }
            }
        )
    }
    const { accessToken } = memberInfo
    config.headers.Authorization = `Bearer ${accessToken}`
    return config
}

const requestFail = (err) => {
    console.log("request error..........")
    return Promise.reject(err)
}

const beforeRes = async (res) => {
    console.log("before return response..........")
    const data = res.data
    if ((data && data.error === 'ERROR_ACCESS_TOKEN')) {
        const memberCookieValue = getCookie("member")
        const result = await refreshJWT(memberCookieValue.accessToken, memberCookieValue.refreshToken)
        console.log("refreshJWT RESULT", result)

        memberCookieValue.accessToken = result.accessToken
        memberCookieValue.refreshToken = result.refreshToken
        setCookie("member", JSON.stringify(memberCookieValue), 1)

        const originalRequest = res.config
        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`
        return await jwtAxios(originalRequest)
    }
    return res
}

const responseFail = (err) => {
    console.log("response fail error.......... / JWTUtil.js")
    // const errorMsg = err.response.data.error
    //     const errorStr = createSearchParams({ error: errorMsg }).toString()
    //     console.log(err.response.data.error)

    //     if (errorMsg === 'REQUIRE_LOGIN') {
    //         alert("로그인이 필요합니다.")
    //         Navigate({ pathname: '/member/login', search: errorStr })
    //     }
    return Promise.reject(err)
}

jwtAxios.interceptors.request.use(beforeReq, requestFail)
jwtAxios.interceptors.response.use(beforeRes, responseFail)

export default jwtAxios