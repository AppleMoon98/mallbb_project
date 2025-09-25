import { useEffect, useState, useRef } from "react";
import { getOne, getFileUrl, putOne } from "../../api/freeApi";
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
    const [board, setBoard] = useState({ ...initState })
    const [result, setResult] = useState(null)
    const { moveToPath } = useCustomMove()
    const [fetching, setFetching] = useState(false)
    const uploadRef = useRef()

    //
    const handleChangeBoard = (eOrObj) => {
        const { name, value } = 'target' in eOrObj ? eOrObj.target : eOrObj
        setBoard(prev => ({ ...prev, [name]: value }))
    }
    //

    const handleClickModify = async () => {
        if (!board.title.trim() || !board.content.trim()) {
            alert("제목과 내용을 입력해 주세요.")
            return
        }

        const files = uploadRef.current.files
        const formData = new FormData()
        for (let i = 0; i < files.length; i++)
            formData.append("files", files[i])

        const plainText = board.content.replace(/<\/?[^>]+>/g, '').trim()
        formData.append("title", board.title)
        formData.append("content", plainText)

        for (let i = 0; i < board.uploadFileNames.length; i++)
            formData.append("uploadFileNames", board.uploadFileNames[i])

        setFetching(true)
        await putOne(formData, board.id).then(data => setResult("수정성공"))
        alert("수정이 완료되었습니다.")
        moveToPath(`../read/${id}`)
    }

    const deleteOldImages = (imageName) => {
        const resultFileNames = board.uploadFileNames.filter(fileName => fileName !== imageName)
        board.uploadFileNames = resultFileNames
        setBoard({ ...board })
    }

    useEffect(() => {
        setFetching(true)
        getOne(id).then(data => {
            setBoard(data)
            setFetching(false)
        })
    }, [id])

    return (
        <OutputModify board={board} handleChangeBoard={handleChangeBoard} uploadRef={uploadRef}
            handleClickModify={handleClickModify} deleteOldImages={deleteOldImages} getFileUrl={getFileUrl} />
    )
}

export default ModifyComponent
