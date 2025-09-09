import { Suspense,lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading........</div>
const NoticeList = lazy(()=>import("../pages/notice/ListPage"))
const NoticeRegister = lazy(()=>import("../pages/notice/AddPage"))
const NoticeModify = lazy(()=>import("../pages/notice/ModifyPage"))
const NoticeRead = lazy(()=>import("../pages/notice/ReadPage"))
const noticeRouter = () =>{
return[
    {
        path:"",
        element:<Suspense fallback={Loading}><NoticeList/></Suspense>
    },
    {
        path:"add",
        element:<Suspense fallback={Loading}><NoticeRegister/></Suspense>
    },
    {
        path: "modify/:id",
        element: <Suspense fallback={Loading}><NoticeModify/></Suspense>
    },
    {
        path: "read/:id",
        element: <Suspense fallback={Loading}><NoticeRead/></Suspense>
    }

]
}

export default noticeRouter;