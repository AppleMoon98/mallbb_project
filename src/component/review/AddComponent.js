import { useState, useRef, useEffect } from "react";
import { register } from "../../api/reviewApi";
import useCustomMove from "../hooks/useCustomMove";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import { getBakeries } from "../../api/bakeryApi"


const initState = {
    title: "",
    content: "",
    bakeryId: "",
}

export default function AddComponent() {
    const [review, setReview] = useState(initState);
    const [bakeries, setBakeries] = useState([]);
    const uploadRef = useRef(null);
    const { moveToPath } = useCustomMove()
    

    useEffect(() => {
        const fetchBakeries = async () => {
            const list = await getBakeries();
            setBakeries(list);
        };
        fetchBakeries();
    }, []);


    const handleChangeReview = (e) => {
        const { name, value } = e.target;
        setReview((prev) => ({ ...prev, [name]: value }));
    }

    const handleClickAdd = async () => {
        if (!review.title.trim() || !review.content.trim()) {
            alert("제목과 내용을 입력해주세요");
            return;
        }

        const html = review.content
        const plainText = html.replace(/<\/?[^>]+>/g, '').trim()

        const formdata = new FormData();
        formdata.append("title", review.title);
        formdata.append("content", plainText);
        formdata.append("bakeryId", review.bakeryId);

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
        <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">글 등록</h1>
      <div className="space-y-5 rounded-2xl bg-white p-6 shadow">
        
        {/* 제목 */}
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium text-gray-700">
            제목
          </label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="제목"
            value={review.title}
            onChange={handleChangeReview}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 outline-none transition
            focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        {/* 내용 */}
        <div className="space-y-2">
          <label htmlFor="content" className="text-sm font-medium text-gray-700">
            내용
          </label>
          <CKEditor
            editor={ClassicEditor}
            style={{ minHeight: "200px" }}
            placeholder="내용"
            data={review.content}
            onChange={(_, editor) => {
              handleChangeReview({
                target: { name: "content", value: editor.getData() },
              });
            }}
          />
        </div>

        {/* 가게 선택 */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">가게 선택</label>
                    <select
                        name="bakeryId"
                        value={review.bakeryId}
                        onChange={handleChangeReview}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-200"
                    >
                        <option value="">가게를 선택하세요</option>
                        {bakeries.map((b) => (
                            <option key={b.id} value={b.id}>{b.name}</option>
                        ))}
                    </select>
                </div>

        {/* 파일 첨부 */}
        <div className="space-y-2">
          <label htmlFor="files" className="text-sm font-medium text-gray-700">
            파일 첨부
          </label>
          <input
            id="files"
            type="file"
            multiple
            ref={uploadRef}
            className="block w-full text-sm text-gray-700
            file:mr-4 file:rounded-xl file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-indigo-700
            hover:file:bg-indigo-100"
          />
        </div>

        {/* 버튼 */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleClickAdd}
            className="inline-flex items-center rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow
            hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 active:translate-y-px"
          >
            글 등록
          </button>
        </div>
      </div>
    </div>
    );
}


