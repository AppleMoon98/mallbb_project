import { Outlet } from "react-router-dom";
import MainNav from "../../common/mainNav"; // 필요시

const IndexPage = () => {
  return (
    <div>
      <MainNav />
      <Outlet />
    </div>
  );
}

export default IndexPage;