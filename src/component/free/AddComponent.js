import { useRef, useState } from "react"
import { register } from "../../api/freeApi"
import useCustomMove from "../hooks/useCustomMove"
import { OutputDetail } from "../base/BoardComponent";


const initState = {
  title: "",
  content: "",
}

export default function AddComponent() {
  const [freeBoard, setFreeBoard] = useState(initState)
  const uploadRef = useRef(null)
  const { moveToPath } = useCustomMove()


  const handleChangeFreeBoard = (e) => {
    const { name, value } = e.target
    setFreeBoard((prev) => ({ ...prev, [name]: value }))
  }

  const handleClickAdd = async () => {
    if (!freeBoard.title.trim() || !freeBoard.content.trim()) {
      alert("제목과 내용을 입력해 주세요.")
      return
    }

    const formdata = new FormData()
    formdata.append("title", freeBoard.title)
    formdata.append("content", freeBoard.content)

    const files = uploadRef.current?.files
    if (files && files.length > 0) 
      for (let i = 0; i < files.length; i++) 
        formdata.append("files", files[i])

    try {
      const res = await register(formdata)
      console.log("등록 성공:", res)
      alert("등록되었습니다.")
      setFreeBoard(initState)

      if (uploadRef.current)
        uploadRef.current.value = ""
      moveToPath('/free', true)
    } catch (err) {
      console.error("등록 실패:", err)
      alert("등록 중 오류가 발생했습니다.")
    }
  }

  return (
     <OutputDetail board={freeBoard} handleChangeBoard={handleChangeFreeBoard}
        uploadRef={uploadRef} handleClickAdd={handleClickAdd} />
  )
}