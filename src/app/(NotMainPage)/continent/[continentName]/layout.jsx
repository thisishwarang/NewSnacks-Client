import TitleAndPopcornHeader from "@/app/_component/TitleAndPopcornHeader/TitleAndPopcornHeader";

export default function Layout({ children }) {
  return (
    <div
      style={{
        paddingTop: "6rem",
        backgroundImage: `url(/종이-뉴스게시판.jpg)`,
      }}
    >
      <TitleAndPopcornHeader span={"대륙 별 뉴스낵스"} />
      {children}
    </div>
  );
}
