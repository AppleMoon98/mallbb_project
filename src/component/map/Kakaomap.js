import { useEffect, useRef } from "react";

const positions = [
  { title: <div>'러브 베이크 하우스'</div>, lat:37.6420211573, lng: 126.6785604873 },
  { title: <div>'스토리오브라망김포풍무점'</div>, lat:37.6074859716, lng: 126.7243716084 },
  { title: <div>'고촌캐슬&파밀리에 파리바게뜨'</div>, lat:37.5934962849, lng: 126.7636075959 },
  { title: <div>'이상용베이커리휴'</div>, lat:37.6460085285, lng: 126.6803642283 },
  { title: <div>'그린베리 쿠키즈'</div>, lat:37.6452795828, lng: 126.6727776645 },
  { title: <div>'파리바게뜨김포점'</div>, lat:37.6074896932, lng: 126.7249380438 },
  { title: <div>'동네식빵(우리동네식빵'</div>, lat:37.6553385841, lng: 126.6831638744 },
  { title: <div>'카페오늘'</div>, lat:37.6398027531, lng: 126.6330548804 },
  { title: <div>'우리동네식빵'</div>, lat:37.622959019, lng: 126.6996661431 },
  { title: <div>'캔아이 케이크'</div>, lat:37.6096231996, lng: 126.7272838325 },
  { title: <div>'더 바른 베이커리'</div>, lat:37.646372471, lng: 126.6769709583 },
  { title: <div>'파리바게뜨(김포시청점'</div>, lat:37.6192930363, lng: 126.7174955238 },
  { title: <div>'파리바게트 김포솔터마을점'</div>, lat:37.6420611857, lng: 126.6337540522 },
  { title: <div>'일빠네(il pane'</div>, lat:37.6002126916, lng: 126.7696474101 },
  { title: <div>'뚜레쥬르 (카페양곡점'</div>, lat:37.6578059524, lng: 126.631133676 },
  { title: <div>'판데오로'</div>, lat:37.6446988777, lng: 126.6671052236 },
  { title: <div>'방긋시루'</div>, lat:37.6405835338, lng: 126.6277072869 },
  { title: <div>'약암리495카페'</div>, lat:37.6382445316, lng: 126.5534512715 },
  { title: <div>'약암리495베이커리'</div>, lat:37.6383139919, lng: 126.5531217034 },
  { title: <div>'모담케이크'</div>, lat:37.6528418899, lng: 126.6844608951 },
  { title: <div>'청수당'</div>, lat:37.6415016269, lng: 126.6190482736 },
  { title: <div>'소굴속'</div>, lat:37.6458444628, lng: 126.6261155061 },
  { title: <div>'102베이커리'</div>, lat:37.6324761255, lng: 126.7048680466 },
  { title: <div>'나무휴식'</div>, lat:37.600731205, lng: 126.7502819697 },
  { title: <div>'파리바게뜨 김포걸포점'</div>, lat:37.6349558771, lng: 126.7063716632 },
  { title: <div>'화이트리에 구래점'</div>, lat:37.6435680201, lng: 126.6266409118 },
  { title: <div>'달팽이의꿈카페'</div>, lat:37.6549853742, lng: 126.628763181 },
  { title: <div>'홍종흔베이커리 김포장기점'</div>, lat:37.6457474702, lng: 126.6700973556 },
  { title: <div>'스카치케이크'</div>, lat:37.6096231996, lng: 126.7272838325 },
  { title: <div>'소굴속베이킹클래스'</div>, lat:37.644708872, lng: 126.6685219985 },
  { title: <div>'비리디언(VIRIDIAN DESSERT'</div>, lat:37.6427244324, lng: 126.6186484508 },
  { title: <div>'파리바게뜨(김포월드점'</div>, lat:37.6457540913, lng: 126.6813645273 },
  { title: <div>'달보드레 베이커리'</div>, lat:37.6060103334, lng: 126.7261316374 },
  { title: <div>'우리동네식빵&바게트'</div>, lat:37.6020990419, lng: 126.7715208605 },
  { title: <div>'삼송빵집'</div>, lat:37.6449545296, lng: 126.6215805592 },
  { title: <div>'당신을위한베이커리'</div>, lat:37.6053088948, lng: 126.774627741 },
  { title: <div>'아앰브레드'</div>, lat:37.6898164139, lng: 126.6005227681 },
  { title: <div>'파리바게뜨 고촌점'</div>, lat:37.6034076993, lng: 126.7703412229 },
  { title: <div>'아비엥또'</div>, lat:37.622728403, lng: 126.7204171111 },
  { title: <div>'비앙그랑'</div>, lat:37.6067496703, lng: 126.7261692948 },
  { title: <div>'1991아빠빵집'</div>, lat:37.6252039289, lng: 126.7024184505 },
  { title: <div>'뚜레쥬르 마산점'</div>, lat:37.6364561526, lng: 126.6376046259 },
  { title: <div>'파리바게뜨풍무꿈에그린점'</div>, lat:37.600495536, lng: 126.7263360352 },
  { title: <div>'팔도명물도너츠'</div>, lat:37.6556882197, lng: 126.6275192643 },
  { title: <div>'아이뚜또(Hai tutto'</div>, lat:37.6457035829, lng: 126.627783433 },
  { title: <div>'베이커리프랜즈(BakeryFriends'</div>, lat:37.6200064563, lng: 126.7190631075 },
  { title: <div>'아이든(AYDIN'</div>, lat:37.6453298622, lng: 126.6235711257 },
  { title: <div>'쉐프부랑제'</div>, lat:37.6490228176, lng: 126.695328315 },
  { title: <div>'카페경선비'</div>, lat:37.6393109616, lng: 126.6737959299 },
  { title: <div>'빵미미'</div>, lat:37.6452795828, lng: 126.6727776645 },
  { title: <div>'고촌빵집'</div>, lat:37.6024049693, lng: 126.7699771686 },
  { title: <div>'베이콜로지 빵학개론 샹그리나점'</div>, lat:37.6016483482, lng: 126.7892545642 },
  { title: <div>'파리바게뜨김포은여울마을점'</div>, lat:37.6370301595, lng: 126.6434009504 },
  { title: <div>'102베이커리(운양점'</div>, lat:37.6547294055, lng: 126.6823996574 },
  { title: <div>'하늘콩(SKY BEAN'</div>, lat:37.6470891288, lng: 126.6711933014 },
  { title: <div>'라페브'</div>, lat:37.644209097, lng: 126.6207278795 },
  { title: <div>'빠앙빠앙 김포구래점'</div>, lat:37.6443790614, lng: 126.6302812895 },
  { title: <div>'식빵앗간'</div>, lat:37.6364561526, lng: 126.6376046259 },
  { title: <div>'뚜레쥬르(대곶점'</div>, lat:37.6507523558, lng: 126.5828112985 },
  { title: <div>'파리바게트 고촌힐스테이트점'</div>, lat:37.5995486559, lng: 126.7686683388 },
  { title: <div>'어바웃브레드'</div>, lat:37.64350166, lng: 126.6261996286 },
  { title: <div>'삼송빵집'</div>, lat:37.6449545296, lng: 126.6215805592 },
  { title: <div>'비앙그랑'</div>, lat:37.6067496703, lng: 126.7261692948 },
  { title: <div>'빚은김포풍무점'</div>, lat:37.6080290398, lng: 126.7247171852 },
  { title: <div>'밀보리앤코'</div>, lat:37.6443790614, lng: 126.6302812895 },
  { title: <div>'뚜레쥬르 김포향산점'</div>, lat:37.6209941073, lng: 126.7476082473 },
  { title: <div>'파리바게트김포운양점'</div>, lat:37.6541357583, lng: 126.682576215 },
  { title: <div>'빵터졌네 You'</div>, lat:37.6465546188, lng: 126.6772409974 },
  { title: <div>'쁘니파이'</div>, lat:37.6012866141, lng: 126.7698634827 },
  { title: <div>'도레도레김포현대몰'</div>, lat:37.5972979801, lng: 126.7852858447 },
  { title: <div>'파리바게뜨김포구래점'</div>, lat:37.6433522547, lng: 126.6254986178 },
  { title: <div>'우리동네식빵'</div>, lat:37.622959019, lng: 126.6996661431 },
  { title: <div>'산토리니의아침김포장기점'</div>, lat:37.6380860431, lng: 126.6687884939 },
  { title: <div>'고촌캐슬&파밀리에 파리바게뜨'</div>, lat:37.5934962849, lng: 126.7636075959 },
  { title: <div>'102베이커리'</div>, lat:37.6324761255, lng: 126.7048680466 },
  { title: <div>'빠냐데로'</div>, lat:37.6513642317, lng: 126.6575991475 },
  { title: <div>'파리바게뜨 풍무역점'</div>, lat:37.611497214, lng: 126.7313092851 },
  { title: <div>'뚜레쥬르 김포마송'</div>, lat:37.6894535889, lng: 126.5978618162 },
  { title: <div>'베이커리홍쉐프'</div>, lat:37.6893312337, lng: 126.598362339 },
  { title: <div>'뚜레쥬르'</div>, lat:37.6549390097, lng: 126.6762528915 },
  { title: <div>'파티피플(party people'</div>, lat:37.639176119, lng: 126.6790111818 },
  { title: <div>'파리바게뜨 김포디원시티점'</div>, lat:37.6440365127, lng: 126.6181342096 },
  { title: <div>'슬로 김포'</div>, lat:37.651580521, lng: 126.6858350282 },
  { title: <div>'호호케이크'</div>, lat:37.6528418899, lng: 126.6844608951 },
  { title: <div>'로마니나'</div>, lat:37.632140211, lng: 126.7058462819 },
  { title: <div>'베이커리결'</div>, lat:37.6341750585, lng: 126.7028552439 },
  { title: <div>'몽블랑제(주 김포점2'</div>, lat:37.6238441903, lng: 126.6986141136 },
  { title: <div>'카페큐'</div>, lat:37.7129071822, lng: 126.5431876712 },
  { title: <div>'파리바게뜨 김포청송마을'</div>, lat:37.6477604819, lng: 126.6666969603 },
  { title: <div>'빵곳간'</div>, lat:37.6224398121, lng: 126.7217572712 },
  { title: <div>'블러썸'</div>, lat:37.6405530739, lng: 126.6774205372 },
  { title: <div>'파리바게뜨김포초당마을'</div>, lat:37.6384560019, lng: 126.6726946517 },
  { title: <div>'파리바게트 김포자이점'</div>, lat:37.633909173, lng: 126.678547796 },
  { title: <div>'Bread77(브레드77'</div>, lat:37.6119825556, lng: 126.7324826267 },
  { title: <div>'식빵이다'</div>, lat:37.652458013, lng: 126.6682088729 },
  { title: <div>'빚은 김포구래점'</div>, lat:37.6435680201, lng: 126.6266409118 },
  { title: <div>'베이크포유 (Bake4u'</div>, lat:37.6440319531, lng: 126.6917322859 },
  { title: <div>'빠앙빠앙 김포사우점'</div>, lat:37.6225408591, lng: 126.7206797003 },
  { title: <div>'파리바게뜨(김포시청점'</div>, lat:37.6192930363, lng: 126.7174955238 },
  { title: <div>'뚜레쥬르 감정점'</div>, lat:37.6271423227, lng: 126.6998366038 },
  { title: <div>'파리바게뜨(김포월드점'</div>, lat:37.6457540913, lng: 126.6813645273 },
  { title: <div>'파리바게뜨김포점'</div>, lat:37.6074896932, lng: 126.7249380438 },
  { title: <div>'파리바게뜨 김포사우점'</div>, lat:37.6217149876, lng: 126.721186914 },
  { title: <div>'블랑슈베이커리'</div>, lat:37.5983056957, lng: 126.7702664419 },
  { title: <div>'블랑제리115'</div>, lat:37.6523401756, lng: 126.6617485247 },
  { title: <div>'강쉐프제빵소'</div>, lat:37.6363133588, lng: 126.6439872036 },
  { title: <div>'뚜레쥬르풍무점'</div>, lat:37.6009606958, lng: 126.7216865371 },
  { title: <div>'프레첼제과점'</div>, lat:37.691709949, lng: 126.5982654831 },
  { title: <div>'뚜레쥬르 김포청송점'</div>, lat:37.6521463385, lng: 126.6700261454 },
  { title: <div>'천안옛날호두과자'</div>, lat:37.6511321064, lng: 126.5899483114 },
  { title: <div>'파리바게트장기신도시점'</div>, lat:37.6449290397, lng: 126.666513227 },
  { title: <div>'프레첼제과점'</div>, lat:37.691709949, lng: 126.5982654831 },
  { title: <div>'떡담'</div>, lat:37.606426111, lng: 126.7221960559 },
  { title: <div>'파리바게뜨김포솔터마을'</div>, lat:37.6420611857, lng: 126.6337540522 },
  { title: <div>'뚜레쥬르 김포구래점'</div>, lat:37.6441407006, lng: 126.6260787927 },
  { title: <div>'뚜레쥬르한강신도시점'</div>, lat:37.6453857587, lng: 126.6610105551 },
  { title: <div>'샤론'</div>, lat:37.7196501432, lng: 126.63306689 },
  { title: <div>'브레드홀릭'</div>, lat:37.6391474215, lng: 126.6723242884 },
  { title: <div>'파리바게뜨 김포한강노블레스점'</div>, lat:37.6455910301, lng: 126.6607248656 },
  { title: <div>'이상용베이커리휴'</div>, lat:37.6460085285, lng: 126.6803642283 },
  { title: <div>'천안옛날호두과자통진점'</div>, lat:37.6805263183, lng: 126.622374693 },
  { title: <div>'우리동네식빵&바게트'</div>, lat:37.6020990419, lng: 126.7715208605 },
  { title: <div>'블랑제리115 고촌점'</div>, lat:37.6062570281, lng: 126.7489689556 },
  { title: <div>'우리동네식빵&베이글'</div>, lat:37.6280670997, lng: 126.7019685483 },
  { title: <div>'동동케이크 김포풍무점'</div>, lat:37.6101500686, lng: 126.7251596926 },
  { title: <div>'밀퐁 (milfon'</div>, lat:37.6443790614, lng: 126.6302812895 },
  { title: <div>'파리바게뜨 김포걸포점'</div>, lat:37.6349558771, lng: 126.7063716632 },
  { title: <div>'유피케이크'</div>, lat:37.649969397, lng: 126.6604375394 },
  { title: <div>'우리동네식빵'</div>, lat:37.622959019, lng: 126.6996661431 },
  { title: <div>'베이커리 결'</div>, lat:37.6551944405, lng: 126.68187307 },
  { title: <div>'라베또디저트'</div>, lat:37.6031756865, lng: 126.7721787641 },
  { title: <div>'파리바게뜨걸포메트로자이점'</div>, lat:37.6331442178, lng: 126.7010302519 },
  { title: <div>'폴브라운'</div>, lat:37.6500739919, lng: 126.6961558315 },
  { title: <div>'좋은아침페스츄리'</div>, lat:37.6432772983, lng: 126.6251141119 },
  { title: <div>'프레첼제과점'</div>, lat:37.691709949, lng: 126.5982654831 },
  { title: <div>'샹제르망 베이커리 커피'</div>, lat:37.6231613542, lng: 126.7123216461 },
  { title: <div>'스토리오브라망김포풍무점'</div>, lat:37.6074859716, lng: 126.7243716084 },
  { title: <div>'뚜레쥬르 (카페양곡점'</div>, lat:37.6578059524, lng: 126.631133676 },
  { title: <div>'파리바게뜨 김포예가점'</div>, lat:37.6408635591, lng: 126.6805907781 },
  { title: <div>'똣똣빵집'</div>, lat:37.6122488078, lng: 126.7318453986 },
  { title: <div>'뚜레쥬르(양곡점'</div>, lat:37.6563027258, lng: 126.6228753128 },
  { title: <div>'빠냐데로'</div>, lat:37.6513642317, lng: 126.6575991475 },
  { title: <div>'파리바게뜨통진점'</div>, lat:37.6927419334, lng: 126.5976745255 },
  { title: <div>'파리바게뜨'</div>, lat:37.5980395806, lng: 126.7201990095 },
  { title: <div>'파리바게트 김포신감정점'</div>, lat:37.6230722616, lng: 126.6990870057 },
  { title: <div>'파리바게뜨'</div>, lat:37.5980395806, lng: 126.7201990095 },
  { title: <div>'쉘브론베이커리'</div>, lat:37.6903558519, lng: 126.6003461223 },
  { title: <div>'hoho브레드'</div>, lat:37.6452690129, lng: 126.6263036106 },
  { title: <div>'던킨도너츠 김포장기점'</div>, lat:37.6439706261, lng: 126.667362725 },
  { title: <div>'던킨 도너츠 김포양촌점'</div>, lat:37.6176068263, lng: 126.6201461202 },
  { title: <div>'플리머스9-3'</div>, lat:37.7234409458, lng: 126.6155822899 },
  { title: <div>'파리바게뜨 김포향산점'</div>, lat:37.6181892775, lng: 126.7473419045 },
  { title: <div>'뚜레쥬르 고촌캐슬파밀리에점'</div>, lat:37.593999541, lng: 126.7561831512 },
  { title: <div>'쉐프부랑제'</div>, lat:37.6490228176, lng: 126.695328315 },
  { title: <div>'파리바게뜨김포호수마을점'</div>, lat:37.6483249888, lng: 126.6300312339 }
];

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

        // 마커 이미지
        const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
        const imageSize = new window.kakao.maps.Size(24, 35);
        const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

        // 마커 생성
        positions.forEach((pos) => {
          const markerPosition = new window.kakao.maps.LatLng(pos.lat, pos.lng);
          new window.kakao.maps.Marker({
            map,
            position: markerPosition,
            title: pos.title,
            image: markerImage,
          });
        });

        // 지도 컨트롤
        const mapTypeControl = new window.kakao.maps.MapTypeControl();
        map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

        const zoomControl = new window.kakao.maps.ZoomControl();
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

        // 현재 위치
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              const here = new window.kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
              map.setCenter(here);
              new window.kakao.maps.Marker({ position: here, map });
              console.log("내 위치로 이동:", pos.coords);
            },
            (err) => console.warn("위치 정보 가져오기 실패:", err)
          );
        } else {
          console.warn("이 브라우저는 Geolocation을 지원하지 않습니다.");
        }
      });
    };

    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script); // cleanup
    };
  }, []);

  return <div ref={mapRef} style={{ width: "500px", height: "400px" }} />;
};

export default KakaoMap;
