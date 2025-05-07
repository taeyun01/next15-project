import Home from "@/app/(afterLogin)/home/page";

type Props = {
  params: Promise<{
    username: string;
    id: string;
    photoId: string;
  }>;
};

//* 포토 모달 뒤에 표시될 화면 컴포넌트
export default async function Photo({ params }: Props) {
  // params에서 username, id, photoId를 꺼내옴 비동기로 바뀌어서 await 사용
  const { username, id, photoId } = await params;
  console.log("Photo: ", username, id, photoId);

  return <Home />;
}
