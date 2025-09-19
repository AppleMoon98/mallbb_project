import { useEffect, useRef } from "react";

const KakaoMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=62ac1fc7ba05748992f67450c7825c1a&autoload=false`;
    script.async = true;

    script.onload = () => {
      console.log("Kakao SDK 로드 완료");
      window.kakao.maps.load(() => {
        if (!mapRef.current) return;

        const map = new window.kakao.maps.Map(mapRef.current, {
          keyboardShortcuts: true,
          center: new window.kakao.maps.LatLng(37.5665, 126.9780),
          level: 3,
        });
        console.log("기본 지도 생성됨");
        
        const mapTypeControl = new window.kakao.maps.MapTypeControl();

        map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

        const zoomControl = new window.kakao.maps.ZoomControl();
        
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);


        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              const here = new window.kakao.maps.LatLng(
                pos.coords.latitude,
                pos.coords.longitude
              );
              map.setCenter(here);
              new window.kakao.maps.Marker({ position: here }).setMap(map);
              console.log("내 위치로 이동:", pos.coords);
            },
            (err) => {
              console.warn("위치 정보 가져오기 실패:", err);
            }
          );
        } else {
          console.warn("이 브라우저는 Geolocation을 지원하지 않습니다.");
        }
      });
    };

    document.head.appendChild(script);
  }, []);

  return <div ref={mapRef} style={{ width: "500px", height: "400px" }} />;
};

export default KakaoMap;
