import { useLocation } from "react-router-dom";
import MainNav from "../common/MainNav";

export default function ReservationConfirm() {
  const location = useLocation();
  const reservation = location.state?.reservation;

  if (!reservation) {
    console.log(reservation)
    return <div>예약 정보가 없습니다.</div>;
  }

  return (
    <div>
      <MainNav />
      <div className="mx-14 mt-14 space-y-6">
        <h1 className="text-2xl font-bold">예약 확인</h1>

        <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-2">
          <div className="text-sm text-gray-600">
            가게 : {reservation.bakeryName}
          </div>
          <div className="text-sm text-gray-600">
            예약 날짜 : {reservation.date}
          </div>
          <div className="text-sm text-gray-600">
            예약 시간 : {reservation.time}
          </div>
          <div className="space-y-1">
            {reservation.menu.map((m) => (
              <div key={m.id} className="flex justify-between">
                <span>{m.name} x {m.quantity}</span>
                <span>{(m.price * m.quantity).toLocaleString()}원</span>
              </div>
            ))}
          </div>
          <div className="mt-2 text-right font-bold text-lg">
            총 합계: {reservation.totalPrice.toLocaleString()}원
          </div>
        </div>
      </div>
    </div>
  );
}