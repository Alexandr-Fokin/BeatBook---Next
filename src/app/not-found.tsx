import Link from "next/link";
import Image from "next/image";

export default function Page() {
  return (
    <div className="not-found-page w-full h-full flex flex-col justify-center items-center gap-2 p-4">
      <Image
        src="/logo-bad.svg"
        unoptimized
        alt="Логотип"
        className="h-16 w-fit"
        width={1835}
        height={250}
      />
      <div className="">Ничего не найдено</div>
      <Link href="/">Вернуться на главную</Link>
    </div>
  );
}
