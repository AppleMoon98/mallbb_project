import MainNav from "../common/MainNav";
import KakaoMap from "../component/map/Kakaomap";

const MapPage = () => {
  return (
    <div>
      <MainNav />
      <div className="flex flex-col items-center">
        <h1 className="text-4xl mb-4">지도페이지</h1>
        <KakaoMap />
      </div>
    </div>
  );
};

export default MapPage;