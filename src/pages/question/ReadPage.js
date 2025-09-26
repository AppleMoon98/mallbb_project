import { useCallback } from "react";
import { useNavigate, useParams,useSearchParams,createSearchParams } from "react-router-dom";
import ReadComponent from "../../component/question/ReadComponent";

const ReadPage = () => {
    const {id} = useParams()
    return(
        <div className="font-extrabold w-full bg-white mt-6">
            <ReadComponent id={id}></ReadComponent>
        </div>
    )
}

export default ReadPage;