import { useCallback } from "react";
import { useNavigate, useParams,useSearchParams,createSearchParams } from "react-router-dom";
import ReadComponent from "../../component/review/ReadComponent";

const ReadPage = () => {
    
    const {id} = useParams()
    
    const navigate = useNavigate()

    const [queryParams] = useSearchParams()

    const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1
    const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10

    const queryStr = createSearchParams({page,size}).toString()

    return(
        <div className="font-extrabold w-full bg-white mt-6">
            <div className="text-4xl text-center"></div>
            <ReadComponent id={id}></ReadComponent>
        </div>
    )
}

export default ReadPage;