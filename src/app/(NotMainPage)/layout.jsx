import Navbar from "../_component/Navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <div style={{ overflow: "hidden" }}>
      <Navbar />
      {children}
    </div>
  );
};
export default Layout;
