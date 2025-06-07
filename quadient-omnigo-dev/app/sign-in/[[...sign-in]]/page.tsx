import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import '@/app/styles/clerk-custom.css';

export default function SignInPage() {
  // Create a loading skeleton to use as fallback
  const LoadingSkeleton = () => (
    <div className="min-w-[26rem] max-w-[30rem] p-8 rounded-lg shadow-md bg-white">
      {/* Skeleton for header */}
      <div className="flex flex-col items-center mb-6">
        <div className="h-8 w-4/5 bg-gray-200 rounded-md animate-pulse mb-2"></div>
        <div className="h-4 w-32 bg-gray-200 rounded-md animate-pulse"></div>
      </div>
      
      {/* Skeleton for input fields */}
      <div className="space-y-4 mb-6">
        <div className="h-4 w-24 bg-gray-200 rounded-md animate-pulse mb-1"></div>
        <div className="h-10 w-full bg-gray-200 rounded-md animate-pulse"></div>
      </div>
      
      {/* Skeleton for button */}
      <div className="h-12 w-full bg-[#FFF6F3] rounded-md animate-pulse mb-4"></div>
      
      {/* Skeleton for footer links */}
      <div className="flex justify-center mb-4">
        <div className="h-4 w-40 bg-gray-200 rounded-md animate-pulse"></div>
      </div>
      <div className="flex justify-center">
        <div className="h-4 w-40 bg-gray-200 rounded-md animate-pulse"></div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Section - Login */}
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
          <SignIn 
            fallback={<LoadingSkeleton />}
            appearance={{
              variables: {
                colorPrimary: '#FF4200',
              },
              elements: {
                cardBox: {
                  width: '100%',
                  maxWidth: '30rem',
                  backdropFilter: 'blur(8px)',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                },
                headerTitle: {
                  fontSize: '1.5rem',
                },
              },
            }}
          />
        </div>
      </div>
      
      {/* Right Section - Image with Logo Overlay */}
      <div className="w-full h-screen lg:w-1/2 absolute lg:relative inset-0 -z-0 lg:z-auto">
        <Image
          src="/Quadient-login-image-wide.png"
          alt="Quadient Map"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
    </div>
  );
} 