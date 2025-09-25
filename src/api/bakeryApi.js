import axios from "axios";
import {API_SERVER_HOST} from "./config";

const prefix = `${API_SERVER_HOST}/api/bakeries`;

export const getBakeries = async () =>{
    try{
        const response = await axios.get(prefix);
        return response.data;
    } catch (error){
        console.error("Bakery API 호출 실패:",error);
        return [];
    }
};