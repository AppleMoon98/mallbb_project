import LoginBtnPng from "../img/project_Img/bar_Image/KakaoLoginBtn.png"
import { API_SERVER_HOST } from "./config"

const KakaoLoginAPI = () => {
    const client_id = "62ac1fc7ba05748992f67450c7825c1a"
    const redirect_uri = `http://localhost:3000/member/auth/kakao`
    const uri = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}`
    return (
        <div class="text-center">
            <a href={uri}>
                <img src={LoginBtnPng} />
            </a>
        </div>
    )
}

export default KakaoLoginAPI

