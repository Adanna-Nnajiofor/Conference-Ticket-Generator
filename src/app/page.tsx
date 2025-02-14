"use client";

import { usePathname } from "next/navigation";
import SelectTicket from "./select-ticket/page";

const Home = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className=" flex flex-col w-full h-full items-center justify-center">
      <SelectTicket />
      {pathname === "/" && children}
    </div>
  );
};

export default Home;
