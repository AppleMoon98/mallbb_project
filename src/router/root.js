// routes/root.js
import { createBrowserRouter } from "react-router-dom"
import Register from "../pages/member/Register"
import Loginseller from "../pages/member/LoginSeller"
import Registerseller from "../pages/member/RegisterSeller"
import noticeRouter from "./noticeRouter"
import memberRouter from "./memberRouter"
import { lazy, Suspense } from "react"
import reviewRouter from "./reviewRouter"
import questionRouter from "./questionRouter"
import freeRouter from "./freeRouter"
import ChatPage from "../pages/ChatPage"
import ReservationListPage from "../pages/reservationList"


const Loading = <div>Loading......</div>
const Main = lazy(() => import("../pages/main"))
const NoticeIndex = lazy(() => import("../pages/notice/IndexPage"))
const ReviewIndex = lazy( () => import("../pages/review/IndexPage"))
const FreeIndex = lazy( () => import("../pages/free/IndexPage"))
const QuestionIndex = lazy( () => import("../pages/question/IndexPage"))
const Reservation = lazy(()=>import("../pages/reservation"))
const Map = lazy(()=>import("../pages/map"))
const WebInfo = lazy(()=>import("../pages/webinfo"))
const ReservationConfirm = lazy(()=> import("../pages/reservationConfirm"))

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
    element: <Suspense fallback={Loading}><QuestionIndex/></Suspense>,
    children: questionRouter()
  },
  {
    path: "free",
    element: <Suspense fallback={Loading}><FreeIndex/></Suspense>,
    children: freeRouter()
  },
  {
    path: "reservation",
    element:<Suspense fallback={Loading}><Reservation/></Suspense>    
  },
  {
    path: "map",
    element:<Suspense fallback={Loading}><Map/></Suspense>
  },
  {
    path: "webinfo",
    element:<Suspense fallback={Loading}><WebInfo/></Suspense>
  },
  {
    path:"chat",
    element:<ChatPage/>
  },
  {
    path: "reservationconfirm",
    element:<Suspense fallback={Loading}><ReservationConfirm/></Suspense>    
  },
  {
    path: "reservationlist",
    element: <Suspense fallback={Loading}><ReservationListPage/></Suspense>
  }
])


export default root;