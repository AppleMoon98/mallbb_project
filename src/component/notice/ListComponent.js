import { useEffect, useState } from "react";
import { getList } from "../../api/noticeApi";
import PageComponent from "../../common/PageComponent";
import useCustomMove from "../hooks/useCustomMove";
import { OutputList, ListToRegister } from "../base/BoardComponent";
import useAuthGuard from "../hooks/useAuthGuard";
import dayjs from "dayjs";

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
  writer: null
};

const ListComponent = () => {
  const { page, size, moveToList , moveToRead } = useCustomMove();
  const [serverData, setServerData] = useState(initState);
  const { isAdmin } = useAuthGuard();
  
  const onClickTitle = () => {

  }

  useEffect(() => {
    getList({ page, size }).then((data) => setServerData(data));
  }, [page, size]);

  return (
   <div className="w-[60%] mx-auto my-5">
      <h2 className="mb-4 text-2xl font-bold">공지사항</h2>
      <ul className="m-0 list-none p-0">

        {/* 목록 /base/Listcomponent.js */}
        <OutputList serverData={serverData} onClickTitle={moveToRead} booltype={true} />
      </ul>

      <div className="mt-5 text-center">
        
        {/* 페이징 처리 */}
        <PageComponent serverData={serverData} movePage={moveToList} />
      </div>
      <div className="flex justify-end">

        {/* 글생성 버튼 */}
        {isAdmin && <ListToRegister type="notice" />}
      </div>
    </div>
  );
};

export default ListComponent;
