import jwtAxios from "../util/JWTUtil"
import { API_SERVER_HOST } from "./config"

const prefix = `${API_SERVER_HOST}/qc`

export const commentGetList = async (boardId) => {
    const res = await jwtAxios.get(`${prefix}/${boardId}`)
    return res.data;
}

export const commentRegister = async (comment,boardId) => {
    const res = await jwtAxios.post(`${prefix}/${boardId}`, comment, {
        headers: { "Content-Type": "application/json" }
    });

    return res.data;
}

export const commentModify = async (id, comment) => {
    const res = await jwtAxios.put(`${prefix}/${id}`, comment, {
        headers: { "Content-Type": "application/json" }
    });

    return res.data;
}

export const commentGetOne = async (boardId) => {
    const res = await jwtAxios.get(`${prefix}/${boardId}`);
    return res.data;
}




export const commentRemove = async (id) => {
    const res = await jwtAxios.delete(`${prefix}/${id}`);
    return res.data;
}
