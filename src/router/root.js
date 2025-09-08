// routes/root.js
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import Register from "../pages/user/register";
import Login from "../pages/user/login";
import Loginseller from "../pages/user/loginseller";
import Registerseller from "../pages/user/registerseller";
import NoticeLayout from "../pages/notice/NoticeLayout";

const Loading = <div>Loading......</div>
const Main = lazy(()=>import("../pages/main"))
const NoticeList = lazy(()=>import("../pages/notice/ListPage"))
const NoticeAdd  = lazy(()=>import("../pages/notice/AddPage"))

const root = createBrowserRouter([
  { path: "/", element: <Suspense fallback={Loading}><Main/></Suspense> },
  { path: "/login", element: <Login/> },
  { path: "/login/seller", element: <Loginseller/> },
  { path: "/register", element: <Register/> },
  { path: "/register/seller", element: <Registerseller/> },

  {
    path: "/notice",
    element: <Suspense fallback={Loading}><NoticeLayout/></Suspense>,
    children: [
      { index: true, element: <Suspense fallback={Loading}><NoticeList/></Suspense> }, // /notice
      { path: "add", element: <Suspense fallback={Loading}><NoticeAdd/></Suspense> },  // /notice/add
      // 선택: /notice/list -> /notice 로 리다이렉트
      { path: "list", element: <Navigate to=".." replace /> },
    ],
  },
])

export default root;