import Navbar from "../_component/Navbar/Navbar";

export default function Layout({ children }) {
  return (
    <div style={{ overflow: "hidden" }}>
      <Navbar />
      {children}
    </div>
  );
}
