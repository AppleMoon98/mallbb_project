import { Suspense, lazy } from "react";

const Loading = <div>Loading........</div>
const FreeList = lazy(() => import("../pages/free/ListPage"))

const freeRouter = () => {
    return [
        {
            path: "list",
            element: <Suspense fallback={Loading}><FreeList /></Suspense>
        }
    ]
}

export default freeRouter;