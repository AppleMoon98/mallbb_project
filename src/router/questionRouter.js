import { Suspense,lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading........</div>
const QuestionList = lazy(()=>import("../pages/question/ListPage"))
const QuestionRegister = lazy(()=>import("../pages/question/AddPage"))
const QuestionModify = lazy(()=>import("../pages/question/ModifyPage"))
const QuestionRead = lazy(()=>import("../pages/question/ReadPage"))


const questionRouter = () => {
    
    return [
        {
            path:"",
            element:<Suspense fallback={Loading}><QuestionList/></Suspense>
        },
        {
            path:"add",
            element:<Suspense fallback={Loading}><QuestionRegister/></Suspense>
        },
        {
            path:"modify/:id",
            element:<Suspense fallback={Loading}><QuestionModify/></Suspense>
        },
        {
            path:"read/:id",
            element:<Suspense fallback={Loading}><QuestionRead/></Suspense>
        }
    ]
}

export default questionRouter;