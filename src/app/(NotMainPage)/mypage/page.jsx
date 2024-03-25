import LikedPosts from "./_component/LikedPosts/LikedPosts";
import MyComments from "./_component/MyComments/MyComments";
import MyDebates from "./_component/MyDebates/MyDebates";
import TastePosts from "./_component/TastePosts/TastePosts";

export default function page() {
  return (
    <>
      <TastePosts />
      <LikedPosts />
      <MyDebates />
      <MyComments />
    </>
  );
}
