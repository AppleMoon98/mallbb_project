import { useCallback } from "react";
import { useNavigate, useParams,useSearchParams,createSearchParams } from "react-router-dom";
import ReadComponent from "../../component/notice/ReadComponent";

const ReadPage = () => {
    
    const {id} = useParams()
    
    const navigate = useNavigate()

    const [queryParams] = useSearchParams()

    const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1
    const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10
    toString()

    return(
        <div className="font-extrabold w-full bg-divide-yellow-600 mt-6">
            <div className="text-4xl text-center">
            {/* 상세보기 {} <= 바로 제목으로 가져올것 */}
            </div>
            <ReadComponent id={id}></ReadComponent>
        </div>
    )
}

export default ReadPage;