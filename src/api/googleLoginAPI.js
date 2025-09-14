import { jwtDecode } from "jwt-decode"
import { API_SERVER_HOST } from "./config"
import { GoogleLogin } from '@react-oauth/google'

const prefix = API_SERVER_HOST

const GoogleLoginAPI = () => {
    const handleSuccess = (credentialResponse) => {
        const idToken = credentialResponse.credential
        console.log("구글 ID 토큰 : ", idToken)

        // 디코딩된 사용자 정보 띄우기
        const decodedUserInfo = jwtDecode(idToken)
        console.log("디코딩된 유저 정보 : ", decodedUserInfo)

        // ID 토큰 백엔드로 전송
        sendTokenToServer(idToken)
    }

    const handleError = () => {
        console.log('로그인 실패')
    }

    const sendTokenToServer = (idToken) => {
        fetch(`${prefix}/member/auth/google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ credential: idToken }),
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                console.log('Server response:', data)
                window.location.replace('/')
            })
            .catch((err) => {
                console.error('error:', err)
            })
    }

    return (
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    )
}

export default GoogleLoginAPI