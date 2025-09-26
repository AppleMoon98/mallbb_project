import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";
import MainNav from "../common/MainNav";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { ko as kor } from "date-fns/locale";
import { getBakeries } from "../api/bakeryApi";

dayjs.locale("ko");

export default function Reservation() {
  const navigate = useNavigate();

  // 훅은 항상 최상단에서 선언
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [bakeries, setBakeries] = useState([]);
  const [bakery, setBakery] = useState(null); // 선택된 가게

  // 최초 데이터 가져오기
  useEffect(() => {
    const fetchBakery = async () => {
      const data = await getBakeries();
      setBakeries(data);
      // 기본적으로 첫 번째 가게 선택
      if (data.length > 0) setBakery(data[0]);
    };
    fetchBakery();
  }, []);

  if (!bakery) {
    return (
      <div>
        <MainNav />
        <div className="mx-14 mt-14">가게 정보를 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div>
      <MainNav />
      <div className="mx-14 mt-14">
        <div className="text-2xl font-bold mb-4">예약 페이지</div>

        {/* 가게 정보 */}
        <div className="mb-4 p-4 border border-gray-300 rounded bg-white">
          <h1 className="font-semibold text-lg">가게이름 : {bakery.name}</h1>
          <div>주소 : {bakery.townAddress}</div>
          <div>
            영업시간(openDate) : {dayjs(bakery.openDate).format("a hh:mm")}
          </div>
          <div>
            영업시간(closeDate) : {dayjs(bakery.closeDate).format("a hh:mm")}
          </div>
          <div>주차여부 : {bakery.parking ? "O" : "X"}</div>
        </div>

        {/* 달력 선택 */}
        <div className="mb-4">
          <label>날짜 선택: </label>
          <ReactDatePicker
            locale={kor}
            dateFormat="yyyy-MM-dd"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            minDate={new Date()}
          />
        </div>

        {/* 시간 선택 */}
        <div className="mb-4">
          <label>시간 선택: </label>
          <ReactDatePicker
            locale={kor}
            selected={selectedTime}
            onChange={(time) => setSelectedTime(time)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption="시간"
            dateFormat="aa hh:mm"
            timeFormat="aa hh:mm"
          />
        </div>

        {/* 선택 표시 */}
        <div>
          <p>선택된 날짜: {dayjs(selectedDate).format("YYYY년 MM월 DD일")}</p>
          <p>
            선택된 시간:{" "}
            {selectedTime ? dayjs(selectedTime).format("A hh:mm") : "-"}
          </p>
        </div>
      </div>
    </div>
  );
}
