import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtAxios from "../util/JWTUtil";
import { API_SERVER_HOST } from "../api/config";
import MainNav from "../common/MainNav";
import ConfirmModal from "../common/ConfirmModal";
import useAuthGuard from "../component/hooks/useAuthGuard";

export default function ReservationListPage() {
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();
  const { ensureLogin } = useAuthGuard()

  const [confirmModal, setConfirmModal] = useState({
    visible: false,
    commentId: null,
    message: "",
    type: "",
  });

  const handleClickCommentRemove = async (reservationId) => {
    console.log(reservationId)
    if (!ensureLogin()) return;
    try {
      await jwtAxios.delete(`${API_SERVER_HOST}/api/reservations/${reservationId}`);
      alert("예약이 성공적으로 취소되었습니다.");
      fetchReservations();
    } catch (err) {
      console.error("에러 : " + err);
      alert("예약 취소 중 오류가 발생했습니다.");
    }
  };

  const fetchReservations = async () => {
    try {
      const res = await jwtAxios.get(`${API_SERVER_HOST}/api/reservations`);
      console.log(res)
      setReservations(res.data);
    } catch (err) {
      console.error("예약 내역 조회 오류:", err);
      alert("예약 내역을 불러오는 중 오류가 발생했습니다.");
      // navigate("/"); // 에러 시 홈으로
    }
  };

  useEffect(() => {

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
            {reservations.map((res, index) => (
              <div key={index}
                className="p-4 border rounded-xl bg-white shadow-sm">
                <button onClick={() => setConfirmModal({
                  visible: true,
                  commentId: res.id,
                  message: "예약을 취소하시겠습니까?",
                  type: "reservation",
                })} className="block ml-auto w-fit items-center rounded-xl bg-red-600 px-3 py-1 text-sm font-medium text-white shadow
                hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 active:translate-y-px">
                  X
                </button>
                <div className="flex flex-row">
                  <div className="font-semibold text-2xl">{res.bakeryName}</div>
                  <div className="text-sm text-gray-500 my-2 ml-auto">
                    <div>예약 날짜 : {res.date}</div>
                    <div>예약 시간 : {res.time}</div>
                  </div>
                </div>
                <div className="mb-2">{res.bakeryAddress}</div>

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

      {confirmModal.visible && (
        <ConfirmModal
          visible={confirmModal.visible}
          message={confirmModal.message}
          onConfirm={async () => {
            try {
              if (confirmModal.type === "reservation")
                await handleClickCommentRemove(confirmModal.commentId);
            } finally {
              setConfirmModal({ visible: false, commentId: null, message: "", type: "" });
            }
          }}
          onCancel={() => setConfirmModal({ visible: false, commentId: null, message: "", type: "" })}
        />
      )}
    </div>
  );
}