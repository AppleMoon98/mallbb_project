import { Suspense, lazy } from "react";

const Loading = <div>Loading........</div>
const NoticeList = lazy(() => import("../pages/notice/ListPage"))
const NoticeRegister = lazy(() => import("../pages/notice/AddPage"))

const noticeRouter = () => {
    return [
        {
            path: "list",
            element: <Suspense fallback={Loading}><NoticeList /></Suspense>
        },
        {
            path: "add",
            element: <Suspense fallback={Loading}><NoticeRegister /></Suspense>
        }
    ]
}

export default noticeRouter;