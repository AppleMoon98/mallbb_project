import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtAxios from "../util/JWTUtil";
import { API_SERVER_HOST } from "../api/config";
import MainNav from "../common/MainNav";

export default function ReservationListPage() {
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await jwtAxios.get(`${API_SERVER_HOST}/api/reservations`);  // 여기가 에러
        console.log(res)
        setReservations(res.data);
      } catch (err) {
        console.error("예약 내역 조회 오류:", err);
        alert("예약 내역을 불러오는 중 오류가 발생했습니다.");
        // navigate("/"); // 에러 시 홈으로
      }
    };

    fetchReservations();
  }, [navigate]);

  return (
    <div>
      <MainNav />
      <div className="mx-14 mt-14">
        <h1 className="text-2xl font-bold mb-6">예약 내역</h1>

        {reservations.length === 0 ? (
          <p className="text-gray-500">예약 내역이 없습니다.</p>
        ) : (
          <div className="space-y-4">
            {reservations.map((res) => (
              <div
                key={res.bakeryId + res.date + res.time}
                className="p-4 border rounded-xl bg-white shadow-sm"
              >
                <div className="font-semibold text-lg">{res.bakeryName}</div>
                <div className="text-sm text-gray-500 mb-2">
                  {res.date} {res.time}
                </div>
                <div className="text-sm mb-2">{res.bakeryAddress}</div>

                <div className="text-sm font-medium">메뉴:</div>
                <ul className="ml-4 mb-2">
                  {res.menu?.map((item) => (
                    <li key={item.menuId}>
                      {item.name} × {item.quantity} ={" "}
                      {(item.price * item.quantity).toLocaleString()}원
                    </li>
                  ))}
                </ul>

                <div className="text-right font-bold">
                  총 합계: {res.totalPrice.toLocaleString()}원
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}