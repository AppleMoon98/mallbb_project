import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

export const positions = [
  { content: '러브 베이크 하우스', lat: 37.6420211573, lng: 126.6785604873 },
  { content: '스토리오브라망김포풍무점', lat: 37.6074859716, lng: 126.7243716084 },
  { content: '고촌캐슬&파밀리에 파리바게뜨', lat: 37.5934962849, lng: 126.7636075959 },
  { content: '이상용베이커리휴', lat: 37.6460085285, lng: 126.6803642283 },
  { content: '그린베리 쿠키즈', lat: 37.6452795828, lng: 126.6727776645 },
  { content: '파리바게뜨김포점', lat: 37.6074896932, lng: 126.7249380438 },
  { content: '동네식빵(우리동네식빵)', lat: 37.6553385841, lng: 126.6831638744 },
  { content: '카페오늘', lat: 37.6398027531, lng: 126.6330548804 },
  { content: '우리동네식빵', lat: 37.622959019, lng: 126.6996661431 },
  { content: '캔아이 케이크', lat: 37.6096231996, lng: 126.7272838325 },
  { content: '더 바른 베이커리', lat: 37.646372471, lng: 126.6769709583 },
  { content: '파리바게뜨(김포시청점)', lat: 37.6192930363, lng: 126.7174955238 },
  { content: '파리바게트 김포솔터마을점', lat: 37.6420611857, lng: 126.6337540522 },
  { content: '일빠네(il pane)', lat: 37.6002126916, lng: 126.7696474101 },
  { content: '뚜레쥬르 (카페양곡점)', lat: 37.6578059524, lng: 126.631133676 },
  { content: '판데오로', lat: 37.6446988777, lng: 126.6671052236 },
  { content: '방긋시루', lat: 37.6405835338, lng: 126.6277072869 },
  { content: '약암리495카페', lat: 37.6382445316, lng: 126.5534512715 },
  { content: '약암리495베이커리', lat: 37.6383139919, lng: 126.5531217034 },
  { content: '모담케이크', lat: 37.6528418899, lng: 126.6844608951 },
  { content: '청수당', lat: 37.6415016269, lng: 126.6190482736 },
  { content: '소굴속', lat: 37.6458444628, lng: 126.6261155061 },
  { content: '102베이커리', lat: 37.6324761255, lng: 126.7048680466 },
  { content: '나무휴식', lat: 37.600731205, lng: 126.7502819697 },
  { content: '파리바게뜨 김포걸포점', lat: 37.6349558771, lng: 126.7063716632 },
  { content: '화이트리에 구래점', lat: 37.6435680201, lng: 126.6266409118 },
  { content: '달팽이의꿈카페', lat: 37.6549853742, lng: 126.628763181 },
  { content: '홍종흔베이커리 김포장기점', lat: 37.6457474702, lng: 126.6700973556 },
  { content: '스카치케이크', lat: 37.6096231996, lng: 126.7272838325 },
  { content: '소굴속베이킹클래스', lat: 37.644708872, lng: 126.6685219985 },
  { content: '비리디언(VIRIDIAN DESSERT)', lat: 37.6427244324, lng: 126.6186484508 },
  { content: '파리바게뜨(김포월드점)', lat: 37.6457540913, lng: 126.6813645273 },
  { content: '달보드레 베이커리', lat: 37.6060103334, lng: 126.7261316374 },
  { content: '우리동네식빵&바게트', lat: 37.6020990419, lng: 126.7715208605 },
  { content: '삼송빵집', lat: 37.6449545296, lng: 126.6215805592 },
  { content: '당신을위한베이커리', lat: 37.6053088948, lng: 126.774627741 },
  { content: '아앰브레드', lat: 37.6898164139, lng: 126.6005227681 },
  { content: '파리바게뜨 고촌점', lat: 37.6034076993, lng: 126.7703412229 },
  { content: '아비엥또', lat: 37.622728403, lng: 126.7204171111 },
  { content: '비앙그랑', lat: 37.6067496703, lng: 126.7261692948 },
  { content: '1991아빠빵집', lat: 37.6252039289, lng: 126.7024184505 },
  { content: '뚜레쥬르 마산점', lat: 37.6364561526, lng: 126.6376046259 },
  { content: '파리바게뜨풍무꿈에그린점', lat: 37.600495536, lng: 126.7263360352 },
  { content: '팔도명물도너츠', lat: 37.6556882197, lng: 126.6275192643 },
  { content: '아이뚜또(Hai tutto)', lat: 37.6457035829, lng: 126.627783433 },
  { content: '베이커리프랜즈(BakeryFriends)', lat: 37.6200064563, lng: 126.7190631075 },
  { content: '아이든(AYDIN)', lat: 37.6453298622, lng: 126.6235711257 },
  { content: '쉐프부랑제', lat: 37.6490228176, lng: 126.695328315 },
  { content: '카페경선비', lat: 37.6393109616, lng: 126.6737959299 },
  { content: '빵미미', lat: 37.6452795828, lng: 126.6727776645 },
  { content: '고촌빵집', lat: 37.6024049693, lng: 126.7699771686 },
  { content: '베이콜로지 빵학개론 샹그리나점', lat: 37.6016483482, lng: 126.7892545642 },
  { content: '파리바게뜨김포은여울마을점', lat: 37.6370301595, lng: 126.6434009504 },
  { content: '102베이커리(운양점)', lat: 37.6547294055, lng: 126.6823996574 },
  { content: '하늘콩(SKY BEAN)', lat: 37.6470891288, lng: 126.6711933014 },
  { content: '라페브', lat: 37.644209097, lng: 126.6207278795 },
  { content: '빠앙빠앙 김포구래점', lat: 37.6443790614, lng: 126.6302812895 },
  { content: '식빵앗간', lat: 37.6364561526, lng: 126.6376046259 },
  { content: '뚜레쥬르(대곶점)', lat: 37.6507523558, lng: 126.5828112985 },
  { content: '파리바게트 고촌힐스테이트점', lat: 37.5995486559, lng: 126.7686683388 },
  { content: '어바웃브레드', lat: 37.64350166, lng: 126.6261996286 },
  { content: '삼송빵집', lat: 37.6449545296, lng: 126.6215805592 },
  { content: '비앙그랑', lat: 37.6067496703, lng: 126.7261692948 },
  { content: '빚은김포풍무점', lat: 37.6080290398, lng: 126.7247171852 },
  { content: '밀보리앤코', lat: 37.6443790614, lng: 126.6302812895 },
  { content: '뚜레쥬르 김포향산점', lat: 37.6209941073, lng: 126.7476082473 },
  { content: '파리바게트김포운양점', lat: 37.6541357583, lng: 126.682576215 },
  { content: '빵터졌네 You', lat: 37.6465546188, lng: 126.6772409974 },
  { content: '쁘니파이', lat: 37.6012866141, lng: 126.7698634827 },
  { content: '도레도레김포현대몰', lat: 37.5972979801, lng: 126.7852858447 },
  { content: '파리바게뜨김포구래점', lat: 37.6433522547, lng: 126.6254986178 },
  { content: '우리동네식빵', lat: 37.622959019, lng: 126.6996661431 },
  { content: '산토리니의아침김포장기점', lat: 37.6380860431, lng: 126.6687884939 },
  { content: '고촌캐슬&파밀리에 파리바게뜨', lat: 37.5934962849, lng: 126.7636075959 },
  { content: '102베이커리', lat: 37.6324761255, lng: 126.7048680466 },
  { content: '빠냐데로', lat: 37.6513642317, lng: 126.6575991475 },
  { content: '파리바게뜨 풍무역점', lat: 37.611497214, lng: 126.7313092851 },
  { content: '뚜레쥬르 김포마송', lat: 37.6894535889, lng: 126.5978618162 },
  { content: '베이커리홍쉐프', lat: 37.6893312337, lng: 126.598362339 },
  { content: '뚜레쥬르', lat: 37.6549390097, lng: 126.6762528915 },
  { content: '파티피플(party people)', lat: 37.639176119, lng: 126.6790111818 },
  { content: '파리바게뜨 김포디원시티점', lat: 37.6440365127, lng: 126.6181342096 },
  { content: '슬로 김포', lat: 37.651580521, lng: 126.6858350282 },
  { content: '호호케이크', lat: 37.6528418899, lng: 126.6844608951 },
  { content: '로마니나', lat: 37.632140211, lng: 126.7058462819 },
  { content: '베이커리결', lat: 37.6341750585, lng: 126.7028552439 },
  { content: '몽블랑제(주) 김포점2', lat: 37.6238441903, lng: 126.6986141136 },
  { content: '카페큐', lat: 37.7129071822, lng: 126.5431876712 },
  { content: '파리바게뜨 김포청송마을', lat: 37.6477604819, lng: 126.6666969603 },
  { content: '빵곳간', lat: 37.6224398121, lng: 126.7217572712 },
  { content: '블러썸', lat: 37.6405530739, lng: 126.6774205372 },
  { content: '파리바게뜨김포초당마을', lat: 37.6384560019, lng: 126.6726946517 },
  { content: '파리바게트 김포자이점', lat: 37.633909173, lng: 126.678547796 },
  { content: 'Bread77(브레드77)', lat: 37.6119825556, lng: 126.7324826267 },
  { content: '식빵이다', lat: 37.652458013, lng: 126.6682088729 },
  { content: '빚은 김포구래점', lat: 37.6435680201, lng: 126.6266409118 },
  { content: '베이크포유 (Bake4u)', lat: 37.6440319531, lng: 126.6917322859 },
  { content: '빠앙빠앙 김포사우점', lat: 37.6225408591, lng: 126.7206797003 },
  { content: '파리바게뜨(김포시청점)', lat: 37.6192930363, lng: 126.7174955238 },
  { content: '뚜레쥬르 감정점', lat: 37.6271423227, lng: 126.6998366038 },
  { content: '파리바게뜨(김포월드점)', lat: 37.6457540913, lng: 126.6813645273 },
  { content: '파리바게뜨김포점', lat: 37.6074896932, lng: 126.7249380438 },
  { content: '파리바게뜨 김포사우점', lat: 37.6217149876, lng: 126.721186914 },
  { content: '블랑슈베이커리', lat: 37.5983056957, lng: 126.7702664419 },
  { content: '블랑제리115', lat: 37.6523401756, lng: 126.6617485247 },
  { content: '강쉐프제빵소', lat: 37.6363133588, lng: 126.6439872036 },
  { content: '뚜레쥬르풍무점', lat: 37.6009606958, lng: 126.7216865371 },
  { content: '프레첼제과점', lat: 37.691709949, lng: 126.5982654831 },
  { content: '뚜레쥬르 김포청송점', lat: 37.6521463385, lng: 126.6700261454 },
  { content: '천안옛날호두과자', lat: 37.6511321064, lng: 126.5899483114 },
  { content: '파리바게트장기신도시점', lat: 37.6449290397, lng: 126.666513227 },
  { content: '프레첼제과점', lat: 37.691709949, lng: 126.5982654831 },
  { content: '떡담', lat: 37.606426111, lng: 126.7221960559 },
  { content: '파리바게뜨김포솔터마을', lat: 37.6420611857, lng: 126.6337540522 },
  { content: '뚜레쥬르 김포구래점', lat: 37.6441407006, lng: 126.6260787927 },
  { content: '뚜레쥬르한강신도시점', lat: 37.6453857587, lng: 126.6610105551 },
  { content: '샤론', lat: 37.7196501432, lng: 126.63306689 },
  { content: '브레드홀릭', lat: 37.6391474215, lng: 126.6723242884 },
  { content: '파리바게뜨 김포한강노블레스점', lat: 37.6455910301, lng: 126.6607248656 },
  { content: '이상용베이커리휴', lat: 37.6460085285, lng: 126.6803642283 },
  { content: '천안옛날호두과자통진점', lat: 37.6805263183, lng: 126.622374693 },
  { content: '우리동네식빵&바게트', lat: 37.6020990419, lng: 126.7715208605 },
  { content: '블랑제리115 고촌점', lat: 37.6062570281, lng: 126.7489689556 },
  { content: '우리동네식빵&베이글', lat: 37.6280670997, lng: 126.7019685483 },
  { content: '동동케이크 김포풍무점', lat: 37.6101500686, lng: 126.7251596926 },
  { content: '밀퐁 (milfon)', lat: 37.6443790614, lng: 126.6302812895 },
  { content: '파리바게뜨 김포걸포점', lat: 37.6349558771, lng: 126.7063716632 },
  { content: '유피케이크', lat: 37.649969397, lng: 126.6604375394 },
  { content: '우리동네식빵', lat: 37.622959019, lng: 126.6996661431 },
  { content: '베이커리 결', lat: 37.6551944405, lng: 126.68187307 },
  { content: '라베또디저트', lat: 37.6031756865, lng: 126.7721787641 },
  { content: '파리바게뜨걸포메트로자이점', lat: 37.6331442178, lng: 126.7010302519 },
  { content: '폴브라운', lat: 37.6500739919, lng: 126.6961558315 },
  { content: '좋은아침페스츄리', lat: 37.6432772983, lng: 126.6251141119 },
  { content: '프레첼제과점', lat: 37.691709949, lng: 126.5982654831 },
  { content: '샹제르망 베이커리 커피', lat: 37.6231613542, lng: 126.7123216461 },
  { content: '스토리오브라망김포풍무점', lat: 37.6074859716, lng: 126.7243716084 },
  { content: '뚜레쥬르 (카페양곡점)', lat: 37.6578059524, lng: 126.631133676 },
  { content: '파리바게뜨 김포예가점', lat: 37.6408635591, lng: 126.6805907781 },
  { content: '똣똣빵집', lat: 37.6122488078, lng: 126.7318453986 },
  { content: '뚜레쥬르(양곡점)', lat: 37.6563027258, lng: 126.6228753128 },
  { content: '빠냐데로', lat: 37.6513642317, lng: 126.6575991475 },
  { content: '파리바게뜨통진점', lat: 37.6927419334, lng: 126.5976745255 },
  { content: '파리바게뜨', lat: 37.5980395806, lng: 126.7201990095 },
  { content: '파리바게트 김포신감정점', lat: 37.6230722616, lng: 126.6990870057 },
  { content: '파리바게뜨', lat: 37.5980395806, lng: 126.7201990095 },
  { content: '쉘브론베이커리', lat: 37.6903558519, lng: 126.6003461223 },
  { content: 'hoho브레드', lat: 37.6452690129, lng: 126.6263036106 },
  { content: '던킨도너츠 김포장기점', lat: 37.6439706261, lng: 126.667362725 },
  { content: '던킨 도너츠 김포양촌점', lat: 37.6176068263, lng: 126.6201461202 },
  { content: '플리머스9-3', lat: 37.7234409458, lng: 126.6155822899 },
  { content: '파리바게뜨 김포향산점', lat: 37.6181892775, lng: 126.7473419045 },
  { content: '뚜레쥬르 고촌캐슬파밀리에점', lat: 37.593999541, lng: 126.7561831512 },
  { content: '쉐프부랑제', lat: 37.6490228176, lng: 126.695328315 },
  { content: '파리바게뜨김포호수마을점', lat: 37.6483249888, lng: 126.6300312339 }
];

