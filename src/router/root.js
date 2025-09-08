// routes/root.js
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import Register from "../pages/user/register";
import Login from "../pages/user/login";
import Loginseller from "../pages/user/loginseller";
import Registerseller from "../pages/user/registerseller";
import noticeRouter from "./noticeRouter";

const Loading = <div>Loading......</div>
const Main = lazy(() => import("../pages/main"))
const NoticeIndex = lazy(() => import("../pages/notice/IndexPage"))

const root = createBrowserRouter([
  {
    path: "/",
    element: <Suspense fallback={Loading}><Main /></Suspense>
  },
  { 
    path: "/login", 
    element: <Login /> 
  },
  { 
    path: "/login/seller", 
    element: <Loginseller /> 
  },
  { 
    path: "/register", 
    element: <Register /> 
  },
  { 
    path: "/register/seller", 
    element: <Registerseller /> 
  },
  {
    path: "/notice",
    element: <Suspense fallback={Loading}><NoticeIndex /></Suspense>,
    children: noticeRouter()
  },
])

export default root;