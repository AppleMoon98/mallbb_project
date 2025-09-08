import { Link } from "react-router-dom";

const Register = () =>{
    
   const tabBase = {
    padding: "12px 24px",
    border: "2px solid #333",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: 600,
    transition: "all 0.2s ease",
   };

  const tabActive = {
    ...tabBase,
    background: "#333",
    color: "#fff",
   };

  const tabInactive = {
    ...tabBase,
    background: "#fff",
    color: "#333",
   };

    
    return(
        
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90vh",flexDirection:"column"}}>
         
          <h1 style={{ marginBottom: "20px" }}>회원가입</h1>

      
      <div style={{ display: "flex", gap: "40px", marginBottom: "20px" }}>
        <div style={tabActive}>개인</div>
        <Link to={"/register/seller"} style={tabInactive}>사업자</Link>
      </div>   
            <form>
                <div style={{display:"flex", border:"3px solid black", padding : "20px", borderRadius : "20px",flexDirection:"column"}}>
                
                <div>
                    <label style={{ fontWeight: "600", fontSize: "14px", display: "flex"}}>전화번호</label>
                    <div style={{display:"flex",gap:"25px"}}> 
                    <input type="text" style={{ width: "60%", padding: "8px", borderRadius: "8px", border: "1px solid #ccc"}} />
                    <input type="submit" value={"인증"} style={{width: "20%", padding: "3px" ,borderRadius: "8px",background: "#4a90e2",color: "white",border: "none"}}/>
                    </div>
                </div>
                
                <div>
                    <label style={{ fontWeight: "600", fontSize: "14px" }}>E-mail</label>
                    <input type="email" style={{ width: "90%", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }} />
                </div>

                <div>
                    <label style={{ fontWeight: "600", fontSize: "14px" }}>닉네임</label>
                    <input type="text" style={{ width: "90%", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }} />
                </div>
                
                <div>
                    <label style={{ fontWeight: "600", fontSize: "14px" }}>ID</label>
                    <input type="text" style={{ width: "90%", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }} />
                </div>
                
                <div>
                    <label style={{ fontWeight: "600", fontSize: "14px" }}>PASSWORD</label>
                    <input type="text" style={{ width: "90%", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }} />
                </div>
                
                
                <div>
                    <label style={{ fontWeight: "600", fontSize: "14px" }}>전화번호</label>
                    <input type="text" style={{ width: "90%", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }} />
                </div>

                <button type="submit" style={{ marginTop: "10px", padding: "10px", background: "#4a90e2", color: "white", border: "none", borderRadius: "8px", fontWeight: "700", cursor: "pointer" }}>
                    회원가입
                </button>
                
            </div>
            </form>

            <div style={{ marginTop: "12px" }}>
                <Link to="/" style={{ color: "#555", textDecoration: "none" }}>돌아가기</Link>
            </div>
        </div>
        
    )
}

export default Register;