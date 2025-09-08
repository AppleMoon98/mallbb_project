import { useSearchParems } from "react-router-dom"

const ListPage = () => {
    return (
        <div style={{width:"100%",height:"100%",display:"flex", flexDirection:"column"}}>
            <MainNav/>
            <Sidebar/>
        </div>
    )
}


export default ListPage;