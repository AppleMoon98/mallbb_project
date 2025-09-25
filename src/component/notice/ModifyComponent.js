import { useEffect, useState, useRef } from "react";
import { getOne, getFileUrl, putOne } from "../../api/noticeApi";
import { API_SERVER_HOST } from "../../api/config";
import useCustomMove from "../hooks/useCustomMove";
import { useLocation } from "react-router-dom";
import { OutputModify } from "../base/BoardComponent";


const prefix = API_SERVER_HOST;

const initState = {
    id: 0,
    title: '',
    content: '',
    createDate: '',
    desc: '',
    delFlag: false,
    uploadFileNames: []
}

const ModifyComponent = ({ id }) => {

    const [notice, setNotice] = useState({ ...initState })
    const [result, setResult] = useState(null)
    const { moveToPath } = useCustomMove()
    const [fetching, setFetching] = useState(false)
    const uploadRef = useRef()
    
    //
    const handleChangeNotice = (eOrObj) => {
        const { name, value } = 'target' in eOrObj ? eOrObj.target : eOrObj
        setNotice(prev => ({ ...prev, [name]: value })) 
    }
    //

    const handleClickModify = async () => {

         if (!notice.title.trim() || !notice.content.trim()) {
            alert("제목과 내용을 입력해 주세요.")
            return
        }
        const files = uploadRef.current.files
        const formData = new FormData()
        for (let i = 0; i < files.length; i++)
            formData.append("files", files[i])

        const plainText = notice.content.replace(/<\/?[^>]+>/g, '').trim()
        formData.append("title", notice.title)
        formData.append("content", plainText)

        for (let i = 0; i < notice.uploadFileNames.length; i++)
            formData.append("uploadFileNames", notice.uploadFileNames[i])

        setFetching(true)
        await putOne(formData, notice.id).then(data => setResult("수정성공"))
        alert("수정이 완료되었습니다.")
        moveToPath(`../read/${id}`)
    }

    const deleteOldImages = (imageName) => {
        const resultFileNames = notice.uploadFileNames.filter(fileName => fileName !== imageName)
        notice.uploadFileNames = resultFileNames
        setNotice({ ...notice })
    }

    useEffect(() => {
        setFetching(true)
        getOne(id).then(data => {
            setNotice(data)
            setFetching(false)
        })
    }, [id])
    return (

         <OutputModify board={notice} handleChangeBoard={handleChangeNotice} uploadRef={uploadRef}
            handleClickModify={handleClickModify} deleteOldImages={deleteOldImages} getFileUrl={getFileUrl} />
    )
}

export default ModifyComponent