import { useState } from "react";
import { Link } from "react-router-dom";
import useCustomMove from "../hooks/useCustomMove";
import { register } from "../../api/memberApi";

const initState = {
  email: "",
  nickname: "",
  password: "",
  telNum: "",
};

const RegistComponent = () => {
  const [userData, setUserData] = useState(initState);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [authCodeInput, setAuthCodeInput] = useState("");
  const { moveToPath } = useCustomMove();

  const handleChangeData = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClickAuth = () => {
    if (!userData.telNum.trim()) {
      alert("전화번호를 입력해주세요.");
      return;
    }
    setIsVerifying(true);
  };

  const handleClickVerify = () => {
    if (!authCodeInput.trim()) {
      alert("인증번호를 입력해주세요.");
      return;
    }
    setIsVerified(true);
    setIsVerifying(false);
    alert("회원가입 인증이 완료되었습니다.");
  };

  const handleClickAdd = async () => {
    if (!userData.email.trim() 
        || !userData.nickname.trim() 
        || !userData.password.trim() 
        || !userData.telNum.trim()) {
      alert("빈 칸을 모두 채워주세요.");
      return;
    }
    if (!isVerified) {
      alert("인증을 완료해야 회원가입이 가능합니다.");
      return;
    }

    const payload = {
      email: userData.email,
      nickname: userData.nickname,
      password: userData.password,
      telNum: userData.telNum,
    };

    try {
      const res = await register(payload);
      console.log("등록 성공 : " + res);
      alert("회원가입이 완료되었습니다.");
      setUserData(initState);
      setIsVerified(false);
      setAuthCodeInput("");
      moveToPath('/');
    } catch (err) {
      console.error("등록 실패 : " + err);
      alert("등록 중 오류가 발생하였습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[90vh]">
      <h1 className="mb-5 text-2xl font-bold">회원가입</h1>

      <div className="flex gap-10 mb-5">
        <div className="cursor-pointer rounded-2xl border-2 border-neutral-800 bg-neutral-800 px-6 py-3 font-semibold text-white transition-all">
          개인
        </div>
        <Link to="/register/seller" className="cursor-pointer rounded-2xl border-2 border-neutral-800 bg-white px-6 py-3 font-semibold text-neutral-800 transition-all hover:bg-neutral-100">
          사업자
        </Link>
      </div>

      <form>
        <div className="flex flex-col gap-3 border-[3px] border-black p-5 rounded-2xl">
          {makeDiv("E-mail","email","email",userData.email, handleChangeData)}
          {makeDiv("닉네임","text","nickname",userData.nickname, handleChangeData)}
          {makeDiv("PASSWORD","password","password",userData.password, handleChangeData)}

          <div>
            <label className="flex text-sm font-semibold">전화번호</label>
            <div className="flex items-center gap-6">
              {!isVerifying ? (
                <>
                  <input type="text" id="telNum" name="telNum" onChange={handleChangeData}
                    className="w-[70%] rounded-lg border border-gray-300 p-2 outline-none focus:border-blue-500" />
                  <button type="button" onClick={handleClickAuth}
                    className="w-[20%] rounded-lg bg-blue-500 px-2.5 py-2 text-white transition-colors hover:bg-blue-600">
                    인증
                  </button>
                </>
              ) : (
                <>
                  <input type="text" id="authCode" name="authCode" value={authCodeInput} onChange={(e)=>setAuthCodeInput(e.target.value)}
                    className="w-[70%] rounded-lg border border-gray-300 p-2 outline-none focus:border-blue-500" />
                  <button type="button" onClick={handleClickVerify}
                    className="w-[20%] rounded-lg bg-green-500 px-2.5 py-2 text-white transition-colors hover:bg-green-600">
                    확인
                  </button>
                </>
              )}
            </div>
          </div>

          <button type="button" onClick={handleClickAdd}
            className="mt-2 rounded-lg bg-blue-500 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-600">
            회원가입
          </button>
        </div>
      </form>

      <div className="mt-3">
        <Link to="/" className="text-gray-600 hover:underline">
          돌아가기
        </Link>
      </div>
    </div>
  );
};

const makeDiv = (text, type, idname, value, handleChangeData) => (
  <div>
    <label className="font-semibold text-sm">{text}</label>
    <input type={type} id={idname} name={idname} value={value} onChange={handleChangeData}
      className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500" />
  </div>
);

export default RegistComponent;