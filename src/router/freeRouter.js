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
            path: "",
            element: <Suspense fallback={Loading}><FreeList/></Suspense>
        },
        {
            path: "add",
            element: <Suspense fallback={Loading}><FreeRegister/></Suspense>
        },
        {
            path: "modify/:id",
            element: <Suspense fallback={Loading}><FreeModify/></Suspense>
        },
        {
            path: "read/:id",
            element: <Suspense fallback={Loading}><FreeRead/></Suspense>
        }
    ]
}

export default freeRouter;