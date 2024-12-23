import Image from "next/image";

import { useRouter } from "next/navigation";
import { logoutUser } from "@/app/api/auth/logout";
import { AddIcon, LogoutIcon } from "../../../public";

export default function Header() {
  const router = useRouter();

  return (
    <div className="flex justify-between mt-20 sm:mt-0 mb-20 sm:mb-0">
      <div className="flex items-center gap-3">
        <h2 className="text-[32px] leading-10 sm:text-5xl font-semibold sm:leading-[56px] text-center">
          My Movies
        </h2>
        <button onClick={() => router.push("/add-movie")}>
          <Image src={AddIcon} alt="Add Icon" width={20} height={20} />
        </button>
      </div>
      <div className="flex items-center gap-3">
        <p className="text-base font-bold leading-6 hidden sm:visible">
          Logout
        </p>
        <button onClick={logoutUser}>
          <Image src={LogoutIcon} alt="Logout Icon" width={18} height={18} />
        </button>
      </div>
    </div>
  );
}
