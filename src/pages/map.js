import { useEffect, useRef, useState } from "react";
import MainNav from "../common/MainNav";
import { getBakeries, getBakeryProducts } from "../api/bakeryApi";
import KakaoMap, { positions } from "../component/map/Kakaomap";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import useAuthGuard from "../component/hooks/useAuthGuard";

export default function MapPage() {
  const [bakeries, setBakeries] = useState([]);
  const [selectedBakery, setSelectedBakery] = useState(null);
  const [menuList, setMenuList] = useState([]);
  const kakaoMapRef = useRef(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();
  const { ensureLogin } = useAuthGuard();
  const [activeTab, setActiveTab] = useState("menu");

  // 지도에 표시할 위치 포함
  const bakeriesWithPositions = bakeries.map((b) => {
    const pos = positions.find((p) => p.content === b.name);
    return { ...b, lat: pos?.lat, lng: pos?.lng };
  });

  const filterBakeries = bakeriesWithPositions.filter((b) =>
    b.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBakeries();
        setBakeries(data || []);
      } catch (err) {
        console.error("getBakeries error:", err);
      }
    };
    fetchData();
  }, []);

  // 가게 선택 시 메뉴 로드
  const handleClickBakery = async (bakery) => {
    // 렌더링에 필요한 최소 정보만 저장
    const minimalBakery = {
      id: bakery.id,
      name: bakery.name,
      openDate: bakery.openDate,
      closeDate: bakery.closeDate,
      parking: bakery.parking,
      townAddress: bakery.townAddress,
      loadAddress: bakery.loadAddress,
      lat: bakery.lat,
      lng: bakery.lng,
    };
    setSelectedBakery(minimalBakery);

    // 지도 이동
    if (kakaoMapRef.current && bakery.lat != null && bakery.lng != null) {
      kakaoMapRef.current.moveTo(bakery.lat, bakery.lng);
    }

    // 메뉴 가져오기
    try {
      const res = await getBakeryProducts(bakery.id);
      setMenuList(
        (res || []).map((m) => ({
          id: m.id,
          name: m.name,
          description: m.description,
          price: m.price || 0,
        }))
      );
    } catch (err) {
      console.error("getBakeryProducts error:", err);
      setMenuList([]);
    }
  };

  const handleReserveClick = () => {
    if (!ensureLogin()) return;
    if (!selectedBakery) return;
    navigate("/reservation", { state: { bakery: selectedBakery } });
  };

  return (
    <div className="min-h-screen">
      <MainNav />

      <div className="px-4 md:px-6 lg:px-8">
        <h1 className="text-3xl font-bold my-4">지도페이지</h1>

        <div className="grid grid-cols-1 md:grid-cols-[420px_1fr] gap-3 h-[calc(100vh-160px)]">
          {/* 왼쪽 가게 목록 */}
          <aside className="border-r md:pr-3 overflow-y-auto p-3">
            <input
              className="flex-1 rounded-lg border border-gray-300 px-10 py-2 text-sm mb-3"
              placeholder="검색"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <div className="space-y-2">
              {filterBakeries.map((b) => (
                <div
                  key={b.id}
                  onClick={() => handleClickBakery(b)}
                  className={`rounded-xl border p-3 shadow-sm cursor-pointer ${selectedBakery?.id === b.id ? "ring-2 ring-indigo-300" : ""
                    }`}
                >
                  <div className="font-semibold">{b.name}</div>
                  <div className="text-sm text-gray-500">
                    {b.loadAddress || b.townAddress}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* 오른쪽 지도 + 상세 */}
          <section className="rounded-xl border overflow-hidden h-full">
            <div className="flex h-full">
              <div style={{ width: "100%", height: "100%", minHeight: "500px" }} className="flex-1">
                <KakaoMap
                  ref={kakaoMapRef}
                  bakeries={bakeriesWithPositions}
                  onSelectBakery={handleClickBakery}
                />
              </div>

              <div className="w-96 border-l bg-white overflow-auto p-4">
                {selectedBakery ? (
                  <>
                    <h2 className="text-xl font-bold">{selectedBakery.name}</h2>
                    <div className="text-sm text-gray-600">
                      {selectedBakery.townAddress || selectedBakery.loadAddress}
                    </div>
                    <div className="text-sm text-gray-600">
                      영업시간:{" "}
                      {selectedBakery.openDate
                        ? `${dayjs(selectedBakery.openDate).format("a hh:mm")} - ${dayjs(
                          selectedBakery.closeDate
                        ).format("a hh:mm")}`
                        : "정보 없음"}
                    </div>
                    <div className="text-sm text-gray-600">
                      주차: {selectedBakery.parking ? "O" : "X"}
                    </div>

                    <button
                      className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded"
                      onClick={handleReserveClick}
                    >
                      예약하기
                    </button>

                    {/* 탭 버튼 */}
                    <div className="flex gap-2 mt-4">
                      <button
                        className={`px-3 py-1 rounded ${activeTab === "menu" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                        onClick={() => setActiveTab("menu")}
                      >
                        메뉴
                      </button>
                      <button
                        className={`px-3 py-1 rounded ${activeTab === "review" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                        onClick={() => setActiveTab("review")}
                      >
                        리뷰
                      </button>
                    </div>

                    {activeTab === "menu" && (
                      <>
                    <h3 className="mt-5 font-semibold">메뉴</h3>
                    {menuList.length > 0 ? (
                      <ul className="space-y-2">
                        {menuList.map((m) => (
                          <li key={m.id} className="p-2 border rounded">
                            <div className="font-medium">{m.name}</div>
                            <div className="text-sm text-gray-500">{m.description}</div>
                            <div className="text-sm font-semibold mt-1">{m.price?.toLocaleString()}원</div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500">메뉴 정보가 없습니다.</p>
                    )}
                    </>
                    )}
                    {activeTab === "review" && (
                      <></>
                    )}
                  </>
                ) : (
                  <p className="text-gray-400 text-lg text-center flex items-center">
                    왼쪽 목록에서 가게를 선택하면<br/>
                    상세정보와 메뉴가 표시됩니다.
                  </p>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}