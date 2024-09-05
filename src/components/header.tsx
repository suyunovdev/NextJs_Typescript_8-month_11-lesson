import Image from "next/image";
import logo from "../assets/logo.svg";
import { IoMdMenu } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { SlBasket, SlHeart } from "react-icons/sl";
import Link from "next/link";

type HeaderProps = {
  searchTerm: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Header = ({ searchTerm, handleSearch }: HeaderProps) => {
  return (
    <div className="Header p-5 bg-white fixed z-10 top-0 ring-0 left-0 w-full shadow-md">
      <div className="container mx-auto ">
        <div className="header flex items-center justify-around ">
          <Link href="/">
            <Image src={logo} alt="logo" width={100} height={100} />
          </Link>
          <div className="but">
            <button className="flex  items-center gap-3 bg-yellow-400 p-2  rounded-lg">
              <IoMdMenu className="text-xl" />
              <p className="font-medium"> Tovarlar katalogi</p>
            </button>
          </div>
          <form className="flex items-center shadow-xl rounded-md border border-yellow-600">
            <input
              type="text"
              value={searchTerm} // Qidiruv matni
              onChange={handleSearch} // Qidiruvni boshqaruvchi funksiya
              placeholder="Search..."
              className="w-full px-4 py-2 text-gray-700 rounded-lg outline-none"
            />
            <button className="bg-yellow-500 text-white px-4 py-2 border-l-0 rounded-r-md">
              <CiSearch className="text-xl" />
            </button>
          </form>
          <button className="flex flex-col items-center">
            <SlBasket className="text-2xl" />
            <p className="text-sm font-medium">Savat</p>
          </button>
          <button className="flex flex-col items-center">
            <SlHeart className="text-2xl" />
            <p className="text-sm font-medium">Sevimlilar</p>
          </button>
          <button className="p-2 border border-yellow-500 rounded-md ">
            Kirish
          </button>
          <div className="language">
            <div className="dropdown">
              <button className="p-2 text-gray-700 hover:text-gray-900">
                Rus /
              </button>
              <button className=" text-gray-700 hover:text-gray-900">Uz</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
