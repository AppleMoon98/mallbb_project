import { useEffect, useState } from "react";
import { getOne ,remove} from "../../api/noticeApi";
import useCustomMove from "../hooks/useCustomMove";
import { API_SERVER_HOST } from "../../api/config";
import FetchingModal from "../../common/FetchingModal";
import ConfirmModal from "../../common/ConfirmModal";
import dayjs from "dayjs";
import useAuthGuard from "../hooks/useAuthGuard";

const prefix = API_SERVER_HOST;


const initState = {
  id: 0,
  title: "",
  content: "",
  createDate: "",
  delflag: false,
  writer: "운영자",
  uploadFileNames: [],
}


const ReadComponent = ({ id }) => {
  const [notice, setNotice] = useState(initState);
  const [fetching, setFetching] = useState(false);
  const { moveToModify , moveToPath } = useCustomMove();
  const { ensureLogin, member, isAdmin } = useAuthGuard();

  const [confirmModal, setConfirmModal] = useState({
    visible: false,
    commentId: null,
    message: "",
    type: "",
  });

  const memberEmail = member?.email || null;

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
        setNotice({ ...data, canEdit });
      })
      .finally(() => setFetching(false));
  }, [id, memberEmail, isAdmin]);
  
  return (
    <div className="mt-10 m-2 p-4 bg-[#F4C455] rounded-lg shadow-md">
    {fetching && <FetchingModal />}


    <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-md">
        <tbody>
          <tr>
            <td className="border p-4 font-bold w-1/5">번호</td>
            <td className="border p-4">{notice.id}</td>
            <td className="border p-4 font-bold w-1/5">작성일자</td>
            <td className="border p-4">
              {notice.createDate ? dayjs(notice.createDate).format("YYYY-MM-DD HH:mm") : "-"}
            </td>
          </tr>
          <tr>
            <td className="border p-4 font-bold">제목</td>
            <td className="border p-4">{notice.title}</td>
            <td className="border p-4 font-bold">작성자</td>
            <td className="border p-4">운영자</td>
          </tr>
          <tr>
            <td className="border p-4 font-bold">내용</td>
            <td className="border p-4" colSpan={3}>
              <br />{notice.content}
              <br /><br /><br /><br />
            </td>
          </tr>
        </tbody>
      </table>

      {notice.canEdit && (
        <div className="relative flex justify-end pt-3">
          <button className="peer bg-gray-500 text-white px-3 py-1 rounded">•••</button>
          <div className="absolute right-0 top-full hidden flex-col space-y-1 
                          peer-hover:flex hover:flex bg-white border rounded shadow-md z-10 min-w-[80px]">
            <button className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              onClick={() => moveToModify(id)} >
              수정
            </button>
            <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => setConfirmModal({ visible: true, commentId: notice.id, message: "글을 삭제하시겠습니까?", type: "board" })}>
              삭제
            </button>
          </div>
        </div>
      )}

      {/* 이미지 */}
      <div className="flex flex-wrap gap-2 mt-4">
        {notice.uploadFileNames?.length > 0 ? (
          notice.uploadFileNames.map((imgFile, i) => (
            <img key={i} src={`${prefix}/n/view/${imgFile}`} alt={`notice-${i}`} className="w-1/3 border rounded p-2" />
          ))) : (<span className="text-gray-500">등록된 이미지가 없습니다</span>)}
      </div>

      {confirmModal.visible && (
        <ConfirmModal
          visible={confirmModal.visible}
          message={confirmModal.message}
          onConfirm={async () => {
            try {
              await handleClickBoardRemove(confirmModal.commentId);
            } finally {
              setConfirmModal({ visible: false, commentId: null, message: "", type: "" });
            }
          }}
          onCancel={() => setConfirmModal({ visible: false, commentId: null, message: "", type: "" })}
        />
      )}
      </div>
  )
  }

export default ReadComponent;