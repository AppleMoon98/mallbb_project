import { lazy, Suspense } from "react"

const Loading = <div>Logding......</div>
const Login = lazy( () => import("../pages/member/LoginPage"))
const Logout = lazy( () => import("../pages/member/LogoutPage"))
const NaverLogin = lazy( () => import("../component/auth/NaverCallback"))


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
            path:"auth/naver",
            element: <Suspense fallback={Loading}><NaverLogin/></Suspense>
        }
    ]
}

export default memberRouter