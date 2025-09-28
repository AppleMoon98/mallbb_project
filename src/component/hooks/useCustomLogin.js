import { createSearchParams, Navigate, useLocation, useNavigate } from "react-router-dom"
import { loginPostAsync, logout } from "../../slice/LoginSlice"
import { useDispatch, useSelector } from "react-redux"
import { removeCookie } from "../../util/CookieUtil"

// 로그인 판별
const useCustomLogin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation();
    const loginState = useSelector(state => state.loginSlice)
    const isLogin = loginState.email ? true : false

    const doLogin = async (loginParam) => {
        return await dispatch(loginPostAsync(loginParam)).unwrap()
    }

    const doLogout = () => {
        dispatch(logout())
        removeCookie('member', { path: "/" })
        alert("로그아웃 되었습니다.")
        moveToPath('/')
    }

    const moveToPath = (path) => {
        navigate({ pathname: path }, { replace: true })
    }

    const moveToLogin = () => {
        navigate({ pathname: '/member/login' }, { replace: true })
    }

    const loginToPath = (path, replace, redirect) => {
        const params = new URLSearchParams(location.search);
        const haveReplace = decodeURIComponent(params.get("redirect"));
        const imReplace = haveReplace.split("?")[0]
        if (redirect && imReplace !== "null")
            navigate({ pathname: imReplace }, { replace: replace })
        else
            navigate({ pathname: path }, { replace: replace })
    }

    const moveToLoginReturn = () => {
        return <Navigate replace to="/member/login" />
    }

    const exceptionHandle = (ex) => {
        console.log("Exception--------------------")
        console.log(ex)

        const errorMsg = ex.response.data.errorMsg
        const errorStr = createSearchParams({ error: errorMsg }).toString()

        if (errorMsg === 'REQUIRE_LOGIN') {
            alert("로그인이 필요합니다.")
            navigate({ pathname: '/member/login', search: errorStr })
            return
        }

        if (ex.response.data.error === 'ERROR_ACCESSDENIED') {
            alert('권한이 부족하여 해당 메뉴를 사용할 수 없습니다.')
            navigate({ pathname: `/member/login`, search: errorStr })
            return
        }
    }

    return { loginState, isLogin, doLogin, doLogout, moveToPath, moveToLogin, loginToPath, moveToLoginReturn, exceptionHandle }
}

export default useCustomLogin