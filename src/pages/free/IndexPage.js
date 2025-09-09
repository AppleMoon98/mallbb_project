import {Outlet} from "react-router-dom";
import MainNav from "../../common/mainNav";
import Sidebar from "../../common/Sidebar";

export default function IndexPage() {
  return (
    <div>
      <MainNav/>
      <Sidebar/>
      <Outlet/>
    </div>
  );
}