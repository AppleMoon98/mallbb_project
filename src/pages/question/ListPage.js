import MainNav from "../../common/MainNav";
import ListComponent from "../../component/question/ListComponent";
import Sidebar from "../../common/Sidebar";
const ListPage = () =>{
    return(
        <div style={{width:"100%",height:"100%",display:"flex", flexDirection:"column"}}>
            <MainNav/>
            <Sidebar/>
            <ListComponent/>
        </div>
    )
}

export default ListPage;