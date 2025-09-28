import React from "react";
import MainNav from "../../common/MainNav";

/**
 * MyPage · Profile Settings
 *
 * Props (optional):
 *   displayName?: string            // 상단/프로필 카드 표시용 닉네임
 *   email?: string                  // 프로필 카드 표시용 이메일
 *   joinedAt?: string               // 가입일 표시
 *   role?: string                   // 권한 표시
 */

export default function MyPage({
    displayName = "member",
    email = "member@mallpang.com",
    joinedAt = "2025-01-01",
    role = "MEMBER",
    isCertify = false,
}) {
    

    // 닉네임
    const handleNicknameSubmit = () => {

    };

    // 패스워드
    const handlePasswordSubmit = () => {

    };

    return (
        <div>
            {/* 네비바 */}
            <MainNav />
            <div className="bg-gray-50 text-gray-900 min-h-screen">
                {/* 전체 폼 */}
                <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* 프로필 정보 */}
                    <aside className="lg:col-span-4">
                        <section className="bg-white rounded-2xl border shadow-sm p-6">
                            <div className="flex items-center gap-4">
                                {/* 윗칸 */}
                                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 text-white flex items-center justify-center font-bold text-xl">
                                    {displayName?.[0]?.toUpperCase() ?? "U"}
                                </div>
                                <div>
                                    <div className="text-base font-semibold" aria-live="polite">{displayName}</div>
                                    <div className="text-sm text-gray-500">{email}</div>
                                </div>
                            </div>

                            <hr className="my-6" />

                            {/* 아랫칸 */}
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center justify-between">
                                    <span className="text-gray-600">닉네임</span>
                                    <span className="font-medium" aria-live="polite">{displayName}</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span className="text-gray-600">가입일</span>
                                    <span className="font-medium">{joinedAt}</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span className="text-gray-600">권한</span>
                                    <span className="font-medium">{role}</span>
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
                                    <input id="currentNickname" name="currentNickname" type="text" defaultValue={displayName} readOnly
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
                                <div className="sm:col-span-2">
                                    <label htmlFor="telNum" className="block text-sm font-medium text-gray-700">본인 인증</label>
                                    <input id="telNum" name="telNum" type="text" placeholder="휴대폰 번호" required
                                        className="mt-1 w-[80%] rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-200" />
                                    <button type="submit" className="mx-4 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 justify-end">
                                        인증하기
                                    </button>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">현재 비밀번호</label>
                                    <input id="currentPassword" name="currentPassword" type="password" placeholder="현재 비밀번호" required disabled={!isCertify}
                                        className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-200" />
                                </div>

                                <div>
                                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">새 비밀번호</label>
                                    <input id="newPassword" name="newPassword" type="password" placeholder="새 비밀번호" disabled={!isCertify}
                                        className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-200"
                                        minLength={8} maxLength={32} required aria-describedby="newPwHelp" />
                                    <p id="newPwHelp" className="mt-1 text-xs text-gray-500">영문 대/소문자, 숫자, 특수문자 포함 권장</p>
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">새 비밀번호 확인</label>
                                    <input id="confirmPassword" name="confirmPassword" type="password" placeholder="새 비밀번호 확인" required disabled={!isCertify}
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
        </div>
    );
}
