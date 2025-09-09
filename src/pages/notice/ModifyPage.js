import { useNavigate, useParams } from "react-router-dom";
import ModifyComponent from "../../component/notice/ModifyComponent";
const ModifyPage = () =>{
    
    const {id} = useParams()
 
    return(
        <div className="p-4 w-full bg-white">
        <div className="text-3xl font-extrabold">
            글 작성(수정)
            
        </div>
        <ModifyComponent id={id}></ModifyComponent>
        </div>
    )
    

}

export default ModifyPage;