import { useEffect, useState } from "react";
import { getList } from "../../api/reviewApi";
import useCustomMove from "../hooks/useCustomMove";
import { Link } from "react-router-dom";
import "../../css/review.css";
import CardItem from "./CardItem";
import { API_SERVER_HOST } from "../../api/config";
import PageComponent from "../../common/PageComponent";



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
  current: 0
}

const prefix = API_SERVER_HOST;

const ListComponent = () => {
  const { page, moveToList, moveToRead } = useCustomMove()
  const [serverData, setServerData] = useState(initState);
  const size = 6

  useEffect(() => {
    getList({ page, size }).then(data =>
      setServerData({
        ...initState, ...data,
        dtoList: Array.isArray(data?.dtoList) ? data.dtoList : [],
      }));
  }, [page, size])

  return (
    <>
      <div className="w-[60%] mx-auto my-5">
        <ul className="m-0 list-none p-0">
          <div className="flex justify-between">
            <h2 className="mb-4 text-2xl font-bold">리뷰게시판</h2>
            <div className="justify-end">
              <Link to="/review/add"
                className="inline-flex items-center rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow
              hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 active:translate-y-px">
                글 등록
              </Link>
            </div>
          </div>
          <div className='cards'>
            <div className="cards__container">
              <div className="cards__wrapper">
                <ul className="cards__items">
                  {serverData.dtoList.slice(0, 3).map(item => (
                    <CardItem
                      key={item.id}
                      src={`${prefix}/r/view/${item.uploadFileNames}`}
                      text={item.title}
                      label={''}
                      path={`/review/read/${item.id}`}
                    />
                  ))}
                </ul>
                <ul className="cards__items">
                  {serverData.dtoList.slice(3, 6).map(item => (
                    <CardItem
                      key={item.id}
                      src={`${prefix}/r/view/${item.uploadFileNames}`}
                      text={item.title}
                      label={''}
                      path={`/review/read/${item.id}`}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </ul>

        <div className="mt-5 text-center">
          <PageComponent serverData={serverData} movePage={moveToList} />
        </div>
      </div>
    </>
  );
};

export default ListComponent;