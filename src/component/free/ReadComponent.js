import { useEffect, useState } from "react";
import useCustomMove from "../hooks/useCustomMove";
import { API_SERVER_HOST } from "../../api/config";
import { getOne } from "../../api/freeApi";
import FetchingModal from "../../common/FetchingModal";
import ConfirmModal from "../../common/ConfirmModal";
import dayjs from "dayjs";
import { commentGetList, commentRegister, commentRemove, commentModify } from "../../api/freeCommentApi";
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
};

const addCommentState = { content: "" };

const ReadComponent = ({ id }) => {
  const [board, setBoard] = useState(boardState);
  const [addComment, setAddComment] = useState(addCommentState);
  const [comment, setComment] = useState([]);
  const { moveToPath, moveToModify } = useCustomMove();
  const [fetching, setFetching] = useState(false);

  const [confirmModal, setConfirmModal] = useState({
    visible: false,
    commentId: null,
    message: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = !!getCookie("member");

  const memberCookie = getCookie("member");
  let memberEmail = null;
  try {
    memberEmail = memberCookie ? memberCookie.email : null;
  } catch (e) {
    console.error(e);
  }

  const handleChangeComment = (e) => {
    const { name, value } = e.target;
    setAddComment((prev) => ({ ...prev, [name]: value }));
  };

  const handleClickAdd = async () => {
    if (!isLogin) {
      navigate(`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`);
      return;
    }
    if (!addComment.content || !addComment.content.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      await commentRegister({ content: addComment.content }, id);
      setAddComment(addCommentState);
      refreshComments();
    } catch (err) {
      console.error(err);
      alert("댓글 등록 중 오류가 발생했습니다.");
    }
  };

  const handleModify = async (commentId, newContent) => {
    if (!newContent || !newContent.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }
    try {
      await commentModify(commentId, { content: newContent });
      refreshComments();
    } catch (err) {
      console.error(err);
      alert("댓글 수정 중 오류가 발생했습니다.");
    }
  };

  const handleRemove = async (commentId) => {
    try {
      await commentRemove(commentId);
      refreshComments();
    } catch (err) {
      console.error(err);
      alert("댓글 삭제 중 오류가 발생했습니다.");
    }
  };

  const refreshComments = async () => {
    try {
      const list = await commentGetList(id);
      console.log(list);
      setComment(
        list.map((c) => ({
          ...c,
          editing: false,
          newContent: c.content || "",
          canEdit: memberEmail && memberEmail === c.email,
        }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setFetching(true);
    getOne(id)
      .then((data) => setBoard(data))
      .finally(() => setFetching(false));
    refreshComments();
    
  }, [id]);

  return (
    <div className="mt-10 m-2 p-4 bg-[#F4C455] rounded-lg shadow-md">
      {fetching && <FetchingModal />}

      {/* 게시글 */}
      <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-md">
        <tbody>
          <tr>
            <td className="border p-4 font-bold w-1/5">번호</td>
            <td className="border p-4">{board.id}</td>
            <td className="border p-4 font-bold w-1/5">작성일자</td>
            <td className="border p-4">
              {board.createDate ? dayjs(board.createDate).format("YYYY-MM-DD HH:mm") : ""}
            </td>
          </tr>
          <tr>
            <td className="border p-4 font-bold">제목</td>
            <td className="border p-4">{board.title}</td>
            <td className="border p-4 font-bold">작성자</td>
            <td className="border p-4">{board.writer}</td>
          </tr>
          <tr>
            <td className="border p-4 font-bold">내용</td>
            <td className="border p-4" colSpan={3}>
              {board.content}
            </td>
          </tr>
        </tbody>
      </table>

      {/* 이미지 */}
      <div className="flex flex-wrap gap-2 mt-4">
        {board.uploadFileNames?.length > 0 ? (
          board.uploadFileNames.map((imgFile, i) => (
            <img
              key={i}
              src={`${prefix}/f/view/${imgFile}`}
              alt={`board-${i}`}
              className="w-1/3 border rounded p-2"
            />
          ))
        ) : (
          <span className="text-gray-500">등록된 이미지가 없습니다</span>
        )}
      </div>

      {/* 버튼 */}
      <div className="flex justify-end mt-4 space-x-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => moveToPath("../")}>
          리스트
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => moveToModify(id)}>
          수정
        </button>
      </div>

      {/* 댓글 입력 */}
      <div className="mt-6 space-y-2">
        <textarea
          name="content"
          rows={4}
          placeholder="댓글을 입력해주세요"
          value={addComment.content}
          onChange={handleChangeComment}
          className="w-full p-2 border rounded-lg"
        />
        <div className="flex justify-end">
          <button
            onClick={handleClickAdd}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            댓글 등록
          </button>
        </div>

        {/* 댓글 리스트 */}
        {comment.length > 0 &&
          comment.map((c) => (
            <div key={c.id} className="flex justify-between p-2 border rounded-lg mt-2 bg-white items-center">
              <span>
                <strong>{c.writer} : </strong>
                {c.content}
              </span>

              
              {c.canEdit && (
                <div className="relative">
                  <button className="peer bg-gray-500 text-white px-3 py-1 rounded">•••</button>
                  <div
                    className="absolute right-0 top-full hidden flex-col space-y-1 
                          peer-hover:flex hover:flex bg-white border rounded shadow-md z-10 min-w-[80px]"
                  >
                    <button
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      onClick={() => handleModify(c.id, c.newContent)}
                    >
                      수정
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() =>
                        setConfirmModal({
                          visible: true,
                          commentId: c.id,
                          message: "댓글을 삭제하시겠습니까?",
                        })
                      }
                    >
                      삭제
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>

      {confirmModal.visible && (
        <ConfirmModal
          visible={confirmModal.visible}
          message={confirmModal.message}
          onConfirm={async () => {
            try {
              await handleRemove(confirmModal.commentId);
            } finally {
              setConfirmModal({ visible: false, commentId: null, message: "" });
            }
          }}
          onCancel={() => setConfirmModal({ visible: false, commentId: null, message: "" })}
        />
      )}
    </div>
  );
};

export default ReadComponent;
