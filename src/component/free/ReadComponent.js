import { useEffect, useState } from "react";
import useCustomMove from "../hooks/useCustomMove";
import { API_SERVER_HOST } from "../../api/config"
import { getOne } from "../../api/freeApi";
import FetchingModal from "../../common/FetchingModal";
import dayjs from "dayjs";
import { commentGetList, commentRegister, commentRemove } from "../../api/freeCommentApi";
import { useLocation, useNavigate } from "react-router-dom";
import { getCookie } from "../../util/CookieUtil";

const prefix = API_SERVER_HOST;

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
  useEdit: false,
}


const ReadComponent = ({ id }) => {
  const [board, setBoard] = useState(boardState)
  const [comment, setComment] = useState(commentState)

  //useState([]) length가 터지기 때문에 빈 배열로 담아야 하나?
  const [addComment, setAddComment] = useState(addCommentState)
  const { moveToPath, moveToModify } = useCustomMove()
  const [fetching, setFetching] = useState(false)

  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = !!getCookie("member");

  //!!는 이중 부정 연산자 =>자바스크립트의 이중 부정 연산자로, 어떤 값이든 명시적인 불리언(Boolean) 타입으로 변환하는 데 사용

  // 댓글 등록시 내용이 바뀔때 초기화 용도지만,
  // 사실 다른곳에 달아도 적용됨 ㅎㅎ;

  const handleChangeComment = (e) => {
    const { name, value } = e.target
    setAddComment((prev) => ({ ...prev, [name]: value }))
  }

  // 댓글 등록관련 시스템 전부
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
      const list = await commentGetList(id)
      setComment(list)
    } catch (err) {
      console.error("댓글 오류 : ", err)
      alert("등록 중 오류가 발생하였습니다.")
    }
  }

  useEffect(() => {
    setFetching(true)
    getOne(id).then((data) => {
      setBoard(data)
      setFetching(false)
    })

    commentGetList(id).then((data) => {
      setComment(data)
      setFetching(false)
    })
  }, [id])


  const refreshComments = async (id) => {

    //const list = await commentGetList(id)
    //setComment(list)

  }

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {fetching ? <FetchingModal /> : <></>}

      {makeDiv("번호", board.id)}
      {makeDiv("작성자", board.writer)}
      {makeDiv("제목", board.title)}
      {makeDiv("내용", <div className="content" dangerouslySetInnerHTML={{ __html: board.content }} />)}
      {makeDiv("작성일자", dayjs(board.createDate).format('YYYY-MM-DD HH:mm'))}

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">이미지</div>
          <div className="w-4/5 flex flex-wrap gap-2 p-4">
            {board.uploadFileNames?.length > 0 ? (
              board.uploadFileNames.map((imgFile, i) => (
                <img
                  key={i}
                  alt={`board-${i}`}
                  className="p-2 w-1/3 cursor-pointer border rounded"
                  src={`${prefix}/f/view/${imgFile}`}
                />
              ))
            ) : (
              <span className="text-gray-500">등록된 이미지가 없습니다</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end p-4">
        <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
          onClick={() => moveToPath('../')}>
          List(임시)
        </button>
        <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
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
              <div key={index}>
                {comment.useEdit ? <></> : makeDiv(comment.writer, comment.content)}
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
                {/*댓글 수정 */}
                <button type="button" onClick={() => { comment.useEdit = true }}
                  className="inline-flex items-center rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow
                       hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 active:translate-y-px">
                  수정
                </button>
              </div>

            )
          })
          :
          <></>}
      </>
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