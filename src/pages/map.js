import { useEffect, useRef, useState } from "react";
import MainNav from "../common/MainNav";
import { getBakeries, getBakeryProducts } from "../api/bakeryApi";
import KakaoMap, { positions } from "../component/map/Kakaomap";
import dayjs from "dayjs";
import { moveAxios } from "../api/config";

export default function MapPage() {
  const [bakeries, setBakeries] = useState([]);
  const [selectedBakery, setSelectedBakery] = useState(null);
  const [menuList, setMenuList] = useState([]);
  const kakaoMapRef = useRef(null);
  const [searchKeyword, setSearchKeyword] = useState("");

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
  }, []);


  const handleClickBakery = async (b) => {
    setSelectedBakery(b);

    if (kakaoMapRef.current && b && b.lat != null && b.lng != null) {
      kakaoMapRef.current.moveTo(b.lat, b.lng);
    }
    console.log("bid : " + b.id)
    const res = await getBakeryProducts(b.id)
    setMenuList(
            res.map((m) => ({
              ...m,
              name: m.name,
              price: m.price || "-",
            }))
          );
    console.log(menuList)
  };

  // (선택사항) KakaoMap 내부 마커 클릭으로 선택 처리되게 하려면 onSelectBakery 전달
  const handleSelectBakeryFromMap = async (b) => {
    // map에서 올라온 선택 이벤트를 동일하게 처리
    await handleClickBakery(b);
  };

  return (
    <div className="min-h-screen">
      <MainNav />

      <div className="px-4 md:px-6 lg:px-8">
        <h1 className="text-3xl font-bold my-4">지도페이지</h1>

        {/* 전체: 왼쪽 목록 / 오른쪽(지도 + 상세패널) */}
        <div className="grid grid-cols-1 md:grid-cols-[420px_1fr] gap-3 h-[calc(100vh-160px)]">

          {/* 왼쪽: 가게 목록 */}
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
            <div className="flex h-full">
              {/* 지도 영역 */}
              <div style={{ width: "100%", height: "100%", minHeight: "500px" }} className="flex-1">
                <KakaoMap
                  ref={kakaoMapRef}
                  bakeries={bakeriesWithPositions}
                  onSelectBakery={handleSelectBakeryFromMap}
                />
              </div>

              {/* 오른쪽 상세 아울렛 패널*/}
              <div className="w-96 border-l bg-white overflow-auto p-4">
                {selectedBakery ? (
                  <>
                    <div className="mb-3">
                      <h2 className="text-xl font-bold">{selectedBakery.name}</h2>
                      <div className="text-sm text-gray-600">{selectedBakery.townAddress || selectedBakery.loadAddress}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        영업 시간 : {selectedBakery.openDate ? dayjs(selectedBakery.openDate).format('a hh:mm') + " - " + dayjs(selectedBakery.closeDate).format('a hh:mm') : '정보가 없습니다.'}
                      </div>
                      <div className="text-sm text-gray-600">주차 : {selectedBakery.parking ? "O" : "X"}</div>
                    </div>

                    {/* (옵션) 예약 버튼 / 달력으로 바로 이동 등 추가 가능 */}
                    <div className="mt-4">
                      <button className="w-full bg-indigo-600 text-white py-2 rounded" onClick={() => {
                        
                        // navigate(`/reservation?bakeryId=${selectedBakery.id}`)
                        alert("예약 흐름 연결하세요 (예: 예약 페이지로 이동)");
                      }}>
                        예약하기
                      </button>
                    </div>

                    <div className="mt-5">
                      <h3 className="font-semibold mb-2">메뉴</h3>
                      {menuList.length > 0 ? (
                        <ul className="space-y-2">
                          {menuList.map(menu => (
                            <li key={menu.id} className="p-2 border rounded">
                              <div className="font-medium">{menu.name}</div>
                              <div className="text-sm text-gray-500">{menu.description}</div>
                              <div className="text-sm font-semibold mt-1">{menu.price?.toLocaleString()}원</div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-500">메뉴 정보가 없습니다.</p>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="text-gray-400">왼쪽 목록에서 가게를 선택하면 상세정보와 메뉴가 표시됩니다.</div>
                )}
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
