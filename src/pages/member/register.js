import { Link } from "react-router-dom";
import RegistComponent from "../../component/member/RegistComponent";

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
        
        <RegistComponent/>
        
    )
}

export default Register;