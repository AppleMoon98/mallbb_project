import { Link, useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import useCustomLogin from "../hooks/useCustomLogin";
import GoogleLoginApi from "../../api/googleLoginAPI"
import KakaoLoginAPI from "../../component/auth/KakaoLoginComponent";
import NaverLoginAPI from "../../component/auth/NaverLoginComponent"

const initState = {
  email: "",
  password: "",
};

const LoginComponent = () => {
  const [loginParam, setLoginParam] = useState({ ...initState });
  const [loading, setLoading] = useState(false);
  const { doLogin, loginToPath } = useCustomLogin();


  const handleChage = (e) => {
    const { name, value } = e.target;
    setLoginParam((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleClickLogin = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const data = await doLogin(loginParam);
      console.log("after unwrap.........", data);

      if (data?.error) {
        alert("이메일 혹은 패스워드가 일치하지 않습니다.");
      } else {
        alert("Login");
        loginToPath("/", true, true);
      }
    } finally {
      setLoading(false);
    }
  };

  const tabActive =
    "px-6 py-3 rounded-2xl border-2 border-neutral-800 bg-neutral-800 text-white font-semibold cursor-pointer transition";
  const tabInactive =
    "px-6 py-3 rounded-2xl border-2 border-neutral-800 bg-white text-neutral-800 font-semibold cursor-pointer transition hover:bg-neutral-100";

  return (
    <div className="flex h-screen min-h-[210px] flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold">로그인</h1>

      <div className="mb-5 flex gap-10">
        <div className={tabActive}>개인</div>
        <Link to="/login/seller" className={tabInactive}>
          사업자
        </Link>
      </div>

      <div className="flex w-72 flex-col gap-3 rounded-xl border-2 border-black p-5">
        <div>
          <label className="text-sm font-semibold">ID</label>
          <input type="text" name="email" value={loginParam.email} onChange={handleChage}
            className="mt-1 w-[95%] rounded-lg border border-gray-300 p-2" />
        </div>

        <div>
          <label className="text-sm font-semibold">PASSWORD</label>
          <input type="password" name="password" value={loginParam.password} onChange={handleChage}
            className="mt-1 w-[95%] rounded-lg border border-gray-300 p-2" />
        </div>

        <button onClick={handleClickLogin} disabled={loading}
          className="mt-2 rounded-lg bg-[#4a90e2] px-4 py-2 font-bold text-white hover:opacity-90 disabled:opacity-60">
          {loading ? "로그인 중..." : "로그인"}
        </button>
      </div>

      <div className="mt-5 flex h-36 w-72 flex-col gap-2 items-center">
        <GoogleLoginApi/>
        <KakaoLoginAPI/>
        <NaverLoginAPI/>
      </div>

      <div className="mt-3">
        <Link to="/" className="text-gray-600 no-underline hover:underline">
          돌아가기
        </Link>
      </div>
    </div>
  );
};

export default LoginComponent;
