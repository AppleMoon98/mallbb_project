const Sidebar = () => {

return (
    <aside style={{width:"220px",background:"#d3bebe",borderRight:"1px solid #c9b3b3",borderRadius:"8px",padding:"12px 0",overflow:"hidden",position:"fixed",marginTop:"60px"}}>
      <div style={{fontSize:"18px",fontWeight:700,padding:"14px 18px",background:"#e5d6d6",borderTop:"1px solid #c9b3b3",borderBottom:"1px solid #c9b3b3"}}>게시판</div>
      <ul style={{listStyle:"none",margin:0,padding:0}}>
        <li style={{padding:"12px 18px",borderBottom:"1px solid #c9b3b3",background:"#eef0f2",color:"#111",cursor:"pointer"}}>공지</li>
        <li style={{padding:"12px 18px",borderBottom:"1px solid #c9b3b3",background:"#ffffff",color:"#333",cursor:"pointer"}}>자유게시판</li>
        <li style={{padding:"12px 18px",borderBottom:"1px solid #c9b3b3",background:"#ffffff",color:"#333",cursor:"pointer"}}>질문게시판</li>
        <li style={{padding:"12px 18px",borderBottom:"1px solid #c9b3b3",background:"#ffffff",color:"#333",cursor:"pointer"}}>리뷰게시판</li>
      </ul>
    </aside>
  );

}

export default Sidebar;