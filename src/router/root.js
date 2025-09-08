// routes/root.js
import { createBrowserRouter, Navigate } from "react-router-dom"
import { Suspense, lazy } from "react"
import Register from "../pages/member/register"
import Loginseller from "../pages/member/loginseller"
import Registerseller from "../pages/member/registerseller"
import noticeRouter from "./noticeRouter"
import memberRouter from "./memberRouter"

const Loading = <div>Loading......</div>
const Main = lazy(() => import("../pages/main"))
const NoticeIndex = lazy(() => import("../pages/notice/IndexPage"))

const root = createBrowserRouter([
  {
    path: "/",
    element: <Suspense fallback={Loading}><Main /></Suspense>
  },
  {
    path: "login/seller",
    element: <Loginseller />
  },
  {
    path: "register",
    element: <Register />
  },
  {
    path: "register/seller",
    element: <Registerseller />
  },
  {
    path: "notice",
    element: <Suspense fallback={Loading}><NoticeIndex /></Suspense>,
    children: noticeRouter()
  },
  {
    path: "member",
    children: memberRouter()
  }
])

export default root;