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


/** 나중에 집에가서 작업할거임
 *  2. 그 값을 받을 칸을 map.js에 작성
 *  3. 빈자리에 값 넣고 끝
 */
export const getBakeryProducts = async (bakeryId) => {
    const res = await moveAxios.get(`${prefix}/product/${bakeryId}`)
    return res.data
}