// routes/root.js
import { createBrowserRouter, Navigate } from "react-router-dom"
import Register from "../pages/member/Register"
import Loginseller from "../pages/member/Loginseller"
import Registerseller from "../pages/member/Registerseller"
import noticeRouter from "./noticeRouter"
import memberRouter from "./memberRouter"
import { lazy, Suspense } from "react"
import reviewRouter from "./reviewRouter"
import questionRouter from "./questionRouter"
import freeRouter from "./freeRouter"

const Loading = <div>Loading......</div>
const Main = lazy(() => import("../pages/main"))
const NoticeIndex = lazy(() => import("../pages/notice/IndexPage"))
const ReviewIndex = lazy( () => import("../pages/review/IndexPage"))
const FreeIndex = lazy( () => import("../pages/free/IndexPage"))

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
  },
  {
    path: "review",
    element: <Suspense fallback={Loading}><ReviewIndex/></Suspense>,
    children: reviewRouter()
  },
  {
    path: "question",
    element: <Suspense fallback={Loading}></Suspense>,
    children: questionRouter()
  },
  {
    path: "free",
    element: <Suspense fallback={Loading}><FreeIndex/></Suspense>,
    children: freeRouter()
  }
])

export default root;