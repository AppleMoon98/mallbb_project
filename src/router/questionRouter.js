import { Suspense,lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading........</div>
const QuestionList = lazy(()=>import("../pages/question/ListPage"))
const QuestionRegister = lazy(()=>import("../pages/question/AddPage"))

const questionRouter = () =>{
return[
    {
        path:"list",
        element:<Suspense fallback={Loading}><QuestionList/></Suspense>
    },
    {
        path:"add",
        element:<Suspense fallback={Loading}><QuestionRegister/></Suspense>
    }
]
}

export default questionRouter;