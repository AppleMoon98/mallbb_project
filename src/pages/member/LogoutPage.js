import BasicMenu from "../../common/MainNav";
import LogoutComponent from "../../component/member/LogoutComponent"

const logoutPage = () => {
    return(
        <div className="fixed top-0 left-0 z-[1055] flex-col h-full w-full">
            <BasicMenu/>
            <div className="w-full flex flex-wrap h-full justify-center items-center border-2">
                <LogoutComponent/>
            </div>
        </div>
    )
}

export default logoutPage