import { Outlet } from "react-router-dom";

const PageLayout = () => {
  return (
    <>
      <div>Page Layout</div>
      <Outlet />
    </>
  );
};

export default PageLayout;
