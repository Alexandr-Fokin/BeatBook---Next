export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="w-screen h-screen flex flex-col justify-center items-center bg-[var(--color-bg)] layout-login">{children}</div>;
}
