import { Link } from "react-router-dom";
import "../css/main.css";
import "../css/mainnav.css";
import { useSelector } from "react-redux";
import useCustomLogin from "../component/hooks/useCustomLogin";

const MainNav = () => {
  const loginState = useSelector(state => state.loginSlice)
  const { doLogout, isLogin } = useCustomLogin()
  return (
    <nav>
      <div id="nav_bar">
        <div className="menu_btn">
          <ul>
            <li className="depth1">
              <Link to={"/"}>로고(이미지)</Link>
            </li>
            <li className="depth1">
              <Link to={"/webinfo"}>소개</Link>
            </li>
            <li className="depth1">
              <a href="/free">게시판</a>
              <ul className="submenu">
                <li><Link to={"/notice"}>공지사항</Link></li>
                <li><a href="/free">자유게시판</a></li>
                <li><a href="/review">리뷰게시판</a></li>
                <li><a href="/question">질문게시판</a></li>
              </ul>
            </li>
            <li className="depth1">
              <Link to={"/map"}>지도</Link>
            </li>
            <li className="depth1">
              <Link to={"/reservationlist"}>예약</Link>
              <ul className="submenu">
                <li><a href="#">예약하기</a></li>
                <li><a href="#">예약확인</a></li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="user">
          <ul className="submenu">
            {!isLogin ?
              <div className="flex text-white">
                <Link to="/register" className="px-4">회원가입</Link>
                <Link to="/member/login">로그인</Link>
              </div>
              :
              <div className="flex text-white">
                <Link to="/member/mypage" className="px-4">마이페이지</Link>
                <button onClick={doLogout}>로그아웃</button>
              </div>
            }
          </ul>
        </div>
      </div>
    </nav>
  )
};

export default MainNav