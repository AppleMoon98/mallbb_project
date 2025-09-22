import React from "react";
import Chat from "./Chat";
import { createRoot } from "react-dom/client";

export default function ChatButton(){
    const openChatPopup = () =>{
        const popup = window.open(
            //
            "",
            "chatPopup",
            "width=350,height=450,resizable,scrollbars"
            //
            );
            
            if (!popup) return;

            popup.document.title = "실시간 상담";
            //tailwind 적용(CDN)
            const tw = popup.document.createElement("script");
            tw.src = "http://cdn.tailwindcss.com";
            tw.async = true;
            popup.document.head.appendChild(tw);
            
            popup.document.body.className = document.body.className || "";
            
            const container = popup.document.createElement("div");
            popup.document.body.appendChild(container);

            tw.onload = () =>{
                const root = createRoot(container);
                root.render(<Chat/>);
            };
            //실패시에도 시본 
            tw.onerror = () =>{
                const root = createRoot(container);
                root.render(<Chat/>);
            }
            //tailwind 적용
            
            
    const root = createRoot(container);
    
    root.render(<Chat />);
    
    };
    return(
        <button
            onClick={openChatPopup}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
        채팅창 열기
        </button>
    );
}

