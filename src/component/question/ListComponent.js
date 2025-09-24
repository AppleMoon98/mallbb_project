  import { useEffect, useState } from "react";
  import { getList } from "../../api/questionApi";
  import PageComponent from "../../common/PageComponent";
  import useCustomMove from "../hooks/useCustomMove";
  import { Link } from "react-router-dom";
  import { OutputList } from "../base/BoardComponent";

  const initState = {
      dtoList:[],
      pageNumList:[],
      pageRequestDTO: null,
      prev:false,
      next:false,
      totalcount:0,
      prevPage:0,
      nextPage:0,
      totalPage:0,
      current:0,
      writer: null
  };


  const ListComponent = () =>{
      const {page,size,moveToList, moveToRead} = useCustomMove()
      const [serverData, setServerData] = useState(initState);
      
      useEffect(() => {
      getList({ page, size }).then(data => setServerData({...initState, ...data,
          dtoList: Array.isArray(data?.dtoList) ? data.dtoList : [],}));
    }, [page, size])

      return (
    <div className="w-[60%] mx-auto my-5">
        <h2 className="mb-4 text-2xl font-bold">질문게시판</h2>
        <ul className="m-0 list-none p-0">

          {/* 목록 /base/Listcomponent.js */}
          <OutputList serverData={serverData} onClickTitle={moveToRead} />
        </ul>

        <div className="mt-5 text-left">
          <PageComponent serverData={serverData} movePage={moveToList} />
        </div>
        <div className="flex justify-end">
          <Link to="/question/add" className="inline-flex items-left rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow
                        hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 active:translate-y-px">
            글 등록
          </Link>
        </div>
      </div>
    );
  };

  export default ListComponent;