const KakaoMap = forwardRef(({ bakeries = [] }, ref) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]);

  // 부모가 호출할 수 있는 메소드 노출
  useImperativeHandle(ref, () => ({
    moveTo(lat, lng, level = null) {
      if (!mapInstance.current || !window.kakao) return;
      const center = new window.kakao.maps.LatLng(lat, lng);
      mapInstance.current.setCenter(center);
      if (typeof level === "number") {
        mapInstance.current.setLevel(level);
      }
    },
    // 전체 마커 클리어(필요 시 사용 가능)
    clearMarkers() {
      markersRef.current.forEach((m) => m.setMap(null));
      markersRef.current = [];
    }
  }));

  // helper: pos.title 에서 문자열 추출 (JSX일 경우 children 사용)
  const extractTitleString = (title) => {
    if (!title && title !== "") return "";
    if (typeof title === "string") return title;
    // JSX element like 'Name' => try to read props.children
    if (typeof title === "object" && title.props) {
      let child = title.props.children;
      if (Array.isArray(child)) child = child.join("");
      if (typeof child === "string") {
        // trim surrounding single/double quotes
        return child.trim().replace(/^['"]+|['"]+$/g, "");
      }
      return String(child ?? "");
    }
    return String(title);
  };

  useEffect(() => {
    // 이미 로드되어 있는 kakao 객체가 있으면 새로 스크립트 추가하지 않음
    const alreadyLoaded = !!(window.kakao && window.kakao.maps);

    let script;
    if (!alreadyLoaded) {
      script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=62ac1fc7ba05748992f67450c7825c1a&autoload=false`;
      script.async = true;
      document.head.appendChild(script);
    }

    const onLoad = () => {
      if (!mapRef.current) return;

      window.kakao.maps.load(() => {
        // 기존 마커 제거 (re-render 안전하게)
        if (markersRef.current.length > 0) {
          markersRef.current.forEach((m) => m.setMap(null));
          markersRef.current = [];
        }

        // 지도 생성 (이미 생성되어 있으면 재사용)
        if (!mapInstance.current) {
          mapInstance.current = new window.kakao.maps.Map(mapRef.current, {
            keyboardShortcuts: true,
            center: new window.kakao.maps.LatLng(37.5665, 126.9780),
            level: 3
          });
          // 지도 컨트롤 추가
          const mapTypeControl = new window.kakao.maps.MapTypeControl();
          mapInstance.current.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);
          const zoomControl = new window.kakao.maps.ZoomControl();
          mapInstance.current.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
        }

        const map = mapInstance.current;

        // 마커 이미지
        const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
        const imageSize = new window.kakao.maps.Size(24, 35);
        const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

        // positions 기반 마커 생성
        positions.map((pos, index) => {
          // 좌표가 없으면 무시
          if (pos == null || pos.lat == null || pos.lng == null) return;

          const titleStr = extractTitleString(pos.con);
          const markerPosition = new window.kakao.maps.LatLng(pos.lat, pos.lng);
          const marker = new window.kakao.maps.Marker({
            map,
            position: markerPosition,
            content: titleStr,
            image: markerImage
          });

          // <마커 가게 이름 표시>
          const infowindow = new window.kakao.maps.InfoWindow({
            content: positions[index].content
          })

          window.kakao.maps.event.addListener(marker, "mouseover", () => {
            infowindow.open(map, marker);
          });

          window.kakao.maps.event.addListener(marker, "mouseout", () => {
            infowindow.close(map, marker);
          });
          // </ 마커 가게 이름 표시>

          // 마커 클릭 이벤트 (원하면 인포윈도우 연결 가능)
          window.kakao.maps.event.addListener(marker, "click", () => {
            // 예: 콘솔 출력 또는 인포윈도우 열기
            console.log("마커 클릭:", titleStr);
          });

          markersRef.current.push(marker)
        });

        // 현재 위치 가져오기 (Geolocation)
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              try {
                const here = new window.kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                map.setCenter(here);
                // 내 위치 마커 (기존 마커와 다른 이미지 원하면 변경)
                new window.kakao.maps.Marker({ position: here, map });
                console.log("내 위치로 이동:", pos.coords);
              } catch (e) {
                console.warn("내 위치 마커 생성 중 오류:", e);
              }
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

    if (alreadyLoaded) {
      onLoad();
    } else {
      // 스크립트 로드 완료 후 초기화
      script.addEventListener("load", onLoad);
    }

    // cleanup
    return () => {
      try {
        // 마커 제거
        markersRef.current.forEach((m) => m.setMap(null));
        markersRef.current = [];
        // 지도 인스턴스는 페이지가 완전히 언마운트 될 때까지 보존해도 괜찮음.
        // 다만 스크립트를 우리가 추가한 경우엔 제거
        if (script && script.parentNode) {
          script.removeEventListener("load", onLoad);
          document.head.removeChild(script);
        }
      } catch (e) {
        // 안전하게 무시
      }
    };
    // positions가 바뀌면 재실행되어 마커 갱신됨
  }, [positions]);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
});

export default KakaoMap;