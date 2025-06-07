import Button from "../common/Button";
import { filesData } from "../common/Helper";
import { EditIcon } from "../common/Icons";
import ReviewFileCard from "./ReviewFileCard";

const VerifyFiles = () => {
 
  return (
    <section className="max-w-[1180px] mx-auto px-4 pt-10">
      <div className="flex justify-center items-center gap-2 mb-5">
        <h2 className="medium-text font-montserrat">Jobb 5</h2>
        <EditIcon />
      </div>
      <div className="bg-[#FDF9F8] lg:py-9 md:py-5 py-3 px-4 md:px-8 rounded-xl sm:rounded-[35px]">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <p className="text-sm font-medium text-secondary">
              ⏰ Tid att slutföra: 3h 20m 15s
            </p>
            <h3 className="medium-text font-montserrat">
              Granska bearbetade filer
            </h3>
            <p className="title-heading text-gray pt-2">
              Granska filerna nedan och korrigera de filer som behövs.
            </p>
          </div>
          <div className="flex items-center gap-3 sm:gap-5">
            <p className="text-sm font-medium text-[#696969]">Avbryt</p>
            <Button variant="secondary" size="sm" className="whitespace-nowrap">
              Godkänn alla
            </Button>
            <button className="rounded-lg bg-gray px-3 py-2 text-sm font-medium text-white whitespace-nowrap">
              Bearbeta filerna
            </button>
          </div>
        </div>
        {/* Digital Brevlåda */}
        <ReviewFileCard title="Digital Brevlåda" files={filesData.filter((file) => file.type === 'Digital brevlåda')} />
        {/* Email */}
        <ReviewFileCard title="Email" files={filesData.filter((file) => file.type === 'email')} />
        {/* Post */}
        <ReviewFileCard title="Post" files={filesData.filter((file) => file.type === 'post')} />
      </div>
    </section>
  );
};

export default VerifyFiles;
