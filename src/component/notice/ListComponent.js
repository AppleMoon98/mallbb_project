import { useEffect, useState } from "react";
import { getList } from "../../api/noticeApi";
import PageComponent from "../../common/PageComponent";
import useCustomMove from "../hooks/useCustomMove";
import { Link } from "react-router-dom";
import { Header, OutputList } from "../base/ListComponent";

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const ListComponent = () => {
  const { page, size, moveToList } = useCustomMove();
  const [serverData, setServerData] = useState(initState);

  useEffect(() => {
    getList({ page, size }).then((data) => setServerData(data));
  }, [page, size]);

  return (
    <div className="w-[60%] mx-auto my-5">
      <h2 className="mb-4 text-2xl font-bold">공지사항</h2>
      <ul className="m-0 list-none p-0">
        {/* 헤더 /base/Listcomponent.js */}
        <Header />

        {/* 목록 /base/Listcomponent.js */}
        <OutputList serverData={serverData} onClickTitle={moveToList} />
      </ul>

      <div className="mt-5 text-center">
        <PageComponent serverData={serverData} movePage={moveToList} />
      </div>
      <div className="flex justify-end">
        <Link to="/notice/add" className="mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          글 등록
        </Link>
      </div>
    </div>
  );
};

export default ListComponent;
