import { useState, useRef } from "react";
import { register } from "../../api/reviewApi";
import useCustomMove from "../hooks/useCustomMove";

const initState = {
    title:"",
    content:""
}

export default function AddComponent() {
    const [review, setReview] = useState(initState);
    const uploadRef = useRef(null);
    const { moveToPath } = useCustomMove()

    const handleChangeReview = (e) => {
        const { name, value } = e.target;
        setReview( (prev) => ( {...prev, [name]: value }));
    }

    const handleClickAdd = async () => {
        if (!review.title.trim() || !review.content.trim()){
            alert("제목과 내용을 입력해주세요");
            return;
        }

        const formdata = new FormData();
        formdata.append("title", review.title);
        formdata.append("content", review.content);

        const files = uploadRef.currnet?.files
        if(files && files.length > 0){
            for(let i=0; i<files.length; i++){
                formdata.append("files", files[i]);
            }
        }

        try{
            const res = await register(formdata);
            console.log("등록성공:", res);
            alert("등록되었습니다");
            setReview(initState);
            if(uploadRef.currnet) uploadRef.current.value = "";
        }catch (err) {
            console.error("등록실패:", err);
            alert("등록 중 오류가 발생했습니다");
        }
    };

    return (
        <div style={{ maxWidth: 720, margin: "0 auto", padding: 16 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input
          type="text"
          name="title"
          placeholder="제목"
          value={review.title}
          onChange={handleChangeReview}
          style={{ padding: 10, border: "1px solid #ddd", borderRadius: 6 }}
        />
        <textarea
          name="content"
          placeholder="내용"
          value={review.content}
          onChange={handleChangeReview}
          rows={8}
          style={{ padding: 10, border: "1px solid #ddd", borderRadius: 6, resize: "vertical" }}
        />
        <input type="file" multiple ref={uploadRef} />
        <button type="button" onClick={handleClickAdd} style={{ padding: "8px 16px" }}>
          글 등록
        </button>
      </div>
    </div>
    );
}    


