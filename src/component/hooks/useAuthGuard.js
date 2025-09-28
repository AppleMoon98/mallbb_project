import { useLocation, useNavigate } from "react-router-dom";
import { getCookie } from "../../util/CookieUtil";

export default function useAuthGuard() {
    const navigate = useNavigate()
    const location = useLocation()
    const member = getCookie("member");
    const isLogin = !!member;
    const isAdmin = member?.roleNames.includes("ADMIN");

    const ensureLogin = () => {
        if(!isLogin){
            const redirect = encodeURIComponent(location.pathname + location.search)
            alert("로그인이 필요합니다.")
            navigate(`/member/login?redirect=${redirect}`)
            return false;
        }
        return true;
    }

    return { isAdmin, isLogin, ensureLogin, member }
}