import React from "react";
import MainNav from "../../common/MainNav";
import MyPageComponent from "../../component/member/MyPageComponent";

export default function MyPage() {
    return (
        <div>
            {/* 네비바 */}
            <MainNav />
            <MyPageComponent />
        </div>
    );
}
