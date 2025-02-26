import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <div>RootLayout</div>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>Footer Content</p>
      </footer>
    </>
  );
};

export default RootLayout;
