import { useEffect, useState } from "react";
import { getList } from "../../api/reviewApi";
import PageComponent from "../../common/PageComponent";
import useCustomMove from "../hooks/useCustomMove";
import { Link } from "react-router-dom";
import "../../css/review.css";
import CardItem from "./CardItem";
import { API_SERVER_HOST } from "../../api/freeApi";


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
  const { page, size, moveToList, moveToRead } = useCustomMove()
  const [serverData, setServerData] = useState(initState);

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
        <h2 className="mb-4 text-2xl font-bold">리뷰게시판</h2>
        <ul className="m-0 list-none p-0">
          <div className="flex justify-end">
            <Link to="/review/add"
              className="inline-flex items-center rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow
                hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 active:translate-y-px">
              글 등록
            </Link>
          </div>
          {/* 목록 /base/Listcomponent.js */}
          <div className='cards'>
            <div className="cards__container">
              <div className="cards__wrapper">

                <ul className='cards__items'>
                  <CardItem
                    src={`${prefix}/f/view/69fbfc92-a79b-4829-8b47-95ac09c6169a-25-09-02_00007_.png`}
                    text='Set Sail in the Atlantic Ocean visiting Uncharted Waters'
                    label='Mystery'
                    path='/services'
                  />
                  <CardItem
                    src={`${prefix}/f/view/69fbfc92-a79b-4829-8b47-95ac09c6169a-25-09-02_00007_.png`}
                    text='Experience Football on Top of the Himilayan Mountains'
                    label='Adventure'
                    path='/products'
                  />
                  <CardItem
                    src={`${prefix}/f/view/69fbfc92-a79b-4829-8b47-95ac09c6169a-25-09-02_00007_.png`}
                    text='Ride through the Sahara Desert on a guided camel tour'
                    label='Adrenaline'
                    path='/sign-up'
                  />
                </ul>
                <ul className='cards__items'>
                  <CardItem
                    src={`${prefix}/f/view/69fbfc92-a79b-4829-8b47-95ac09c6169a-25-09-02_00007_.png`}
                    text='Set Sail in the Atlantic Ocean visiting Uncharted Waters'
                    label='Mystery'
                    path='/services'
                  />
                  <CardItem
                    src={`${prefix}/f/view/69fbfc92-a79b-4829-8b47-95ac09c6169a-25-09-02_00007_.png`}
                    text='Experience Football on Top of the Himilayan Mountains'
                    label='Adventure'
                    path='/products'
                  />
                  <CardItem
                    src={`${prefix}/f/view/69fbfc92-a79b-4829-8b47-95ac09c6169a-25-09-02_00007_.png`}
                    text='Ride through the Sahara Desert on a guided camel tour'
                    label='Adrenaline'
                    path='/sign-up'
                  />
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