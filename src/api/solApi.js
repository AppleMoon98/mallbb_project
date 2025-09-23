const axios = require('axios');
const {createAuthHeader} = require('./sol');

async function sendMessage(apiKey,apiSecret,messageData){
    const authHeader = createAuthHeader(NCSGWPU7EPSVCJUO,PVHLXHYUDCJQRCULACZN2UDKGIBIYHXS);

    try{
        const response = await axios.post('https://api.solapi.com/messages/v4/send-many/detail',messageData,{
            headers:{
                'Authorization': authHeader,
                'Content-Type' : 'application/json'
            }
        });

        return response.data;
    }catch (error){
        console.error('API 요청 실패:',error.response?.data || error.message);
        throw error;
    }
}

module.exports = {sendMessage};