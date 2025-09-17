import { getCookie } from "../util/CookieUtil"
import { publicAxios } from "../util/http"
import jwtAxios from "../util/JWTUtil"

export const API_SERVER_HOST = 'http://localhost:8080'
export const moveAxios = getCookie("member") ? jwtAxios : publicAxios