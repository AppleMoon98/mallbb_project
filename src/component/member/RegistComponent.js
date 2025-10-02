import { useState } from "react";
import { Link } from "react-router-dom";
import useCustomMove from "../hooks/useCustomMove";
import { Certification, register } from "../../api/memberApi";

const initState = {
  email: "",
  nickname: "",
  password: "",
  telNum: "",
  number: "",
};

const RegistComponent = () => {
  const [userData, setUserData] = useState(initState);
  const rangeRandom = (min, max) => Math.floor(Math.random() * (max - min) + min)

  // 
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // 조건문 정규식
  const notNumber = /[^0-9]/g
  const telNumPattern = /^0\d{8,10}$/
  //

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

    const telNum = userData.telNum.replace(notNumber, "")
    if(!telNumPattern.test(telNum)){
      alert("전화번호의 길이가 맞지 않습니다.")
      return;
    }
    
    const number = rangeRandom(100000, 999999)
    console.log(number)

    setIsVerifying(true);
    setUserData(prev => ({ ...prev, number }))

    const formdata = new FormData()
    formdata.append("telNum", telNum)
    formdata.append("number", number)
  
    // 여기서 인증번호를 백으로 전송하고 전화번호를 받아둠.
    Certification(formdata)

    // 마무리는 무조건 인증번호가 발송되었다는 알림으로 마무리됨
    alert("인증번호가 전송되었습니다.")
  };

  const handleClickVerify = () => {
    if (!authCodeInput.trim()) {
      alert("인증번호를 입력해주세요.");
      return;
    }

    if (authCodeInput != userData.number){
      alert("인증번호가 다릅니다.")
      return;
    }
    // 여기서 인증번호가 같은지 확인 후 백으로 전화번호 전송
    setIsVerified(true);  // 해당 값이 true가 되면 버튼이 잠기게 설정해두었음
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
          {makeDiv("E-mail", "email", "email", userData.email, handleChangeData)}
          {makeDiv("닉네임", "text", "nickname", userData.nickname, handleChangeData)}
          {makeDiv("PASSWORD", "password", "password", userData.password, handleChangeData)}

          <div>
            {!isVerifying ? (
              <>
                <label className="flex text-sm font-semibold">전화번호</label>
                <div className="flex items-center gap-6">
                  <input type="text" id="telNum" name="telNum" value={userData.telNum} onChange={handleChangeData}
                    className="w-[70%] rounded-lg border border-gray-300 p-2 outline-none focus:border-blue-500" />
                  <button type="button" onClick={handleClickAuth}
                    className="w-[20%] rounded-lg bg-blue-500 px-2.5 py-2 text-white transition-colors hover:bg-blue-600">
                    인증
                  </button>
                </div>
              </>
            ) : (
              <>
                <label className="flex text-sm font-semibold">인증번호</label>
                <div className="flex items-center gap-6">
                  <input type="number" id="authCode" name="authCode" value={authCodeInput} onChange={(e) => setAuthCodeInput(e.target.value)} disabled={isVerified}
                    className="w-[70%] rounded-lg border border-gray-300 p-2 outline-none focus:border-blue-500" />
                  <button type="button" onClick={handleClickVerify} disabled={isVerified}
                    className="w-[20%] rounded-lg bg-green-500 px-2.5 py-2 text-white transition-colors hover:bg-green-600">
                    확인
                  </button>
                </div>
              </>
            )}
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