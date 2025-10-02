import { Link } from "react-router-dom";

const loginSeller = () => {
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

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", flexDirection: "column" ,minHeight:"210px"}}>
      <h1 className="text-4xl font-extrabold">사업자 로그인</h1>

      <div style={{ display: "flex", gap: "40px", marginBottom: "20px" }}>
        <Link to={"/member/login"} style={tabInactive}>개인</Link>
        <div style={tabActive}>사업자</div>
      </div>

      <form>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", border: "2px solid #000", padding: "20px", borderRadius: "14px", width: "300px" }}>
          <div>
            <label style={{ fontWeight: "600", fontSize: "14px" }}>ID</label>
            <input type="text" style={{ width: "95%", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }} />
          </div>
          <div>
            <label style={{ fontWeight: "600", fontSize: "14px" }}>PASSWORD</label>
            <input type="password" style={{ width: "95%", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }} />
          </div>
          <button type="submit" style={{ marginTop: "10px", padding: "10px", background: "#333", color: "white", border: "none", borderRadius: "8px", fontWeight: "700", cursor: "pointer" }}>
             로그인
          </button>
        </div>
      </form>

      <div style={{ marginTop: "12px" }}>
        <Link to="/" style={{ color: "#555", textDecoration: "none" }}>돌아가기</Link>
      </div>
    <div style={{ marginTop: "20px", visibility: "hidden", flexDirection: "column", gap: "10px", width: "300px",height:"150px" }}>
        <div style={{ padding: "10px", textAlign: "center", background: "#db4437", color: "white", borderRadius: "8px", cursor: "pointer" }}>구글로 로그인 하기</div>
        <div style={{ padding: "10px", textAlign: "center", background: "#2db400", color: "white", borderRadius: "8px", cursor: "pointer" }}>네이버로 로그인 하기</div>
        <div style={{ padding: "10px", textAlign: "center", background: "#f7e600", color: "#3c1e1e", borderRadius: "8px", cursor: "pointer" }}>카카오로 로그인 하기</div>
    </div>

    </div>
  );
};

export default loginSeller;
