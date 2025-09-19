import { useEffect } from "react";

const NaverLoginComponent = () => {
    useEffect(() => {
        // 네이버 SDK 스크립트 동적 추가
        const script = document.createElement("script");
        script.src = "https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js";
        script.type = "text/javascript";
        script.charset = "utf-8";
        document.body.appendChild(script);

        script.onload = () => {
            const naver_id_login = new window.naver_id_login(
                "qf5lQwzfLlN5Ok34GpdI", // 클라이언트 ID
                "http://localhost/member/auth/naver" // 리다이렉트 URI
            );
            const state = naver_id_login.getUniqState();
            naver_id_login.setButton("white", 2, 40);
            naver_id_login.setDomain("http://localhost");
            naver_id_login.setState(state);
            naver_id_login.setPopup();
            naver_id_login.init_naver_id_login();
        };
    }, []);

    return <div id="naver_id_login" />;
}

export default NaverLoginComponent


