import { EmailIcon } from "@/app/components/common/Icons";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

// Mock data - replace with real data from your API
const dashboardData = {
  totalSaved: 23240,
  currency: "SEK",
  sentFiles: 1850,
  avgProcessingTime: {
    hours: 4,
    minutes: 24,
    seconds: 10
  },
  distributedFiles: 1850,
  distributionMethods: {
    kivra: 350,
    email: 200,
    post: 1300
  }
};

// Stats card component
const StatsCard = ({
  title,
  value,
  bgColor,
  icon
}: {
  title: string;
  value: string | number;
  bgColor: string;
  icon: string;
}) => (
  <div className={`lg:rounded-[30px] rounded-2xl p-5 lg:p-8 xl:pt-[50px] relative overflow-hidden border-5 border-white`} style={{ background: `linear-gradient(296.05deg, transparent 0.75%, ${bgColor} 97.25%)` }}>
    <div className="relative z-10">
      <div className="text-3xl sm:text-2xl lg:text-4xl xl:text-[50px] font-bold text-black mb-2">
        {value}
      </div>
      <div className="text-lg lg:text-xl text-gray-600">
        {title}
      </div>
    </div>
    <div className="mt-[34px] flex justify-end">
      <Image src={icon} width={36} height={36} alt="reduce-cost" />
    </div>
  </div>
);

// Distribution method card component
const DistributionCard = ({
  method,
  count,
}: {
  method: string;
  count: number;
}) => (
  <div className="bg-[#FBFBFB] rounded-2xl p-6 border border-gray-100">
    <div className="flex justify-end mb-3">
      {method === "Kivra" ? (
        <img
          className="max-w-[51px] w-full"
          src="/kivra-logo.webp"
          alt="kivra-logo"
        />
      ) : method === 'Email' ? (
        <EmailIcon />
      ) : (
        <img
          className="w-5 sm:max-w-[22px]"
          src="/post.webp"
          alt="post"
        />
      )}
    </div>
    <div className="text-2xl lg:text-[30px] font-bold text-black mb-1">
      {count.toLocaleString()}
    </div>
    <div className="text-sm lg:text-[23px] text-gray-600 capitalize">
      {method}
    </div>
  </div>
);

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-[calc(100vh-228px)]">
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center">
          <div className="px-6 my-10 lg:my-16">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-[52px] leading-[100%] font-montserrat text-center font-semibold text-black mb-2">
                Dashboard
              </h1>
              <p className="text-[#949494] text-center text-base sm:text-lg lg:text-[22px]">
                Se hur mycket du sparar - i realtid
              </p>
            </div>
          </div>

          {/* Filter button */}
          <div className="flex justify-end mt-6 mb-3 mr-4 md:mr-10">
            <button className="flex items-center cursor-pointer space-x-2 text-base lg:text-xl font-medium text-secondary hover:bg-gray-50 transition-colors">
              <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
              </svg>
              <span>Filter</span>
            </button>
          </div>
        </div>
        <div className="bg-[#FDF9F8] lg:p-9 md:p-5 p-3 rounded-xl lg:rounded-[35px]">
          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-12">
            {/* Total Savings */}
            <StatsCard
              title="Total besparing (SEK)"
              value={`${dashboardData.totalSaved.toLocaleString()}`}
              bgColor="#34C75933"
              icon="/reduce-cost.png"
            />

            {/* Sent Files */}
            <StatsCard
              title="Skickade filer"
              value={dashboardData.sentFiles.toLocaleString()}
              bgColor="#007aff33"
              icon="/mails.png"
            />

            {/* Processing Time */}
            <StatsCard
              title="Handläggningstid"
              value={`${dashboardData.avgProcessingTime.hours}h ${dashboardData.avgProcessingTime.minutes}m ${dashboardData.avgProcessingTime.seconds}s`}
              bgColor="#af52de33"
              icon="/clock.png"
            />
          </div>

          {/* Distribution Methods Section */}
          <div className="bg-white rounded-3xl p-8 flex justify-between max-lg:flex-col lg:items-center">
            <div className="mb-8">
              <div className="text-3xl lg:text-[53px] font-bold text-green-600 mb-2">
                {dashboardData.distributedFiles.toLocaleString()}
              </div>
              <div className="text-lg text-gray-600">
                Distribuerade filer via...
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full lg:w-8/12">
              {/* Kivra */}
              <DistributionCard
                method="Kivra"
                count={dashboardData.distributionMethods.kivra}
              />

              {/* Email */}
              <DistributionCard
                method="Email"
                count={dashboardData.distributionMethods.email}
              />

              {/* Post */}
              <DistributionCard
                method="Post"
                count={dashboardData.distributionMethods.post}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}