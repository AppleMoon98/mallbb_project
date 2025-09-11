import { useEffect, useState } from "react";
import { getOne ,remove} from "../../api/noticeApi";
import useCustomMove from "../hooks/useCustomMove";
import { API_SERVER_HOST } from "../../api/config";
import FetchingModal from "../../common/FetchingModal";
import { data } from "react-router-dom";

const initState = {
  id: 0,
  title: "",
  content: "",
  createDate: "",
  desc: "",
  delflag: false,
  uploadFilenames: [],
}

const prefix = API_SERVER_HOST;

const ReadComponent = ({ id }) => {
  const [notice, setNotice] = useState(initState);
  const [fetching, setFetching] = useState(false);
  const { moveToList, moveToModify , moveToPath } = useCustomMove();

  const handleClickDelete = async() => {
        if(!window.confirm("정말 삭제하시겠습니까?")) return;
        try{
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
    getOne(id).then(data => {
      console.log(data)
      setNotice(data);
      setFetching(false);
    });
  }, [id]);
  
  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {fetching ? <FetchingModal /> : null}

      {makeDiv("번호", notice.id)}
      {makeDiv("제목", notice.title)}
      {makeDiv("내용", notice.content)}
      {makeDiv("작성일자", notice.createDate)}


      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">이미지</div>
          <div className="w-4/5 flex flex-wrap gap-2 p-4">
            {notice.uploadFileNames?.length > 0 ? (
              notice.uploadFileNames.map((imgFile, i) => (
                <img
                  key={i}
                  alt={`notice${i}`}
                  className="p-2 w-1/3 cursor-pointer border rounded"
                  src={`${prefix}/n/view/${imgFile}`}
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
        onClick={handleClickDelete}
      >
        삭제
      </button>
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-yellow-500"
          onClick={() => moveToList()}
        >
          리스트
        </button>
        <button
        type="button"
        className="rounded p-4 m-2 text-xl w-32 text-white bg-green-500"
        onClick={() => moveToModify(id)}
        >
        수정
        </button>
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