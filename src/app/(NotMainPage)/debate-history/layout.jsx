import TitleAndPopcornHeader from "@/app/_component/TitleAndPopcornHeader/TitleAndPopcornHeader";

const Layout = ({ children }) => {
  return (
    <div
      style={{
        paddingTop: "6rem",
      }}
    >
      <TitleAndPopcornHeader span={`역대 팝콘토론`} />
      {children}
    </div>
  );
};
export default Layout;
