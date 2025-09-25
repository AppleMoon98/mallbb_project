import { useEffect, useState, useRef } from "react";
import { getOne, getFileUrl, putOne } from "../../api/reviewApi";
import { OutputModify } from "../base/BoardComponent";
import useCustomMove from "../hooks/useCustomMove";
import { useLocation } from "react-router-dom";

const initState = {
    id: 0,
    title: '',
    content: '',
    createDate: 'null',
    delFlag: false,
    uploadFileNames: []
}

const ModifyComponent = ({ id }) => {
    const [review, setReview] = useState({ ...initState })
    const [result, setResult] = useState(null)
    const { moveToPath } = useCustomMove()
    const [fetching, setFetching] = useState(false)
    const uploadRef = useRef()

    const handleChangeReview = (eOrObj) => {
        const { name, value } = 'target' in eOrObj ? eOrObj.target : eOrObj
        setReview(prev => ({ ...prev, [name]: value })) 
    }

    const handleClickModify = async () => {

        if (!review.title.trim() || !review.content.trim()) {
            alert("제목과 내용을 입력해 주세요.")
            return
        }

        const files = uploadRef.current.files
        const formData = new FormData()
        for (let i = 0; i < files.length; i++)
            formData.append("files", files[i])

        const plainText = review.content.replace(/<\/?[^>]+>/g, '').trim()
        formData.append("title", review.title)
        formData.append("content", plainText)

        for (let i = 0; i < review.uploadFileNames.length; i++)
            formData.append("uploadFileNames", review.uploadFileNames[i])

        setFetching(true) 
        await putOne(formData, review.id).then(data => setResult("수정성공"))
        alert("수정이 완료되었습니다.")
        moveToPath(`../read/${id}`)
    }

    const deleteOldImages = (imageName) => {
        const resultFileNames = review.uploadFileNames.filter(fileName => fileName !== imageName)
        review.uploadFileNames = resultFileNames
        setReview({ ...review })
    }

    useEffect(() => {
        setFetching(true)
        getOne(id).then(data => {
            setReview(data)
            setFetching(false)
        })
    }, [id])

    return (
        <OutputModify board={review} handleChangeBoard={handleChangeReview} uploadRef={uploadRef}
            handleClickModify={handleClickModify} deleteOldImages={deleteOldImages} getFileUrl={getFileUrl} />
    )
}

export default ModifyComponent
