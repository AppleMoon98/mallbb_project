import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainNav from "../common/MainNav";
import { getBakeries } from "../api/bakeryApi";
import KakaoMap, { positions } from "../component/map/Kakaomap";
import axios from "axios";

export default function MapPage() {
  const [bakeries, setBakeries] = useState([]);
  const [selectedBakery, setSelectedBakery] = useState(null);
  const kakaoMapRef = useRef(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  const bakeriesWithPositions = bakeries.map(b => {
    const pos = positions.find(p => p.content === b.name);
    return { ...b, lat: pos?.lat, lng: pos?.lng };
  });

  const filterBakeries = bakeriesWithPositions.filter(b =>
    b.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBakeries();
      setBakeries(data || []);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 클릭 시: 1) 선택 상태, 2) 지도 이동, 3) Reservation 페이지로 navigate
  const handleClickBakery = async (b) => {
    if (!b) return;

    setSelectedBakery(b);

    // 지도 이동 (기존 동작 유지)
    if (kakaoMapRef.current && b.lat != null && b.lng != null) {
      kakaoMapRef.current.moveTo(b.lat, b.lng);
    }

    // (선택) 메뉴를 미리 가져와서 넘기고 싶다면 여기서 fetch 가능.
    // 하지만 Reservation 쪽이 폴백으로 메뉴를 fetch하도록 해 두었으니
    // 가벼운 상태 전달을 위해 bakery 객체와 bakeryId만 넘기면 충분합니다.

    // navigate로 Reservation으로 이동시키기 (state로 bakery 전달, + query로 bakeryId)
    navigate(`/reservation?bakeryId=${b.id}`, {
      state: {
        bakeryId: b.id,
        bakery: b,      // 전체 객체 전달 (크지 않은 경우 ok)
        // 메뉴를 여기서 미리 로드해서 넘기고 싶으면 menuList를 추가
      }
    });
  };

  // (선택) KakaoMap에서 마커 클릭으로도 예약페이지로 가게 하려면
  // KakaoMap에 onSelectBakery prop을 전달하고 내부 클릭에서 호출하면 됨.

  return (
    <div className="min-h-screen">
      <MainNav />

      <div className="px-4 md:px-6 lg:px-8">
        <h1 className="text-3xl font-bold my-4">지도페이지</h1>

        <div className="grid grid-cols-1 md:grid-cols-[420px_1fr] gap-3 h-[calc(100vh-160px)]">
          <aside className="border-r md:pr-3 overflow-y-auto p-3">
            <div className="flex items-center gap-2 mb-3">
              <input
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm"
                placeholder="검색"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between mb-2 text-sm text-gray-500">
              <div>검색 결과 <span className="font-semibold">{filterBakeries.length}</span>개</div>
              <div className="flex items-center gap-2">
                <button className="px-2 py-1 rounded border">거리순</button>
              </div>
            </div>

            <div className="space-y-2">
              {filterBakeries.map((b) => (
                <div
                  key={b.id}
                  onClick={() => handleClickBakery(b)}
                  className={`rounded-xl border border-gray-200 bg-white p-3 shadow-sm cursor-pointer ${selectedBakery?.id === b.id ? "ring-2 ring-indigo-300" : ""}`}
                >
                  <div className="font-semibold">{b.name}</div>
                  <div className="text-sm text-gray-500">{b.loadAddress || b.townAddress}</div>
                </div>
              ))}
            </div>
          </aside>

          <section className="rounded-xl border border-gray-200 overflow-hidden h-full">
            <div style={{ width: "100%", height: "100%", minHeight: "500px" }}>
              <KakaoMap
                ref={kakaoMapRef}
                bakeries={bakeriesWithPositions}
                onSelectBakery={(b) => {
                  // map 내부에서 가게 클릭시에도 같은 동작을 원하면 사용:
                  // handleClickBakery(b);
                  // 현재는 map 클릭은 상세패널만 열고 싶다면 이 줄 비워두거나 다르게 처리
                  handleClickBakery(b);
                }}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}