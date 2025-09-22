import {Suspense} from "react";
import ChatButton from "../common/Chatbutton";

const Loading = <div>Loading Chat...</div>;

export default function ChatPage(){
    return(
        <Suspense fallback={Loading}>
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <ChatButton />
            </div>
        </Suspense>
    );
}