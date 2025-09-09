import { useRef, useState } from "react";
import { register } from "../../api/noticeApi";


const initState = {
  title: "",
  content: "",
};

export default function AddComponent() {
  const [notice, setNotice] = useState(initState);
  const uploadRef = useRef(null);
  

  const handleChangeNotice = (e) => {
    const { name, value } = e.target;
    setNotice((prev) => ({ ...prev, [name]: value }));
  };

  const handleClickAdd = async () => {
    if (!notice.title.trim() || !notice.content.trim()) {
      alert("제목과 내용을 입력해 주세요.");
      return;
    }

    const formdata = new FormData();
    formdata.append("title", notice.title);
    formdata.append("content", notice.content);

    const files = uploadRef.current?.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formdata.append("files", files[i]);
      }
    }

    try {
      const res = await register(formdata);
      console.log("등록 성공:", res);
      alert("등록되었습니다.");
      setNotice(initState);
      if (uploadRef.current) uploadRef.current.value = "";
     
    } catch (err) {
      console.error("등록 실패:", err);
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  return (
    
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 16 }}>
      <h1>글 등록</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input
          type="text"
          name="title"
          placeholder="제목"
          value={notice.title}
          onChange={handleChangeNotice}
          style={{ padding: 10, border: "1px solid #ddd", borderRadius: 6 }}
        />
        <textarea
          name="content"
          placeholder="내용"
          value={notice.content}
          onChange={handleChangeNotice}
          rows={8}
          style={{ padding: 10, border: "1px solid #ddd", borderRadius: 6, resize: "vertical" }}
        />
        <input type="file" multiple ref={uploadRef} />
        <button type="button" onClick={handleClickAdd} style={{ padding: "8px 16px"}}>
          글 등록
        </button>
      </div>
    </div>
  );
}