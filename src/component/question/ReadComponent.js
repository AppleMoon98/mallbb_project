import { useEffect, useState } from "react";
import { getOne, remove } from "../../api/questionApi";
import { commentGetList } from "../../api/questionCommentApi"
import useCustomMove from "../hooks/useCustomMove";
import { API_SERVER_HOST } from "../../api/config";
import FetchingModal from "../../common/FetchingModal";


const initState = {
  id: 0,
  title: "",
  content: "",
  startDate: "",
  desc: "",
  delflag: false,
  uploadFilenames: [],
  commentList: [],
}

const prefix = API_SERVER_HOST;

const ReadComponent = ({ id }) => {
  const [question, setQuestion] = useState(initState);
  const [comment, setComment] = useState()
  const { moveToModify, moveToPath } = useCustomMove();
  const [fetching, setFetching] = useState(false);
  const [result, setResult] = useState(null)

  const handleChangeQuest = (e) => {
    const { name, value } = e.target
    setQuestion((prev) => ({ ...prev, [name]: value }))
  }

  const handleClickCommentSave = (e) => {


  }

  const handleClickDelete = () => {
    remove(id).then(data => {

      setResult('삭제')
      setFetching(false)
    })
  }

  useEffect(() => {
    setFetching(true);
    getOne(id).then((data) => {
      console.log(data)
      setQuestion(data);
      setFetching(false);
    })

    commentGetList(id).then((data) => {
      console.log(data)
    })
  }, [id])

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {fetching ? <FetchingModal /> : null}

      {makeDiv("번호", question.id)}
      {makeDiv("제목", question.title)}
      {makeDiv("내용", question.content)}
      {makeDiv("작성일자", question.createDate)}


      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">이미지</div>
          <div className="w-4/5 flex flex-wrap gap-2 p-4">
            {question.uploadFileNames?.length > 0 ? (
              question.uploadFileNames.map((imgFile, i) => (
                <img
                  key={i}
                  alt={`question-${i}`}
                  className="p-2 w-1/3 cursor-pointer border rounded"
                  src={`${prefix}/q/view/${imgFile}`}
                />
              ))
            ) : (
              <span className="text-gray-500">등록된 이미지가 없습니다</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end p-4">
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
          onClick={() => handleClickDelete(id)}>
          삭제
        </button>
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
          onClick={() => moveToModify(id)}>
          수정
        </button>
      </div>
      <div>
        <hr />

        <div className="space-y-2">
          <label htmlFor="content" className="text-sm font-medium text-gray-700">내용</label>
          <textarea id="comment" name="comment" placeholder="내용" rows={8} value={question.content} onChange={handleChangeQuest}
            className="w-full resize-y rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 outline-none transition
                       focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-200"/>
        </div>

        <div className="flex justify-end p-4">
          <button
            type="button"
            className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
            onClick={() => (id)}>
            등록
          </button>
        </div>
      </div>
    </div>

  );
};

const makeDiv = (title, value) => (
  <div className="flex justify-center">
    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
      <div className="w-1/5 p-6 text-right font-bold">{title}</div>
      <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
        {value}
      </div>
    </div>
  </div>
);

export default ReadComponent;