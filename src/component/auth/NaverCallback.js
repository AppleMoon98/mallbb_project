import { useEffect } from "react";

const NaverCallback = () => {
    useEffect(() => {
        // 네이버 SDK 동적 로드
        const script = document.createElement("script");
        script.src =
            "https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js";
        script.type = "text/javascript";
        script.charset = "utf-8";
        document.body.appendChild(script);

        script.onload = () => {
            const naver_id_login = new window.naver_id_login(
                "qf5lQwzfLlN5Ok34GpdI", // Client ID
                "http://localhost/member/auth/naver" // Redirect URI
            );

            // 토큰 확인
            console.log("access_token:", naver_id_login.oauthParams.access_token);

            // 전역에 callback 등록 (네이버 SDK에서 실행)
            window.naverSignInCallback = function () {
                const email = naver_id_login.getProfileData("email");
                const nickname = naver_id_login.getProfileData("nickname");

                console.log("네이버 로그인 성공!");
                console.log("email:", email);
                console.log("nickname:", nickname);

                // 여기서 서버에 로그인 요청 보내면 됨
            };

            // 프로필 요청
            naver_id_login.get_naver_userprofile("window.naverSignInCallback()");
        };
    }, []);

    return (
        <div>
            <h2>네이버 로그인 처리 중...</h2>
        </div>
    );
};

export default NaverCallback