import { auth, currentUser } from "@clerk/nextjs/server";
import { getMockJobs } from "../data/mockJobHistory";
import OmnigoFileUpload from "../components/OmnigoFileUpload";

export default async function Home() {
  const { userId } = await auth();
  const user = await currentUser();

  // Get the 3 most recent jobs
  const recentJobs = getMockJobs().slice(0, 3);

  return (
    <div className="flex flex-col">
      <OmnigoFileUpload />
    </div>
  );
}
