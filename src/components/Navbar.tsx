import { Button } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type PropsWithChildren } from "react";

type NavbarItemProps = {
  to: string;
  name: string;
};
export function NavbarItem({ to, name }: NavbarItemProps) {
  const pathname = usePathname();
  const isInPath = pathname === to;

  return (
    <Link href={to} className="no-underline">
      <div
        className={`relative cursor-pointer select-none text-xl font-bold text-black  
          before:absolute before:-bottom-1 before:left-0 before:h-[3px] before:w-full
           before:bg-black before:transition before:duration-200 before:content-['']  ${
             isInPath
               ? "before:scale-100"
               : "before:scale-0 before:hover:scale-100"
           } `}
      >
        {name}
      </div>
    </Link>
  );
}

export function Navbar({ children }: PropsWithChildren) {
  return (
    <nav className="fixed left-0 top-0 z-50 flex h-20 w-full items-center  gap-5 bg-white px-10">
      <div className="flex w-1/4 items-end text-4xl font-bold">
        <div>FLEET</div>
        <div className="text-2xl font-thin">corp</div>
      </div>
      <div className="flex w-1/2 items-center justify-center gap-5">
        {children}
      </div>
      <div className="flex w-1/4 justify-end">
        <Link href={"/dashboard/employee"}>
          <Button
            color="teal"
            variant="outline"
            size="lg"
            className="rounded-full"
          >
            Log In
          </Button>
        </Link>
      </div>
    </nav>
  );
}
