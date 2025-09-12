import { publicAxios } from "../util/http"
import jwtAxios from "../util/JWTUtil"
import { API_SERVER_HOST } from "./config"

const prefix = `${API_SERVER_HOST}/qc`

export const commentGetList = async (pageParam, id) => {
    const { page, size } = pageParam
    const res = await jwtAxios.get(`${prefix}/${id}`, { params: { page: page, size: size } })
    return res.data;
}
export const commentGetOne = async (id) => {
    const res = await jwtAxios.get(`${prefix}/${id}`);
    return res.data;
}


export const commentRegister = async (formdata) => {
    const res = await jwtAxios.post(`${prefix}/`, formdata, {
        headers: { "Content-Type": "multipart/form-data" }
    });

    return res.data;
}

export const commentModify = async (id, formdata) => {
    const res = await jwtAxios.put(`${prefix}/${id}`, formdata, {
        headers: { "Content-Type": "multipart/form-data" }
    });

    return res.data;
}

export const commentRemove = async (id) => {
    const res = await jwtAxios.delete(`${prefix}/${id}`);
    return res.data;
}
