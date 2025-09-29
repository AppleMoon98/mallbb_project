/**
 * MyPage · Profile Settings
 *
 * Props (optional):
 *   displayName?: string            // 상단/프로필 카드 표시용 닉네임
 *   email?: string                  // 프로필 카드 표시용 이메일
 *   joinedAt?: string               // 가입일 표시
 *   role?: string                   // 권한 표시
 */

import { useEffect, useState } from "react";
import { Certification, modifyNickname } from "../../api/memberApi";
import useAuthGuard from "../../component/hooks/useAuthGuard"
import { getCookie, setCookie } from "../../util/CookieUtil";

const memberState = {
    nickname: 'member',
    email: 'member@mallpang.com',
    joinedAt: '2025-01-01',
    role: 'MEMBER',
    telNum: '',
    isCertify: false,
}

const MyPageComponent = () => {
    const { member } = useAuthGuard()
    const [memberData, setMemberData] = useState(memberState)
    const rangeRandom = (min, max) => Math.floor(Math.random() * (max - min) + min)
    const [authCodeInput, setAuthCodeInput] = useState("");

    // 정규식
    const notNumber = /[^0-9]/g
    const telNumPattern = /^0\d{8,10}$/

    const [isVerifying, setIsVerifying] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    //

    // 실시간 데이터 갱신
    const handleChangeData = (e) => {
        const { name, value } = e.target;
        setMemberData((prev) => ({ ...prev, [name]: value }));
    };

    // 닉네임
    const handleNicknameSubmit = async (e) => {
        e.preventDefault();
        const newNickname = e.target.newNickname.value;
        if (!newNickname.trim()) return;

        await modifyNickname(newNickname)

        const current = getCookie("member") ?? {};
        const updated = { ...current, nickname: newNickname };
        setCookie("member", JSON.stringify(updated), 1)
        setMemberData(updated);
        e.target.reset();

        alert('닉네임이 변경되었습니다.')
        console.log(newNickname)
    };

    // 인증번호
    const handleClickAuth = () => {
        if (!memberData.telNum.trim()) {
            alert("전화번호를 입력해주세요.");
            return;
        }

        const telNum = memberData.telNum.replace(notNumber, "")
        if (!telNumPattern.test(telNum)) {
            alert("전화번호의 길이가 맞지 않습니다.")
            return;
        }

        const number = rangeRandom(100000, 999999)
        console.log(number)

        setIsVerifying(true);
        setMemberData(prev => ({ ...prev, number }))

        const formdata = new FormData()
        formdata.append("telNum", telNum)
        formdata.append("number", number)

        // 여기서 인증번호를 백으로 전송하고 전화번호를 받아둠.
        //Certification(formdata)

        // 마무리는 무조건 인증번호가 발송되었다는 알림으로 마무리됨
        alert("인증번호가 전송되었습니다.")
    };

    // 인증번호 받은 후
    const handleClickVerify = () => {
        console.log(memberData)
        if (!authCodeInput.trim()) {
            alert("인증번호를 입력해주세요.");
            return;
        }

        if (authCodeInput != memberData.number) {
            alert("인증번호가 다릅니다.")
            return;
        }
        // if(){
        //     return;
        // }

        // 여기서 인증번호가 같은지 확인 후 백으로 전화번호 전송
        setIsVerified(true);  // 해당 값이 true가 되면 버튼이 잠기게 설정해두었음
        alert("본인인증이 완료되었습니다.");
    };

    // 패스워드
    const handlePasswordSubmit = () => {

    };

    useEffect(() => {
        setMemberData(getCookie("member"))
    }, [])

    return (
        <div className="bg-gray-50 text-gray-900 min-h-screen">
            {/* 전체 폼 */}
            <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* 프로필 정보 */}
                <aside className="lg:col-span-4">
                    <section className="bg-white rounded-2xl border shadow-sm p-6">
                        <div className="flex items-center gap-4">
                            {/* 윗칸 */}
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 text-white flex items-center justify-center font-bold text-xl">
                                {memberData?.nickname?.[0]?.toUpperCase() ?? "U"}
                            </div>
                            <div>
                                <div className="text-base font-semibold" aria-live="polite">{memberData.nickname}</div>
                                <div className="text-sm text-gray-500">{memberData.email}</div>
                            </div>
                        </div>

                        <hr className="my-6" />

                        {/* 아랫칸 */}
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center justify-between">
                                <span className="text-gray-600">닉네임</span>
                                <span className="font-medium" aria-live="polite">{memberData.nickname}</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-gray-600">가입일</span>
                                <span className="font-medium">{memberData.joinedAt ?? "-"}</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-gray-600">권한</span>
                                <span className="font-medium" aria-live="polite">
                                    {Array.isArray(memberData.roleNames)
                                        ? memberData.roleNames.join(", ")
                                        : Array.isArray(memberData.role)
                                            ? memberData.role.join(", ")
                                            : (memberData.role ?? memberData.roleNames ?? "MEMBER")}
                                </span>
                            </li>
                        </ul>
                    </section>
                </aside>

                <section className="lg:col-span-8 space-y-6">
                    {/* 닉네임 변경 */}
                    <form className="bg-white rounded-2xl border shadow-sm p-6" autoComplete="off" onSubmit={handleNicknameSubmit}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-base font-semibold">닉네임 변경</h2>
                            <span className="text-xs text-gray-500">영문/숫자/한글 2~20자</span>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="currentNickname" className="block text-sm font-medium text-gray-700">현재 닉네임</label>
                                <input id="currentNickname" name="currentNickname" type="text" Value={memberData.nickname} readOnly
                                    className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-blue-200" />
                            </div>
                            <div>
                                <label htmlFor="newNickname" className="block text-sm font-medium text-gray-700">새 닉네임</label>
                                <input id="newNickname" name="newNickname" type="text" minLength={2} maxLength={20} placeholder="새 닉네임을 입력하세요"
                                    className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-blue-200"
                                    aria-describedby="nicknameHelp" required />
                                <p id="nicknameHelp" className="mt-1 text-xs text-gray-500">특수문자 제외(._- 허용), 2~20자</p>
                            </div>
                        </div>

                        <div className="mt-5 flex items-center gap-3">
                            <button type="submit" className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200">
                                닉네임 변경
                            </button>
                        </div>
                    </form>

                    {/* 비밀번호 변경 */}
                    <form className="bg-white rounded-2xl border shadow-sm p-6" autoComplete="off" onSubmit={handlePasswordSubmit}>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-base font-semibold">비밀번호 변경</h2>
                            <span className="text-xs text-gray-500">8~32자, 영문 대소문자/숫자/특수문자 조합</span>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {/* 휴대폰 인증 */}
                            {!isVerifying ? (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">전화번호</label>
                                    <div className="flex items-center gap-6">
                                        <input type="text" id="telNum" name="telNum" value={memberData.telNum} onChange={handleChangeData}
                                            className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-200" />
                                        <button type="button" onClick={handleClickAuth}
                                            className="w-[20%] rounded-lg bg-blue-500 px-2.5 py-2 text-white transition-colors hover:bg-blue-600">
                                            인증
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">인증번호</label>
                                    <div className="flex items-center gap-6">
                                        <input type="number" id="authCode" name="authCode" value={authCodeInput} onChange={(e) => setAuthCodeInput(e.target.value)} disabled={isVerified}
                                            className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-200" />
                                        <button type="button" onClick={handleClickVerify} disabled={isVerified}
                                            className="w-[20%] rounded-lg bg-green-500 px-2.5 py-2 text-white transition-colors hover:bg-green-600">
                                            확인
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className="sm:col-span-2">
                                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">현재 비밀번호</label>
                                <input id="currentPassword" name="currentPassword" type="password" placeholder="현재 비밀번호" required disabled={!memberData.isCertify}
                                    className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-200" />
                            </div>

                            <div>
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">새 비밀번호</label>
                                <input id="newPassword" name="newPassword" type="password" placeholder="새 비밀번호" disabled={!memberData.isCertify}
                                    className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-200"
                                    minLength={8} maxLength={32} required aria-describedby="newPwHelp" />
                                <p id="newPwHelp" className="mt-1 text-xs text-gray-500">영문 대/소문자, 숫자, 특수문자 포함 권장</p>
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">새 비밀번호 확인</label>
                                <input id="confirmPassword" name="confirmPassword" type="password" placeholder="새 비밀번호 확인" required disabled={!memberData.isCertify}
                                    className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-200" />
                            </div>
                        </div>

                        <div className="mt-5 flex items-center gap-3">
                            <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200">
                                비밀번호 변경
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    )
}

export default MyPageComponent