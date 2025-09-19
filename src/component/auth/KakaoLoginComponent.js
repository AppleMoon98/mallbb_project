import KakaoLogin from "react-kakao-login"
import { kakaoLoginPost } from "../../api/memberApi"

const kakaoLoginComponent = () => {
    // 카카오 로그인 컴포넌트 프론트 구현
    const kakaoClientId = '62ac1fc7ba05748992f67450c7825c1a'    // js key
    const kakaoOnSuccess = async (data) => {
        console.log(data)
        const email = data.profile.kakao_account.email
        const nickname = data.profile.properties.nickname
        const postData = { email, nickname }
        await kakaoLoginPost(postData)
        window.location.replace('/')
    }

    const kakaoOnFailure = (err) => {
        console.log(err)
    }

    return (
        <div>
            <KakaoLogin token={kakaoClientId} onSuccess={kakaoOnSuccess} onFail={kakaoOnFailure} />
        </div>
    )
}

export default kakaoLoginComponent