'use client';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Skicka", href: "/" },
    { name: "Arkiv", href: "/archive" },
    { name: "Dashboard", href: "/dashboard" }
  ];

  return (
    <header className='container xl:max-w-[1212px] mx-auto px-4 relative z-20 mt-6'>
      <div className='bg-white w-full shadow-lg rounded-xl p-4 flex justify-between items-center'>
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Image
            src="/quadient_omnigo_logo.png"
            alt="Quadient Omnigo Logo"
            width={160}
            height={53}
            className="h-10 w-auto"
          />

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className={`px-4 py-2.5 rounded-md text-base font-medium ${pathname === link.href
                  ? 'text-primary font-bold'
                  : 'text-gray-500 hover:text-gray-900'
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="bg-[#FAFAFA] p-3 rounded-md cursor-pointer">
              <Image
                src="/Cog.svg"
                alt="Settings"
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu With Transition */}
      <div
        className={`
          md:hidden transition-all duration-300 ease-in-out overflow-hidden
          ${menuOpen ? 'max-h-96 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'}
          bg-white shadow-md rounded-xl px-4 py-0 space-y-0 mt-2
        `}
      >
        <div className="py-4 space-y-3">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-2 rounded-md text-base font-medium ${pathname === link.href
                ? 'text-primary font-bold'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="bg-[#FAFAFA] px-4 py-2 rounded-md cursor-pointer">
            <Image
              src="/Cog.svg"
              alt="Settings"
              width={20}
              height={20}
              className="w-5 h-5"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
