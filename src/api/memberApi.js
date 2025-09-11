import axios from "axios";
import { API_SERVER_HOST } from "./config";

const host = `${API_SERVER_HOST}/member`

export const loginPost = async(loginParam) => {
    const header = {headers: {"Content-Type":"x-www-form-urlencoded"}}

    const form = new FormData()
    form.append('username', loginParam.email)
    form.append('password', loginParam.password)

    const result = await axios.post(`${host}/login`, form, header)

    return result.data
}