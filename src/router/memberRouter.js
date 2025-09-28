import { lazy, Suspense } from "react"

const Loading = <div>Logding......</div>
const Login = lazy( () => import("../pages/member/LoginPage"))
const NaverLogin = lazy( () => import("../component/auth/NaverCallback"))
const MyPage = lazy( () => import("../pages/member/MyPage"))


const memberRouter = () => {
    return[
        {
            path:"login",
            element: <Suspense fallback={Loading}><Login /></Suspense>
        },  
        {
            path:"auth/naver",
            element: <Suspense fallback={Loading}><NaverLogin/></Suspense>
        },
        {
            path:"mypage",
            element: <Suspense fallback={Loading}><MyPage /></Suspense>
        }
    ]
}

export default memberRouter