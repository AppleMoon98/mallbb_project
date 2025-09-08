import { Suspense,lazy } from " react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading........</div>
const QuestionList = lasy(()=>import("../..pages/question/ListPage"))


const questionRouter = () =>{
return[
    {
        path:"list",
        element:<Suspense fallback={Loading}><QuestionList/></Suspense>
    }
]
}

export default questionRouter;