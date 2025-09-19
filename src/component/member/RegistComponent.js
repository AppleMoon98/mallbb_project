import { Link } from "react-router-dom";

const RegistComponent = () => {
    return (
        <div className="flex min-h-[90vh] flex-col items-center justify-center">
            <h1 className="mb-5 text-2xl font-bold">회원가입</h1>

            {/* 탭 */}
            <div className="mb-5 flex gap-10">
                <div className="cursor-pointer rounded-2xl border-2 border-neutral-800 bg-neutral-800 px-6 py-3 font-semibold text-white transition-all">
                    개인
                </div>
                <Link to="/register/seller" className="cursor-pointer rounded-2xl border-2 border-neutral-800 bg-white px-6 py-3 font-semibold text-neutral-800 transition-all hover:bg-neutral-100">
                    사업자
                </Link>
            </div>

            {/* 폼 */}
            <form className="w-full max-w-md">
                <div className="flex flex-col gap-4 rounded-2xl border-[3px] border-black p-5">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold">E-mail</label>
                        <input type="email" className="w-[90%] rounded-lg border border-gray-300 p-2 outline-none focus:border-blue-500" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold">닉네임</label>
                        <input type="text" className="w-[90%] rounded-lg border border-gray-300 p-2 outline-none focus:border-blue-500" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold">PASSWORD</label>
                        <input type="password" className="w-[90%] rounded-lg border border-gray-300 p-2 outline-none focus:border-blue-500" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="flex text-sm font-semibold">전화번호</label>
                        <div className="flex items-center gap-6">
                            <input type="text" className="w-[60%] rounded-lg border border-gray-300 p-2 outline-none focus:border-blue-500" />
                            <button type="button" className="w-[20%] rounded-lg bg-blue-500 px-3 py-2 text-white transition-colors hover:bg-blue-600">
                                인증
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="mt-2 rounded-lg bg-blue-500 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-600">
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

export default RegistComponent;
