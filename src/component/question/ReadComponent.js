import { useEffect, useState, useCallback } from "react";
import useCustomMove from "../hooks/useCustomMove";
import { API_SERVER_HOST } from "../../api/config";
import { getOne , remove } from "../../api/questionApi";
import FetchingModal from "../../common/FetchingModal";
import ConfirmModal from "../../common/ConfirmModal";
import dayjs from "dayjs";
import { commentGetList, commentRegister, commentRemove ,commentModify } from "../../api/questionCommentApi";
import useAuthGuard from "../hooks/useAuthGuard";

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

const addCommentState = {content: "" };

const ReadComponent = ({ id }) => {
  const [board, setBoard] = useState(boardState);
  const [addComment, setAddComment] = useState(addCommentState);
  const [comment, setComment] = useState([]);
  const [fetching, setFetching] = useState(false);
  const { moveToPath, moveToModify } = useCustomMove();
  const { ensureLogin, member, isAdmin } = useAuthGuard();

  const [confirmModal, setConfirmModal] = useState({
    visible: false,
    commentId: null,
    message: "",
    type: "",
  });

  const memberEmail = member?.email || null;

  const refreshComments = useCallback(async () => {
    try {
      const list = await commentGetList(id);
      setComment(
        list.map((c) => ({
          ...c,
          editing: false,
          newContent: c.content || "-",
          canEdit: (memberEmail && memberEmail === c.email) || isAdmin,
        }))
      );
    } catch (err) {
      console.error(err);
    }
  }, [id, memberEmail, isAdmin]);

  const handleModify = async (commentId, newContent) => {
    if (!ensureLogin()) return;
    if (!newContent.trim()) {
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

  const handleClickAdd = async () => {
    if (!ensureLogin()) return;
    if (!addComment.content.trim()) {
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

  const handleClickCommentRemove = async (commentId) => {
    if (!ensureLogin()) return;
    try {
      await commentRemove(commentId);
      refreshComments();
    } catch (err) {
      console.error(err);
      alert("댓글 삭제 중 오류가 발생했습니다.");
    }
  };

  const handleClickBoardRemove = async (boardId) => {
    if (!ensureLogin()) return;
    try {
      await remove(boardId);
      moveToPath('../', true);
    } catch (err) {
      console.error(err);
      alert("게시글 삭제 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    setFetching(true);
    getOne(id)
.then((data) => {
        const canEdit = (memberEmail && memberEmail === data.email) || isAdmin;
        setBoard({ ...data, canEdit });
      })
      .finally(() => setFetching(false));
    refreshComments();
  }, [id, memberEmail, isAdmin, refreshComments]);

  return (
    <div className="mt-10 m-2 p-4 bg-[#F4C455] rounded-lg shadow-md">
      {fetching && <FetchingModal />}

      {/* 게시글 테이블 */}
      <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-md">
        <tbody>
          <tr>
            <td className="border p-4 font-bold w-1/5">번호</td>
            <td className="border p-4">{board.id}</td>
            <td className="border p-4 font-bold w-1/5">작성일자</td>
            <td className="border p-4">
              {board.createDate ? dayjs(board.createDate).format("YYYY-MM-DD HH:mm") : "-"}
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
              <br />{board.content}
              <br /><br /><br /><br />
            </td>
          </tr>
        </tbody>
      </table>

      {board.canEdit && (
        <div className="relative flex justify-end pt-3">
          <button className="peer bg-gray-500 text-white px-3 py-1 rounded">•••</button>
          <div className="absolute right-0 top-full hidden flex-col space-y-1 
                          peer-hover:flex hover:flex bg-white border rounded shadow-md z-10 min-w-[80px]">
            <button className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              onClick={() => moveToModify(id)} >
              수정
            </button>
            <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => setConfirmModal({ visible: true, commentId: board.id, message: "글을 삭제하시겠습니까?", type: "board" })}>
              삭제
            </button>
          </div>
        </div>
      )}

      {/* 이미지 */}
      <div className="flex flex-wrap gap-2 mt-4">
        {board.uploadFileNames?.length > 0 ? (
          board.uploadFileNames.map((imgFile, i) => (
            <img key={i} src={`${prefix}/f/view/${imgFile}`} alt={`board-${i}`} className="w-full border rounded p-2" />
          ))) : (<span className="text-gray-500">등록된 이미지가 없습니다</span>)}
      </div>

      {/* 댓글 입력 */}
      <div className="mt-6 space-y-2">
        <textarea
          name="content"
          rows={4}
          placeholder="댓글을 입력해주세요"
          value={addComment.content}
          onChange={(e) => setAddComment({ content: e.target.value })}
          className="w-full p-2 border rounded-lg"
        />
        <div className="flex justify-end">
          <button onClick={handleClickAdd}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            댓글 등록
          </button>
        </div>

        {/*댓글 리스트*/}
        {comment.map((c) => (
          <div key={c.id} className="flex justify-between p-2 border rounded-lg mt-2 bg-white items-center">
            <span className="flex-1">
              {c.editing ? (
                <input
                  type="text"
                  value={c.newContent}
                  onChange={(e) =>
                    setComment((prev) =>
                      prev.map((item) =>
                        item.id === c.id ? { ...item, newContent: e.target.value } : { ...item, editing: false }
                      )
                    )
                  }
                  className="border p-1 rounded w-full"
                />
              ) : (
                `${c.writer} : ${c.content}`
              )}
            </span>

            {c.canEdit && (
              <div className="relative">
                <button className="peer bg-gray-500 text-white px-3 py-1 rounded">•••</button>
                <div className="absolute right-0 top-full hidden flex-col space-y-1 
                        peer-hover:flex hover:flex bg-white border rounded shadow-md z-10 min-w-[80px]">
                  {c.editing ? (
                    <button
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      onClick={() => handleModify(c.id, c.newContent)}
                    >
                      저장
                    </button>
                  ) : (
                    <button
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      onClick={() =>
                        setComment((prev) =>
                          prev.map((item) =>
                            item.id === c.id ? { ...item, editing: true } : item
                          )
                        )
                      }
                    >
                      수정
                    </button>
                  )}
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => setConfirmModal({
                      visible: true,
                      commentId: c.id,
                      message: "댓글을 삭제하시겠습니까?",
                      type: "comment"
                    })}
                  >
                    삭제
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <ConfirmModal
        visible={confirmModal.visible}
        message={confirmModal.message}
        onConfirm={async () => {
          try {
            if (confirmModal.type === "comment")
              await handleClickCommentRemove(confirmModal.commentId);
            else if (confirmModal.type === "board")
              await handleClickBoardRemove(confirmModal.commentId);
          } finally {
            setConfirmModal({ visible: false, commentId: null, message: "", type: ""});
          }
        }}
        onCancel={() => setConfirmModal({ visible: false, commentId: null, message: "", type: ""})}
      />
    </div>
  );
};

export default ReadComponent;
