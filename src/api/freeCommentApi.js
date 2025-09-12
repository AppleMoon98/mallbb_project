import { publicAxios } from "../util/http";
import { API_SERVER_HOST } from "./config";

const prefix = `${API_SERVER_HOST}/fc`

export const commentGetList = async (boardId) => {
    const res = await publicAxios.get(`${prefix}/${boardId}`)
    return res.data
}