import Image from 'next/image';
import Button from './common/Button';
import { destributionList } from './common/Helper';
import { Check, EmailIcon } from './common/Icons';
import RecentUploads from './RecentUploads';
import SavingCard from './common/SavingCard';

const SuccessDashboard = () => {
  return (
    <div className="max-w-[1180px] mx-auto px-4 py-10 sm:py-14 md:pt-20 lg:pt-[130px]">
      <p className="text-center font-montserrat letter-spacing-3 font-medium text-2xl sm:text-3xl lg:text-[39px] text-black mb-4 sm:mb-6 lg:mb-11 leading-snug">
        Succé!
      </p>
      <div className="bg-primary-light w-full rounded-xl lg:rounded-[35px] px-4 sm:px-6 py-8 sm:py-10 lg:px-[38px] lg:py-[59px]">
        <div className="flex flex-wrap gap-4 sm:gap-6 items-center">
          <p className="medium-text font-montserrat">
            Jobb 5 har behandlats klart
          </p>
          <Check className="size-5 md:size-[31px]" />
        </div>
        <p className="title-heading text-gray pt-2 mt-2 mb-8 sm:mb-10">
          Dina filer har skickats in för distribution.
        </p>

        <div className="bg-white rounded-[35px] border-5 border-[#F8F8F8] p-4 sm:p-5 lg:px-[40px] lg:py-[58px]">
          <p className="text-xl sm:text-2xl md:text-[30px] font-medium font-montserrat mb-4 sm:mb-6">
            Dina besparingar
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
            <SavingCard bgColor="bg-light-green" label="Est. kostnad" amount="3689" unit="SEK" />
            <SavingCard bgColor="bg-light-green" label="Total besparing" amount="1200" unit="SEK" />
          </div>
        </div>

        <div className="bg-white mt-9 rounded-[35px] border-[5px] border-[#F8F8F8] p-4 sm:p-5 lg:px-[40px] lg:py-[58px]">
          <p className="text-xl sm:text-2xl md:text-[30px] font-medium font-montserrat mb-6">
            Sammanfattning
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-9 gap-5 md:gap-8">
            <SavingCard bgColor="bg-carteBlanche" label="Antal filer" amount="12" unit="" />
            <SavingCard bgColor="bg-roseMochi" label="Avvisade filer" amount="1" unit="" />
          </div>

          <p className="text-base sm:text-lg font-medium font-montserrat mt-10 sm:mt-12 mb-5">
            Distribution
          </p>
          <div className="flex flex-col gap-5">
            {destributionList.map((obj, index) => (
              <div key={index} className="flex items-center p-4 border-2 rounded-xl border-[#F8F8F8] justify-between">
                <div className="flex items-center gap-3">
                  {obj.title === 'Digital Brevlåda' ? (
                    <Image
                      className="max-w-[51px] w-full"
                      src="/kivra-logo.webp"
                      height={42}
                      width={42}
                      alt="kivra-logo"
                    />
                  ) : obj.title === 'Email' ? (
                    <EmailIcon />
                  ) : (
                    <Image
                      className="max-w-[22px] w-full"
                      src="/post.webp"
                      height={42}
                      width={42}
                      alt="post"
                    />
                  )}
                  <p className="text-sm sm:text-base text-black font-normal letter-spacing-3">
                    {obj.title}
                  </p>
                </div>
                <p className="text-sm sm:text-base text-black font-normal letter-spacing-3">
                  {obj.filer}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-end justify-end gap-4 sm:gap-6 mt-6">
            <Button variant="outline">Se status</Button>
            <Button variant="primary">Skicka fler filer</Button>
          </div>
        </div>

        <RecentUploads />
      </div>
    </div>
  );
};

export default SuccessDashboard;