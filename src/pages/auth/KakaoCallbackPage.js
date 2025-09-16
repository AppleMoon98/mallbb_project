import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { publicAxios } from "../../util/http"

export default function KakaoCallbackPage() {
  const { search } = useLocation()
  const navigate = useNavigate()
  const [message, setMessage] = useState("카카오 로그인 처리 중...")

  useEffect(() => {
    const params = new URLSearchParams(search)
    const code = params.get("code")
    const state = params.get("state") // 사용한다면 검증

    if (!code) {
      setMessage("인가코드가 없습니다. 다시 시도해 주세요.")
      return
    }

    ;(async () => {
      try {
        // 백엔드에 인가코드 전달 → 백엔드가 카카오 토큰 교환 + 우리 토큰 발급 + 쿠키(HTTPOnly)로 세팅
        await publicAxios.post("http://localhost:8080/member/auth/kakao/exchange", { code }, {
          withCredentials: true, // ★ 쿠키 수신용
          headers: { "Content-Type": "application/json" }
        })

        // 성공하면 홈(또는 원하는 페이지)로 이동
        navigate("/", { replace: true })
      } catch (err) {
        console.error(err)
        setMessage("로그인 처리 중 오류가 발생했습니다.")
      }
    })()
  }, [search, navigate])

  return <div style={{ padding: 24 }}>{message}</div>
}
