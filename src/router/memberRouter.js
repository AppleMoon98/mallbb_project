import { lazy, Suspense } from "react"

const Loading = <div>Logding......</div>
const Login = lazy( () => import("../pages/member/LoginPage"))
const Logout = lazy( () => import("../pages/member/LogoutPage"))
const KakaoCallbackPage = lazy(() => import("../pages/auth/KakaoCallbackPage"))

const memberRouter = () => {
    return[
        {
            path:"login",
            element: <Suspense fallback={Loading}><Login /></Suspense>
        },
        {
            path:"logout",
            element: <Suspense fallback={Loading}><Logout /></Suspense>
        },
        {
            path:"auth/kakao",
            element: <Suspense fallback={Loading}><KakaoCallbackPage /></Suspense>
        }
    ]
}

export default memberRouter