import { useState ,useRef , useEffect } from "react";

export default function Chat(){
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const scrollRef = useRef(null);

    const handleSend = () =>{
        if(!input.trim()) return;
        setMessages((prev)=>[
            ...prev,
            {id:Date.now(), sender: "me", content: input},
            //id=> 고유 ID번호를 일시적으로 시간으로 대체함
        ]);
        setInput("");
    };

    useEffect(()=>{
        if(scrollRef.current){
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    },[messages]);

  return (
    <div className="w-[300px] h-[400px] border border-gray-300 flex flex-col fixed">
      {/* 메시지 입력*/}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-2 space-y-1"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${
              msg.sender === "me" ? "text-right" : "text-left"
            }`}
          >
            <span>{msg.content}</span>
          </div>
        ))}
      </div>

      {/* 입력창 영역 */}
      <div className="flex p-2 border-t border-gray-200 flex-none">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border border-gray-300 p-1 rounded"
          placeholder="메시지를 입력하세요"
        />
        <button
          onClick={handleSend}
          className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          전송
        </button>
      </div>
    </div>
  );
}