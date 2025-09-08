import { useSearchParams } from "react-router-dom";
import MainNav from "../../common/mainNav";
import ListComponent from "../../component/notice/ListComponent";
import Sidebar from "../../common/Sidebar";
const ListPage = () =>{
    const[queryParams] = useSearchParams()

    const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1
    const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10
    
    return(
        
        <div style={{width:"100%",height:"100%",display:"flex", flexDirection:"column"}}>
            <Sidebar/>
            <ListComponent/>
        </div>
    )
}

export default ListPage;