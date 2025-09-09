import { Link } from "react-router-dom";
import "../css/main.css";
import "../css/mainnav.css";
import Register from "../pages/member/Register";
import Login from "../pages/member/LoginPage";
import Main from "../pages/main";

const MainNav = () => {
  return (
    <nav>
      <div id="nav_bar">
        <div className="menu_btn">
          <ul>
            <li class="depth1">
              <Link to={"/"}>로고(이미지)</Link>
            </li>
            <li class="depth1">
              <a href="#">소개</a>
            </li>
            <li class="depth1">
              <a href="#">게시판</a>
              <ul className="submenu">
                <li><Link to={"/notice"}>공지사항</Link></li>
                <li><Link to={"/free"}>자유게시판</Link></li>
                <li><Link to={"/review"}>리뷰게시판</Link></li>
                <li><Link to={"/question"}>Q&A</Link></li>
              </ul>
            </li>
            <li class="depth1">
              <a href="#">지도</a>
            </li>
            <li class="depth1">
              <a href="#">예약</a>
              <ul className="submenu">
                <li><a href="#">예약하기</a></li>
                <li><a href="#">예약확인</a></li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="user">
          <ul className="submenu">
            <li><Link to="/register">회원가입</Link></li>
            <li><Link to="/login">로그인</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MainNav
