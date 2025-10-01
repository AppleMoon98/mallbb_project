import jwtAxios from "../util/JWTUtil";
import {API_SERVER_HOST, moveAxios} from "./config";

const prefix = `${API_SERVER_HOST}/api/bakeries`;

export const getBakeries = async () =>{
    try{
        const response = await moveAxios.get(`${prefix}/`);
        return response.data;
    } catch (error){
        console.error("Bakery API 호출 실패:",error);
        return [];
    }
};

export const getBakeryProducts = async (bakeryId) => {
    const res = await moveAxios.get(`${prefix}/product/${bakeryId}`)
    return res.data
}