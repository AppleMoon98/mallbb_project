import { useState, useRef } from "react";
import { register } from "../../api/reviewApi";
import useCustomMove from "../hooks/useCustomMove";
import { InputDetail } from "../base/BoardComponent";

const initState = {
    title: "",
    content: "",
}

export default function AddComponent() {
    const [review, setReview] = useState(initState);
    const uploadRef = useRef(null);
    const { moveToPath } = useCustomMove()

    const handleChangeReview = (e) => {
        const { name, value } = e.target;
        setReview((prev) => ({ ...prev, [name]: value }));
    }

    const handleClickAdd = async () => {
        if (!review.title.trim() || !review.content.trim()) {
            alert("제목과 내용을 입력해주세요");
            return;
        }

        const formdata = new FormData();
        formdata.append("title", review.title);
        formdata.append("content", review.content);

        const files = uploadRef.current?.files
        if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                formdata.append("files", files[i]);
            }
        }

        try {
            const res = await register(formdata);
            console.log("등록성공:", res);
            alert("등록되었습니다");
            setReview(initState);

            if (uploadRef.current)
                uploadRef.current.value = ""
            moveToPath('/review', true)
        } catch (err) {
            console.error("등록실패:", err);
            alert("등록 중 오류가 발생했습니다");
        }
    };

    return (
        <InputDetail board={review} handleChangeBoard={handleChangeReview}
            uploadRef={uploadRef} handleClickAdd={handleClickAdd} />
    );
}


