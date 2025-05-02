export default function AfterLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>로그인 후 레이아웃</h1>
      {children}
    </div>
  );
}
