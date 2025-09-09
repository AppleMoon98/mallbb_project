import { Suspense,lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading........</div>
const QuestionList = lazy(()=>import("../pages/question/ListPage"))
const QuestionRegister = lazy(()=>import("../pages/question/AddPage"))
const QuestionModify = lazy(()=>import("../pages/question/ModifyPage"))
const QuestionRead = lazy(()=>import("../pages/question/ReadPage"))

const questionRouter = () =>{
return[
    {
        path:"list",
        element:<Suspense fallback={Loading}><QuestionList/></Suspense>
    },
    {
        path:"",
        element:<Navigate replace to="/question/list"></Navigate>
    },
    {
        path:"add",
        element:<Suspense fallback={Loading}><QuestionRegister/></Suspense>
    },
    {
        path:"modify",
        element:<Suspense fallback={Loading}><QuestionModify></QuestionModify></Suspense>
    },
    {
        path:"read",
        element:<Suspense fallback={Loading}><QuestionRead></QuestionRead></Suspense>
    }
]
}

export default questionRouter;