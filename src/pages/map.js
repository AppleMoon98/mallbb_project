import { useEffect, useRef, useState } from "react";
import MainNav from "../common/MainNav";
import { getBakeries } from "../api/bakeryApi"
import KakaoMap, { positions } from "../component/map/Kakaomap";


export default function MapPage() {

  const [bakeries, setBakeries] = useState([]);
  const kakaoMapRef = useRef(null);

  const bakeriesWithPositions = bakeries.map(b => {
    const pos = positions.find(p => p.content === b.name);
    return { ...b, lat: pos?.lat, lng: pos?.lng };
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBakeries();
      setBakeries(data);
    };
    fetchData();

    console.log("=========================")
    console.log(bakeries)
    console.log("=========================")
  }, []);

  const handleClickBakery = (b) => {
    if (kakaoMapRef.current && b && b.lat != null && b.lng != null) {
      kakaoMapRef.current.moveTo(b.lat, b.lng);
    }
  };

  return (
    <div className="min-h-screen">
      <MainNav />

      <div className="px-4 md:px-6 lg:px-8">
        <h1 className="text-3xl font-bold my-4">지도페이지</h1>


        <div className="grid grid-cols-1 md:grid-cols-[420px_1fr] gap-3 h-[calc(100vh-160px)]">


          <aside className="border-r md:pr-3 overflow-y-auto">

            <div className="flex items-center gap-2 mb-3">
              <input
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm"
                placeholder="검색"
              />
            </div>


            <div className="flex items-center justify-between mb-2 text-sm text-gray-500">
              <div>검색 결과 <span className="font-semibold">{bakeries.length}</span>개</div>
              <div className="flex items-center gap-2">
                <button className="px-2 py-1 rounded border">거리순</button>
              </div>
            </div>


            <div className="space-y-2">
              {bakeriesWithPositions.map((b) => (
                <div
                  key={b.id}
                  className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm"
                  onClick={() => handleClickBakery(b)}
                >
                  <div className="font-semibold">{b.name}</div>
                  <div className="text-sm text-gray-500">{b.loadAddress || b.townAddress}</div>
                  {/* <div className="text-xs text-gray-400 mt-1">
                    {b.lat ?? "-"}, {b.lng ?? "-"}
                  </div> */}

                </div>
              ))}
            </div>
          </aside>


          <section className="rounded-xl border border-gray-200 overflow-hidden h-full">
            <div style={{ width: "100%", height: "100%", minHeight: "500px" }}>
              <KakaoMap ref={kakaoMapRef} bakeries={bakeriesWithPositions} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}