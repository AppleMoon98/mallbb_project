import { useEffect, useState, useRef } from "react";
import { getOne, getFileUrl, putOne } from "../../api/reviewApi";
import { OutputModify } from "../base/BoardComponent";
import useCustomMove from "../hooks/useCustomMove";
import { useLocation } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import { getBakeries } from "../../api/bakeryApi"


const initState = {
    id: 0,
    title: '',
    content: '',
    createDate: 'null',
    delFlag: false,
    uploadFileNames: [],
    bakeryId: "",
}

const ModifyComponent = ({ id }) => {
    const [review, setReview] = useState({ ...initState })
    const [result, setResult] = useState(null)
    const [bakeries, setBakeries] = useState([]);
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
        formData.append("bakeryId", review.bakeryId)

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
    setFetching(true);

    // 두 API 호출을 병렬 처리
    Promise.all([getOne(id), getBakeries()])
        .then(([reviewData, bakeriesData]) => {
            setReview({
                ...reviewData,
                bakeryId: reviewData.bakeryId || "",
                uploadFileNames: reviewData.uploadFileNames || []
            });
            setBakeries(bakeriesData);
        })
        .finally(() => setFetching(false));
}, [id]);

    return (
        <div className="mx-auto max-w-2xl px-4 py-8">
            <h1 className="mb-6 text-2xl font-semibold">글 수정</h1>
            <div className="space-y-5 rounded-2xl bg-white p-6 shadow">
                {/* 제목 */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">제목</label>
                    <input
                        type="text"
                        name="title"
                        value={review.title}
                        onChange={handleChangeReview}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 outline-none transition
                        focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-200"
                    />
                </div>

                {/* 내용 */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">내용</label>
                    <CKEditor
                        editor={ClassicEditor}
                        data={review.content}
                        onChange={(_, editor) => {
                            handleChangeReview({ target: { name: "content", value: editor.getData() } });
                        }}
                        style={{ minHeight: "200px" }}
                    />
                </div>

                {/* 가게 선택 */}
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">가게 선택</label>
                    <select
                        name="bakeryId"
                        value={review.bakeryId}
                        onChange={handleChangeReview}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 outline-none transition 
                        focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-200"
                    >
                        <option value="">가게를 선택하세요</option>
                        {bakeries.map((b) => (
                            <option key={b.id} value={b.id}>{b.name}</option>
                        ))}
                    </select>
                </div>

                {/* 파일 첨부 */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">파일 첨부</label>
                    <input
                        type="file"
                        multiple
                        ref={uploadRef}
                        className="block w-full text-sm text-gray-700
                        file:mr-4 file:rounded-xl file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-indigo-700
                        hover:file:bg-indigo-100"
                    />
                </div>

                <div className="flex justify-center">
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                        <div className="w-1/5 p-6 text-right font-bold">IMAGE</div>
                        <div className="w-4/5 justify-center flex flex-wrap items-start">
                            {review.uploadFileNames.map((imgFile, i) =>
                                <div className="flex justify-center flex-col w-1/3" key={i}>
                                    <button className="bg-red-500 text-3xl text-white" onClick={() => deleteOldImages(imgFile)}>DELETE</button>
                                    <img alt="img" src={getFileUrl(imgFile)} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* 버튼 */}
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={handleClickModify}
                        className="inline-flex items-center rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow
                        hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 active:translate-y-px"
                    >
                        수정 완료
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModifyComponent
