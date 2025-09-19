import { useEffect } from "react";
import { API_SERVER_HOST, moveAxios } from "../../api/config"

const NaverCallback = () => {
    useEffect(() => {
        // 네이버 SDK 동적 로드
        const script = document.createElement("script");
        script.src =
            "https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js";
        script.type = "text/javascript";
        script.charset = "utf-8";
        document.body.appendChild(script);

        script.onload = async () => {
            const naver_id_login = new window.naver_id_login(
                "qf5lQwzfLlN5Ok34GpdI", // Client ID
                `${API_SERVER_HOST}/member/auth/naver` // Redirect URI
            );

            // 토큰 확인
            console.log("access_token:", naver_id_login.oauthParams.access_token);
            const token = naver_id_login?.oauthParams?.access_token;
            console.log(token)
            const result = await moveAxios.post(
                `${API_SERVER_HOST}/member/auth/naver`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                }
            );
            window.location.replace('/')
            
        };  
    }, []);

    return (
        <div>
            <h2>네이버 로그인 처리 중...</h2>
        </div>
    );
};

export default NaverCallback