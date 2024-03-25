// "use client";
import TitleAndPopcornHeader from "@/app/_component/TitleAndPopcornHeader/TitleAndPopcornHeader";

export default function Layout({ children }) {
  return (
    <div
      style={{
        paddingTop: "6rem",
      }}
    >
      <TitleAndPopcornHeader span={`님의 페이지`} />
      {children}
    </div>
  );
}
