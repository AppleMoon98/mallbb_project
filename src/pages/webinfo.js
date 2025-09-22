import ChatButton from "../common/Chatbutton";
import MainNav from "../common/MainNav";

const WebInfoPage=()=>{
    
    return(
        <div>
            <MainNav/>
            <div className ="flex justify-center flex-col">
                <ChatButton/>
            </div>
        </div>
    );    
};

export default WebInfoPage;