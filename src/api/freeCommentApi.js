import { publicAxios } from "../util/http";
import jwtAxios from "../util/JWTUtil";
import { API_SERVER_HOST } from "./config";

const prefix = `${API_SERVER_HOST}/fc`

export const commentGetList = async (boardId) => {
    const res = await publicAxios.get(`${prefix}/${boardId}`)
    return res.data
}

export const commentRegister = async (comment, boardId) => {
    const res = await jwtAxios.post(`${prefix}/${boardId}`, comment, {
        headers: {"Content-Type":"application/json"}
    })
    console.log(res.data)
    console.log(res)
    return res.data
}