import { useEffect, useState } from "react";
import useCustomMove from "../hooks/useCustomMove";
import { API_SERVER_HOST, getOne } from "../../api/freeApi";
import FetchingModal from "../../common/FetchingModal";


const initState = {
  id: 0,
  title: "",
  content: "",
  startDate: "",
  desc: "",
  delflag: false,
  uploadFilenames: [],
}

const prefix = API_SERVER_HOST;

const ReadComponent = ({ id }) => {
  const [free, setFree] = useState(initState);
  const { moveToList, moveToModify } = useCustomMove();
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true)
    getOne(id).then((data) => {
      setFree(data)
      setFetching(false)
    })
  }, [id])

  return (
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      {fetching ? <FetchingModal /> : <></>}

      {makeDiv("번호", free.id)}
      {makeDiv("제목", free.title)}
      {makeDiv("내용", free.content)}
      {makeDiv("작성일자", free.createDate)}

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">이미지</div>
          <div className="w-4/5 flex flex-wrap gap-2 p-4">
            {free.uploadFileNames?.length > 0 ? (
              free.uploadFileNames.map((imgFile, i) => (
                <img
                  key={i}
                  alt={`free-${i}`}
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
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
          onClick={() => moveToList()}
        >
          List
        </button>
        <button
          type="button"
          className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
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