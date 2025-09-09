import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading........</div>
const FreeList = lazy(() => import("../pages/free/ListPage"))
const FreeRegister = lazy( () => import("../pages/free/AddPage"))
const FreeModify = lazy( () => import("../pages/free/ModifyPage"))
const FreeRead = lazy( () => import("../pages/free/ReadPage"))

const freeRouter = () => {
    return [
        {
            path: "list",
            element: <Suspense fallback={Loading}><FreeList/></Suspense>
        },
        {
            path:"",
            element: <Navigate replace to="/free/list"></Navigate>
        },
        {
            path: "add",
            element: <Suspense fallback={Loading}><FreeRegister/></Suspense>
        },
        {
            path: "modify",
            element: <Suspense fallback={Loading}><FreeModify/></Suspense>
        },
        {
            path: "read",
            element: <Suspense fallback={Loading}><FreeRead/></Suspense>
        }
    ]
}

export default freeRouter;