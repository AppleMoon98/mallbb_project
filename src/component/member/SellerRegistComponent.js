import { useState } from "react"
import useCustomMove from "../hooks/useCustomMove"
import { Link } from "react-router-dom"
import { sellerRegister } from "../../api/memberApi"

const initState = {
    email: "",
    nickname: "",
    password: "",
    // 전화번호
    telNum: "",
    certification: false,
    // 사업자 등록 번호 (Business Registration Number)
    // BRN은 우리가 따로 보관하지 않음
    brn: "",
    brnCertification: false,
}

const SellerRegistComponent = () => {
    const [userData, setUserData] = useState(initState)
    const { moveToPath } = useCustomMove()

    const handleChangeData = (e) => {
        const { name, value } = e.target
        setUserData((prev) => ({ ...prev, [name]: value }))
    }

    const handleClickAdd = async () => {
        if (!userData.email.trim()
            || !userData.nickname.trim()
            || !userData.password.trim()
            || !userData.telNum.trim()
            || !userData.brn.trim()) {
            alert("빈 칸을 모두 채워주세요.")
            return
        }

        const payload = {
            email: userData.email,
            nickname: userData.nickname,
            password: userData.password,
            telNum: userData.telNum,
        }
        console.log(payload)

        try {
            const res = await sellerRegister(payload)
            console.log("등록 성공 : " + res)
            alert("회원가입이 완료되었습니다.")
            setUserData(initState)
            moveToPath('/')
        } catch (err) {
            console.error("등록 실패 : " + err)
            alert("등록 중 오류가 발생하였습니다.")
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-[90vh]">
            <h1 className="mb-5 text-2xl font-bold">사업자 회원가입</h1>

            {/* 탭 */}
            <div className="flex gap-10 mb-5">
                <Link to="/register"
                    className="px-6 py-3 border-2 border-gray-800 rounded-2xl font-semibold text-gray-800 bg-white hover:bg-gray-100 transition">
                    개인
                </Link>
                <div className="px-6 py-3 border-2 border-gray-800 rounded-2xl font-semibold text-white bg-gray-800">
                    사업자
                </div>
            </div>

            {/* 폼 */}
            <form>
                <div className="flex flex-col gap-3 border-[3px] border-black p-5 rounded-2xl">
                    {makeDiv("사업자번호","text","brn",userData.brn, handleChangeData)}
                    {makeDiv("E-mail","email","email",userData.email, handleChangeData)}
                    {makeDiv("닉네임","text","nickname",userData.nickname, handleChangeData)}
                    {makeDiv("PASSWORD","password","password",userData.password, handleChangeData)}

                    <div>
                        <label className="flex text-sm font-semibold">전화번호</label>
                        <div className="flex items-center gap-6">
                            <input type="text" id="telNum" name="telNum" onChange={handleChangeData}
                                className="w-[70%] rounded-lg border border-gray-300 p-2 outline-none focus:border-blue-500" />
                            <button type="button" className="w-[20%] rounded-lg bg-blue-500 px-2.5 py-2 text-white transition-colors hover:bg-blue-600">
                                인증
                            </button>
                        </div>
                    </div>

                    <button type="button" onClick={handleClickAdd}
                        className="mt-2 rounded-lg bg-blue-500 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-600">
                        회원가입
                    </button>
                </div>
            </form>

            {/* 돌아가기 */}
            <div className="mt-3">
                <Link to="/" className="text-gray-600 hover:underline">
                    돌아가기
                </Link>
            </div>
        </div>
    )
}

const makeDiv = (text, type, idname, value, handleChangeData) => (
    <div>
        <label className="font-semibold text-sm">{text}</label>
        <input type={type} id={idname} name={idname} value={value} onChange={handleChangeData}
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500" />
    </div>
);

export default SellerRegistComponent