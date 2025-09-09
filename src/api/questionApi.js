   import axios from "axios";

    export const API_SERVER_HOST = 'http://localhost:8080'

    const prefix = `${API_SERVER_HOST}/q`

    export const getList = async(pageParam) => {
        const {page,size} = pageParam

        const res = await axios.get(`${prefix}/l`,{params:{page:page,size:size}})

        return res.data;
    }

    export const getOne = async (id) => {
        const res = await axios.get(`${prefix}/${id}`);
        return res.data;
    }


    export const register = async (formdata) =>{
        const res = await axios.post(`${prefix}/`,formdata,{
            headers:{"Content-Type": "multipart/form-data"}
        });

        return res.data;
    }

    export const modify = async(id,formdata) =>{
        const res = await axios.put(`${prefix}/${id}`,formdata,{
            headers:{"Content-Type": "multipart/form-data"}
        });

        return res.data;
    }

    export const remove = async (id)=>{
        const res = await axios.delete(`${prefix}/${id}`);
        return res.data;
    }

    // export const getFileUrl = (filename) =>{
    //     `${prefix}/view/${encodeURIComponent(filename)}`;
    // }
