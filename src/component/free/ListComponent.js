import { useEffect, useState } from "react";
import { getList } from "../../api/freeApi";
import PageComponent from "../../common/PageComponent";
import useCustomMove from "../hooks/useCustomMove";
import { OutputList, ListToRegister } from "../base/BoardComponent";

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalcount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
  writer: null
}


const ListComponent = () => {
  const { page, size, moveToList , moveToRead } = useCustomMove()
  const [serverData, setServerData] = useState(initState)

  useEffect(() => {
    getList({ page, size }).then(data => setServerData({...initState, ...data,
        dtoList: Array.isArray(data?.dtoList) ? data.dtoList : [],}));
  }, [page, size])

  return (
    <div className="w-[60%] mx-auto my-5">
      <h2 className="mb-4 text-2xl font-bold">자유게시판</h2>
      <ul className="m-0 list-none p-0">

        {/* 목록 /base/Listcomponent.js */}
        <OutputList serverData={serverData} onClickTitle={moveToRead} />
      </ul>

      <div className="mt-5 text-center">
        
        {/* 페이징 처리 */}
        <PageComponent serverData={serverData} movePage={moveToList} />
      </div>
      <div className="flex justify-end">

        {/* 글생성 버튼 */}
        <ListToRegister type="free" />
      </div>
    </div>
  )
}

export default ListComponent;