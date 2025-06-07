import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="w-full h-screen lg:w-1/2 absolute lg:relative inset-0 -z-0 lg:z-auto">
        <Image
          src="/Quadient-signup-image-wide.png"
          alt="Quadient Map"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
      <div className="w-full min-h-screen lg:min-h-0 lg:w-1/2 flex flex-col items-center p-6 lg:p-12 relative z-10 bg-white/90 lg:bg-white">
        {/* Added Logo at the top */}
        <div className="w-48 h-auto mb-8 lg:mb-0 lg:absolute lg:top-8 lg:left-8">
          <Image
            src="/quadient_omnigo_logo.png"
            alt="Quadient Omnigo Logo"
            width={256}
            height={96}
          />
        </div>

        {/* Decorative rotated image in bottom left */}
        <div className="absolute bottom-0 left-0 w-64 h-64 overflow-hidden z-0 pointer-events-none">
          <div className="w-full h-full transform rotate-45 origin-bottom-left translate-x-[-45%] translate-y-[-30%]">
            <Image
              src="/quad-tree-multi.png"
              alt="Decorative pattern"
              width={256}
              height={256}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* SignIn container with flex-grow to push it to center */}
        <div className="max-w-md flex-grow flex items-center">
          <SignUp />
        </div>
      </div>
    </div>
  );
} 