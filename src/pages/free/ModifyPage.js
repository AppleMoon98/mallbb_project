import { useParams } from "react-router-dom";
import ModifyComponent from "../../component/free/ModifyComponent";
const ModifyPage = () => {
    const { id } = useParams()
    
    return (
        <div className="p-4 w-full bg-white">
            <ModifyComponent id={id}></ModifyComponent>
        </div>
    )


}

export default ModifyPage;