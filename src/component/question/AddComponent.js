import { useRef, useState } from "react";
import { register } from "../../api/questionApi";
import useCustomMove from "../hooks/useCustomMove"
import { InputDetail } from "../base/BoardComponent";


const initState = {
  title: "",
  content: "",
}

export default function AddComponent() {
  const [questionBoard, setQuestionBoard] = useState(initState)
  const uploadRef = useRef(null)
  const { moveToPath } = useCustomMove()


  const handleChangeQuestionBoard = (e) => {
    const { name, value } = e.target;
    setQuestionBoard((prev) => ({ ...prev, [name]: value }))
  }


  const handleClickAdd = async () => {
    if (!questionBoard.title.trim() || !questionBoard.content.trim()) {
      alert("제목과 내용을 입력해 주세요.");
      return;
    }
    const html = questionBoard.content
    const plainText = html.replace(/<\/?[^>]+>/g, '').trim()

    const formdata = new FormData();
    formdata.append("title", questionBoard.title);
    formdata.append("content", plainText);

    const files = uploadRef.current?.files;
    if (files && files.length > 0) 
      for (let i = 0; i < files.length; i++) 
        formdata.append("files", files[i])

    try {
      const res = await register(formdata);
      console.log("등록 성공:", res);
      alert("등록되었습니다.");
      setQuestionBoard(initState);

      if (uploadRef.current) {
        uploadRef.current.value = "";
      }
      moveToPath('/question', true);
    } catch (err) {
      console.error("등록 실패:", err);
      alert("등록 중 오류가 발생했습니다.");
    }
  }

  return (
    <InputDetail 
      board={questionBoard} 
      handleChangeBoard={handleChangeQuestionBoard}
      uploadRef={uploadRef} 
      handleClickAdd={handleClickAdd} 
    />
  )
}
