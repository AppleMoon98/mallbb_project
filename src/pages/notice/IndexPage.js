import { Outlet } from "react-router-dom";
import MainNav from "../../common/MainNav";

export default function IndexPage() {
  return (
    <div>
      <MainNav />
      <Outlet />
    </div>
  );
}