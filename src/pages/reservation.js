import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";
import MainNav from "../common/MainNav";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { ko as kor } from "date-fns/locale";
import { getBakeryProducts } from "../api/bakeryApi";
import useAuthGuard from "../component/hooks/useAuthGuard";
import { getCookie } from "../util/CookieUtil";
import { API_SERVER_HOST } from "../api/config";
import axios from "axios";
import jwtAxios from "../util/JWTUtil";

dayjs.locale("ko");

export default function Reservation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { ensureLogin } = useAuthGuard();

  const bakery = location.state?.bakery || null;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [menuList, setMenuList] = useState([]);
  const [sending, setSending] = useState(false);

  // 로그인 체크 및 bakery 정보 확인
  useEffect(() => {
    if (!ensureLogin()) return;
    if (!bakery) {
      alert("예약할 가게 정보가 없습니다.");
      navigate(-1);
      return;
    }

    const fetchMenu = async () => {
      try {
        const res = await getBakeryProducts(bakery.id);
        const arr = Array.isArray(res) ? res : [];
        setMenuList((prev) => {
          const prevMap = new Map(prev.map((p) => [String(p.id), p]));
          return arr.map((item) => {
            const prevItem = prevMap.get(String(item.id));
            return {
              ...item,
              quantity: typeof prevItem?.quantity === "number" ? prevItem.quantity : 0,
              price: typeof item.price === "number" ? item.price : item.price ? Number(item.price) : 0,
            };
          });
        });
      } catch (err) {
        console.error("getBakeryProducts error:", err);
        setMenuList([]);
      }
    };
    fetchMenu();
  }, [bakery, navigate]);

  // 메뉴 수량 증가/감소
  const handleQuantityChange = (id, delta) => {
    setMenuList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, (item.quantity || 0) + delta) } : item
      )
    );
  };

  // 예약 완료 클릭
  const handleReserveSubmit = async () => {
    setSending(true);

    // 로그인 검사 로직은 유지
    const token = getCookie("member");
    if (!token) {
      alert("예약하려면 로그인 해야합니다.");
      navigate(-1);
      return;
    }
    
    if (!selectedTime) {
      alert("시간을 선택해주세요.");
      setSending(false);
      return;
    }
    
    const selectedMenu = menuList.filter((item) => (item.quantity || 0) > 0);
    if (selectedMenu.length === 0) {
      alert("메뉴를 선택해주세요.");
      setSending(false);
      return;
    }
    
    const totalPrice = selectedMenu.reduce((sum, m) => sum + (m.price || 0) * (m.quantity || 0), 0);
    
    const reservationData = {
      bakeryId: bakery.id,
      bakeryName: bakery.name,
      bakeryAddress: bakery.loadAddress || bakery.townAddress,
      date: dayjs(selectedDate).format("YYYY-MM-DD"),
      time: dayjs(selectedTime).format("HH:mm"),
      menu: selectedMenu.map((m) => ({
        menuId: m.id,
        name: m.name,
        quantity: m.quantity,
        price: m.price,
        totalPrice: (m.price || 0) * (m.quantity || 0),
      })),
      totalPrice,
    };
    
    try {
      const res = await jwtAxios.post(`${API_SERVER_HOST}/api/reservations`, reservationData, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true //
      });
      
      alert("정상적으로 예약 되었습니다.");
      navigate("/reservationconfirm", {
        state: { reservation: reservationData, serverResponse: res.data },
      });
    } catch (err) {
      const serverMsg = err?.response?.data?.message || err?.message || "예약 전송 중 오류가 발생했습니다.";
      alert(serverMsg);
    } finally {
      setSending(false);
    }
  };

  const totalSelected = menuList.reduce((sum, m) => sum + (m.quantity || 0), 0);

  return (
    <div>
      <MainNav />
      <div className="mx-14 mt-14 space-y-6">
        {/* 가게 정보 */}
        <section className="bg-white rounded-2xl border shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-2">가게 정보</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-2 rounded-xl border">
              <span className="font-medium">이름: </span>
              {bakery.name}
            </div>
            <div className="bg-gray-50 p-2 rounded-xl border">
              <span className="font-medium">영업시간: </span>
              {bakery.openDate
                ? `${dayjs(bakery.openDate).format("a hh:mm")} ~ ${dayjs(bakery.closeDate).format("a hh:mm")}`
                : "정보 없음"}
            </div>
            <div className="bg-gray-50 p-2 rounded-xl border">
              <span className="font-medium">주차: </span>
              {bakery.parking ? "O" : "X"}
            </div>
          </div>
        </section>

        {/* 예약 날짜/시간 + 메뉴 선택 */}
        <section className="bg-white rounded-2xl border shadow-sm p-6 grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">예약 시간 선택</h2>
            <ReactDatePicker
              locale={kor}
              inline
              selected={selectedDate}
              onChange={setSelectedDate}
              minDate={new Date()}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">시간 선택</label>
              <ReactDatePicker
                locale={kor}
                selected={selectedTime}
                onChange={setSelectedTime}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="시간"
                dateFormat="aa hh:mm"
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">메뉴 선택</h2>
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {menuList.map((menu) => (
                <div key={menu.id} className="flex justify-between items-center p-2 border rounded-xl bg-gray-50">
                  <div>
                    <div className="font-medium">{menu.name}</div>
                    <div className="text-sm text-gray-500">{(menu.price || 0).toLocaleString()}원</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button type="button" className="px-2 py-1 bg-gray-200 rounded" onClick={() => handleQuantityChange(menu.id, -1)}>-</button>
                    <span>{menu.quantity || 0}</span>
                    <button type="button" className="px-2 py-1 bg-gray-200 rounded" onClick={() => handleQuantityChange(menu.id, 1)}>+</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 예약 정보 */}
        <section className="bg-white rounded-2xl border shadow-sm p-6 mt-6">
          <h2 className="text-lg font-semibold mb-3">예약 정보</h2>
          <div className="space-y-2 mb-4 max-h-[200px] overflow-y-auto">
            {menuList.filter((m) => m.quantity > 0).map((m) => (
              <div key={m.id} className="flex justify-between items-center p-2 border rounded-xl bg-gray-50">
                <div>
                  <div className="font-medium">{m.name}</div>
                  <div className="text-sm text-gray-500">{(m.price || 0).toLocaleString()}원 × {m.quantity}</div>
                </div>
                <div className="font-semibold">{((m.price || 0) * m.quantity).toLocaleString()}원</div>
              </div>
            ))}
            {totalSelected === 0 && <div className="text-sm text-gray-500">선택한 메뉴가 없습니다.</div>}
          </div>
          <div className="mb-4 text-sm text-gray-600">
            <div>예약 날짜: {dayjs(selectedDate).format("YYYY-MM-DD")}</div>
            <div>예약 시간: {selectedTime ? dayjs(selectedTime).format("HH:mm") : "-"}</div>
          </div>
          <div className="text-right font-bold text-lg">
            총 합계: {menuList.reduce((sum, m) => sum + (m.price || 0) * (m.quantity || 0), 0).toLocaleString()}원
          </div>
        </section>

        <button
          className={`w-full md:w-auto px-5 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-4 ${
            totalSelected === 0 ? "bg-gray-400 text-gray-200 cursor-not-allowed focus:ring-gray-200" : "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-200"
          }`}
          onClick={handleReserveSubmit}
          disabled={totalSelected === 0 || sending}
        >
          예약 완료
        </button>
      </div>
    </div>
  );
}