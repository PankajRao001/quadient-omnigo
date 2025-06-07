import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    // <footer className="bg-white py-4 px-6 border-t border-gray-200 text-center text-gray-500 text-sm">
    //   © {new Date().getFullYear()} Quadient. All rights reserved.
    // </footer>
    <footer className="bg-white mt-8 sm:mt-10">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center gap-4 text-sm text-gray md:flex-row flex-col">
          <div className="flex items-center gap-2 md:gap-5 lg:gap-[52px]">
            <Image src="/quadient-icon.png" alt='quadient-icon' width={21} height={21} />
            <span>Copyright © {new Date().getFullYear()} Quadient. All rights reserved.</span>
          </div>
          <div className="flex space-x-6">
            <Link href="/" className="text-gray hover:text-black transition-colors duration-300 font-medium">Email us</Link>
            <Link href="/" className="text-gray hover:text-black transition-colors duration-300 font-medium">Cookie Policy</Link>
            <Link href="/" className="text-gray hover:text-black transition-colors duration-300 font-medium">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 