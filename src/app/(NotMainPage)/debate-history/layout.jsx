import TitleAndPopcornHeader from "@/app/_component/TitleAndPopcornHeader/TitleAndPopcornHeader";

export default function Layout({ children }) {
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
}
