export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>홈 레이아웃</h1>
      {children}
    </div>
  );
}
