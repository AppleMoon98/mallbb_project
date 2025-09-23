import { useRef, useState } from "react"
import { register } from "../../api/freeApi"
import useCustomMove from "../hooks/useCustomMove"
import { InputDetail } from "../base/BoardComponent";


const initState = {
  title: "",
  content: "",
}

export default function AddComponent() {
  const [board, setBoard] = useState(initState)
  const uploadRef = useRef(null)
  const { moveToPath } = useCustomMove()


  const handleChangeBoard = (e) => {
    const { name, value } = e.target
    setBoard((prev) => ({ ...prev, [name]: value }))
  }

  

  const handleClickAdd = async () => {
    if (!board.title.trim() || !board.content.trim()) {
      alert("제목과 내용을 입력해 주세요.")
      return
    }
    
    const html = board.content
    const plainText = html.replace(/<\/?[^>]+>/g, '').trim()
    
    const formdata = new FormData()
    formdata.append("title", board.title)
    formdata.append("content", plainText)

    const files = uploadRef.current?.files
    if (files && files.length > 0) 
      for (let i = 0; i < files.length; i++) 
        formdata.append("files", files[i])

    try {
      const res = await register(formdata)
      console.log("등록 성공:", res)
      alert("등록되었습니다.")
      setBoard(initState)

      if (uploadRef.current)
        uploadRef.current.value = ""
      moveToPath('/free', true)
    } catch (err) {
      console.error("등록 실패:", err)
      alert("등록 중 오류가 발생했습니다.")
    }
  }

  return (
     <InputDetail board={board} handleChangeBoard={handleChangeBoard}
        uploadRef={uploadRef} handleClickAdd={handleClickAdd} />
  )
}