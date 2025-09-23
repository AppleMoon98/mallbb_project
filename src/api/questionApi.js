import jwtAxios from "../util/JWTUtil"
import { API_SERVER_HOST } from "./config"

const prefix = `${API_SERVER_HOST}/q`

export const getList = async (pageParam) => {
    const { page, size } = pageParam
    const res = await jwtAxios.get(`${prefix}/l`, { params: { page: page, size: size } })
    return res.data;
}

export const getOne = async (id) => {
    const res = await jwtAxios.get(`${prefix}/${id}`);
    return res.data;
}


export const register = async (formdata) => {
    const res = await jwtAxios.post(`${prefix}/`, formdata, {
        headers: { "Content-Type": "multipart/form-data" }
    });

    return res.data;
}

export const modify = async (formdata,id) => {
    const res = await jwtAxios.put(`${prefix}/${id}`, formdata, {
        headers: { "Content-Type": "multipart/form-data" }
    });

    return res.data;
}

export const remove = async (id) => {
    const res = await jwtAxios.delete(`${prefix}/${id}`);
    return res.data;
}

export const getFileUrl = (filename) => {
    return `${prefix}/view/${encodeURIComponent(filename)}`;
}

export const putOne = async (formdata, id) => {
    const header = { headers: { "content-Type": "multipart/form-data" } }
    const res = await jwtAxios.put(`${prefix}/${id}`, FormData, header)
    return res.data
}