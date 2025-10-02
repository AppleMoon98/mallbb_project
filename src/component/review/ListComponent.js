import { useEffect, useState } from "react";
import { getList } from "../../api/reviewApi";
import useCustomMove from "../hooks/useCustomMove";
import { Link } from "react-router-dom";
import "../../css/review.css";
import CardItem from "./CardItem";
import { API_SERVER_HOST } from "../../api/config";
import PageComponent from "../../common/PageComponent";
import useAuthGuard from "../hooks/useAuthGuard";
import { ListToRegister } from "../base/BoardComponent";


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

const prefix = API_SERVER_HOST;

const ListComponent = () => {
  const { page, moveToList, moveToRead } = useCustomMove()
  const [serverData, setServerData] = useState(initState);
  const { ensureLogin } = useAuthGuard()
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
              <ListToRegister type="review" />
            </div>
          </div>
          <div className='cards'>
            <div className="cards__container">
              <div className="cards__wrapper">
                <ul className="cards__items">
                  {serverData.dtoList.slice(0, 3).map(item => (
                    <CardItem
                      key={item.id}
                      src={`${prefix}/r/view/s_${item.uploadFileNames}`}
                      text={item.title.length > 10 ? `${item.title.slice(0,10)}...` : item.title}
                      label={item.writer}
                      path={`/review/read/${item.id}`}
                    />
                  ))}
                </ul>
                <ul className="cards__items">
                  {serverData.dtoList.slice(3, 6).map(item => (
                    <CardItem
                      key={item.id}
                      src={`${prefix}/r/view/s_${item.uploadFileNames}`}
                      text={item.title.length > 10 ? `${item.title.slice(0,10)}...` : item.title}
                      label={item.writer}
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