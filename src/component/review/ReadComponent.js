import { useEffect, useState } from "react";
import { getOne, remove } from "../../api/reviewApi";
import useCustomMove from "../hooks/useCustomMove";
import { API_SERVER_HOST } from "../../api/config";
import FetchingModal from "../../common/FetchingModal";
import dayjs from "dayjs";
import { commentGetList, commentRegister, commentRemove } from "../../api/reviewCommentApi";
import { useLocation, useNavigate } from "react-router-dom";
import { getCookie } from "../../util/CookieUtil";

const prefix = API_SERVER_HOST

const boardState = {
  id: 0,
  title: "",
  content: "",
  createDate: "",
  delflag: false,
  uploadFileNames: [],
  writer: "",
  canEdit: false,
}

const addCommentState = {
  content: ""
}

const commentState = {
  id: 0,
  content: "",
  createDate: "",
  delflag: false,
  writer: "",
  canEdit: false,
}


const ReadComponent = ({ id }) => {

  const [review, setReview] = useState(boardState);
  const [comment, setComment] = useState(commentState)

  const [fetching, setFetching] = useState(false);
  const [addComment, setAddComment] = useState(addCommentState)
  const { moveToModify, moveToList, moveToPath } = useCustomMove();

  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = !!getCookie("member");


  const handleChangeComment = (e) => {
    const { name, value } = e.target
    setAddComment((prev) => ({ ...prev, [name]: value }))
  }

  const handleClickAdd = async () => {
    if (!isLogin) {
      navigate(`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`)
      return
    }

    if (!addComment.content.trim()) {
      alert("댓글 내용을 입력해주세요.")
      return
    }

    const commentData = { content: addComment.content }

    try {
      const res = await commentRegister(commentData, id)
      alert("등록되었습니다.", res)
      setAddComment(addCommentState)
      window.location.reload()
    }catch (err) {
      console.error("댓글 오류 : " + err)
      alert("등록 중 오류가 발생하였습니다")
    }
  }

const handleClickDelete = async () => {
  if (!window.confirm("정말 삭제하시겠습니까?")) return;
  try {
    setFetching(true);
    await remove(id);
    moveToPath('../', true);
  } catch (e) {
    alert("삭제 중 오류가 발생했습니다.");
  } finally {
    setFetching(false);
  }
}

useEffect(() => {
  setFetching(true);
  getOne(id).then((data) => {
    setReview(data)
    setFetching(false)
  })

  commentGetList(id).then((data) => {
    setComment(data)
    setFetching(false)
  })
}, [id])

return (
  <div className="border-2 border-sky-200 mt-10 m-2 p-4">
    {fetching ? <FetchingModal /> : null}

    {makeDiv("번호", review.id)}
    {makeDiv("작성자", review.writer)}
    {makeDiv("제목", review.title)}
    {makeDiv("내용", review.content)}
    {makeDiv("작성일자", dayjs(review.createDate).format('YYYY-MM-DD HH:mm'))}


    <div className="flex justify-center">
      <div className="relative mb-4 flex w-full flex-wrap items-stretch">
        <div className="w-1/5 p-6 text-right font-bold">이미지</div>
        <div className="w-4/5 flex flex-wrap gap-2 p-4">
          {review.uploadFileNames?.length > 0 ? (
            review.uploadFileNames.map((imgFile, i) => (
              <img
                key={i}
                alt={`review-${i}`}
                className="p-2 w-1/3 cursor-pointer border rounded"
                src={`${prefix}/r/view/${imgFile}`}
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
        onClick={handleClickDelete}>
        삭제
      </button>
      <button
        type="button"
        className="rounded p-4 m-2 text-xl w-32 text-white bg-green-500"
        onClick={() => moveToModify(id)}>
        수정
      </button>
    </div>

    <>
        {/*댓글 입력 테스트*/}
        <div className="space-y-2">
          <label htmlFor="content" className="text-sm font-medium text-gray-700">댓글 입력</label>
          <textarea id="content" name="content" placeholder="소중한 한마디 적어주세요" rows={8} value={addComment.content} onChange={handleChangeComment}
            className="w-full resize-y rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 outline-none transition
                       focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-200"/>
          <div className="flex justify-end">
            <button type="button" onClick={handleClickAdd}
              className="inline-flex items-center rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow
                       hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 active:translate-y-px">
              글 등록
            </button>
          </div>
        </div>

        {/*댓글 출력 테스트*/}
        {comment?.length > 0 ?
          comment.map((comment, index) => {
            return (
              <div key={index}>{makeDiv(comment.writer, comment.content)}
                {/* 댓글 삭제 */}
                <button
                  className="px-2 py-1 text-sm bg-red-500 text-white rounded"
                  onClick={async () => {
                    await commentRemove(comment.id);
                    const list = await commentGetList(id);
                    setComment(list);
                  }}>
                  삭제
                </button>
              </div>
            )
          })
          :
          <></>}
      </>
    </div>
  )
}

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


export default ReadComponent