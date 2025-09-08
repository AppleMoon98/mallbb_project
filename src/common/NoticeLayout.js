import { Outlet } from "react-router-dom";
import MainNav from "../../common/mainNav"; // 필요시

export default function NoticeLayout() {
  return (
    <div>
      <MainNav />
      <Outlet />
    </div>
  );
}