import HomePage from "@/app/(afterLogin)/home/page";

// ComposeTweet의 뒷 배경은 HomePage가 되고 얘는 children에 들어감
export default function ComposeTweet() {
  return <HomePage />;
}
