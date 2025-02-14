import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";

const Header = () => {
  return (
    <header className="bg-[#05252C] bg-transparent backdrop-blur-sm text-white py-3 px-4 shadow-md border border-[#197686] rounded-lg mx-4 sm:mx-auto my-3 w-full lg:max-w-[1200px] z-50">
      <div className="flex items-center justify-between md:gap-10">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/images/header logo.png"
            alt="Logo"
            width={90}
            height={48}
            className="rounded-full "
            priority
          />
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex gap-6 text-lg font-semibold ">
          <a href="#" className="hover:text-gray-200 transition text-white">
            Event
          </a>
          <a href="#" className="hover:text-gray-200 transition text-[#B3B3B3]">
            My Tickets
          </a>
          <a href="#" className="hover:text-gray-200 transition text-[#B3B3B3]">
            About Project
          </a>
        </nav>

        {/* My Ticket Button */}
        <div>
          <button
            className="bg-white text-[#0A0C11] px-4 py-2 rounded-lg flex items-center gap-2 shadow-md"
            type="button"
          >
            My Ticket
            <FaArrowRightLong className="ml-2" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
