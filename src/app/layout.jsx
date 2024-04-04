import { Inter, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import RecoilRootWrapper from "./_component/RecoilRootWrapper";

const inter = Inter({ subsets: ["latin"] });
const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"], // 또는 preload: false
  weight: ["400", "500", "700"], // 가변 폰트가 아닌 경우, 사용할 fontWeight 배열
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={notoSansKr.className}>
        <RecoilRootWrapper>{children}</RecoilRootWrapper>
      </body>
    </html>
  );
}
