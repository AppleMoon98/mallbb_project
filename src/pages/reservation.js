import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MainNav from "../common/MainNav";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import ko from "dayjs/locale/ko";
import { ko as kor } from "date-fns/locale";

dayjs.locale("ko");

export default function Reservation() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);

  return (
    <div style={{ padding: 20 }}>
        <MainNav/>
        <h2>예약 페이지</h2>

      {/*달력 선택*/}
      <div style={{ marginBottom: 20 }}>
        <label>날짜 선택: </label>
        <ReactDatePicker
          locale={kor}
          dateFormat="yyyy-MM-dd"
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            console.log("선택한 날짜:", dayjs(date).format("YYYY-MM-DD"));
          }}
          minDate={new Date()}
        />
      </div>

      {/*시간 선택*/}
      <div style={{ marginBottom: 20 }}>
        <label>시간 선택: </label>
        <ReactDatePicker
          locale={kor}
          selected={selectedTime}
          onChange={(time) => {
            setSelectedTime(time);
            console.log(
              "선택한 시간:",
              time ? dayjs(time).format("A hh:mm") : null
            );
          }}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          timeCaption="시간"
          dateFormat="aa hh:mm"
          timeFormat="aa hh:mm"
        />
      </div>

      <div>
        <p>선택된 날짜: {dayjs(selectedDate).format("YYYY년 MM월 DD일")}</p>
        <p>선택된 시간: {selectedTime ? dayjs(selectedTime).format("A hh:mm"):"-"}</p>
      </div>
    </div>
  );
}