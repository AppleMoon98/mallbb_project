import KakaoLogin from "react-kakao-login"
import { kakaoLoginPost } from "../../api/memberApi"
import useCustomLogin from "../hooks/useCustomLogin"

const KakaoLoginComponent = () => {
    const { loginToPath } = useCustomLogin()
    // 카카오 로그인 컴포넌트 프론트 구현
    const kakaoClientId = '62ac1fc7ba05748992f67450c7825c1a'    // js key
    const kakaoOnSuccess = async (data) => {
        console.log(data)
        const email = data.profile.kakao_account.email
        const nickname = data.profile.properties.nickname
        const postData = { email, nickname }
        await kakaoLoginPost(postData)
        loginToPath("/", true, true)
        window.location.reload()
    }

    const kakaoOnFailure = (err) => {
        console.log(err)
    }

    return (
        <KakaoLogin token={kakaoClientId} onSuccess={kakaoOnSuccess} onFail={kakaoOnFailure} />
    )
}

export default KakaoLoginComponent