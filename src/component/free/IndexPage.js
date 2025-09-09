import {Outlet} from "react-router-dom";
import MainNav from "../../common/mainNav";

export default function IndexPage() {
  return (
    <div>
      <MainNav />
      <Outlet />
    </div>
  );
}