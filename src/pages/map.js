import MainNav from "../common/MainNav";
import KakaoMap from "../component/map/Kakaomap";

export default function MapPage() {
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
              <div>검색 결과 <span className="font-semibold">0</span>개</div>
              <div className="flex items-center gap-2">
                <button className="px-2 py-1 rounded border">거리순</button>
                <button className="px-2 py-1 rounded border">이름순</button>
              </div>
            </div>

            
            <div className="space-y-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm"
                >
                  <div className="h-4 w-2/3 bg-gray-100 rounded mb-2" />
                  <div className="h-3 w-11/12 bg-gray-100 rounded mb-1" />
                  <div className="h-3 w-2/3 bg-gray-100 rounded" />
                </div>
              ))}
            </div>
          </aside>

          
          <section className="rounded-xl border border-gray-200 overflow-hidden">
            
            <KakaoMap />
          </section>
        </div>
      </div>
    </div>
  );
}