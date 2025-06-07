import React from "react";
import { DownloadIcon, PdfIcon } from "../common/Icons";
import Button from "../common/Button";

interface FileProps {
  fileName: string;
  filePath: string;
  status: string;
  descrition?: string; 
}

interface VerifyFileCardProps {
  file: FileProps;
}

const VerifyFileCard: React.FC<VerifyFileCardProps> = ({ file }) => {
  console.log(file, "file")
  return (
    <div className="border-[#F8F8F8] border-[2px] rounded-2xl py-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-[#F8F8F8] border-b-[2px] pb-3 px-2 md:px-4">
        <div className="flex items-center gap-3 max-md:w-full">
          <div className="sm:p-3 p-2 rounded-xl bg-conceptual flex items-center justify-center">
            <PdfIcon />
          </div>
          <div className="flex justify-between gap-5 w-full">
            <div>
              <h4 className="text-[13px] font-medium text-black font-montserrat">
                {file.fileName}
              </h4>
              <p className="text-[11px] text-gray">{file.filePath}</p>
            </div>
            <button className="rounded-lg bg-toxicLatte px-3 py-2 text-xs font-medium text-coolGreen">
              {file.status}
            </button>
          </div>
        </div>
        <div>
          <button className="flex justify-center items-center gap-2 text-black font-medium text-sm cursor-pointer">
            <DownloadIcon />
            Hämta fil
          </button>
        </div>
        <div className="flex justify-between md:justify-center items-center gap-4 md:gap-7 w-full md:w-fit">
          <Button variant='secondary' size="sm">
            Godkänn
          </Button>
          <Button variant='danger' size="sm">
            Avvisa
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 sm:gap-5 md:gap-8 pt-2 px-2 md:px-4">
        <h3 className="text-xs font-medium text-gray">{file.descrition}</h3>
        <button className="text-xs font-semibold text-primary cursor-pointer">Ändra</button>
      </div>
    </div>
  );
};

export default VerifyFileCard;
