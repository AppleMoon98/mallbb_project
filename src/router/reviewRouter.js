import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading..............</div>
const ReviewList = lazy( () => import("../pages/review/ListPage"))
const ReviewRegister = lazy( () => import("../pages/review/AddPage"))
const ReviewRead = lazy( () => import("../pages/review/ReadPage"))
const ReviewModify = lazy( () => import("../pages/review/ModifyPage"))


const reviewRouter = () => {

    return [
        {
            path:"",
            element:<Suspense fallback={Loading}><ReviewList/></Suspense>
        },
        {
            path:"add",
            element:<Suspense fallback={Loading}><ReviewRegister/></Suspense>
        },
        {
            path:"modify/:id",
            element:<Suspense fallback={Loading}><ReviewModify/></Suspense>
        },
        {
            path:"read/:id",
            element:<Suspense fallback={Loading}><ReviewRead/></Suspense>
        }
    ]
}

export default reviewRouter;