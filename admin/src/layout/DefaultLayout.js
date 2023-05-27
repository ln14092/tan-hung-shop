import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        {children}
      </div>
    </>
  );
};

export default DefaultLayout;
