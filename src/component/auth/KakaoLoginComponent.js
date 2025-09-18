import KakaoLogin from "react-kakao-login"

const kakaoLoginComponent = () => {
    // 카카오 로그인 컴포넌트 프론트 구현
    const kakaoClientId = '62ac1fc7ba05748992f67450c7825c1a'    // js key
    const kakaoOnSuccess = async(data) => {
        console.log(data)
        const idToken = data.response.access_token
    }

    const kakaoOnFailure = (err) => {
        console.log(err)
    }

    return (
        <div className="text-center">
            <KakaoLogin token={kakaoClientId} onSuccess={kakaoOnSuccess} onFail={kakaoOnFailure}/>
        </div>
    )
}

export default kakaoLoginComponent