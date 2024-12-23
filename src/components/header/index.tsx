import Image from "next/image";

import { useRouter } from "next/navigation";
import { logoutUser } from "@/app/api/auth/logout";
import { AddIcon, LogoutIcon } from "../../../public";

export default function Header() {
  const router = useRouter();

  return (
    <div className="flex justify-between my-80">
      <div className="flex items-center gap-12">
        <h2 className="text-heading-3 font-semibold font-montserrat text-textColor text-center">
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
