import useCustomLogin from "../component/hooks/useCustomLogin"
import { API_SERVER_HOST } from "./config"
import { GoogleLogin } from '@react-oauth/google'

const prefix = API_SERVER_HOST

const GoogleLoginAPI = () => {
    const { loginToPath } = useCustomLogin()
    const handleSuccess = (credentialResponse) => {
        const idToken = credentialResponse.credential

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
                loginToPath("/", true, true)
                window.location.reload()
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