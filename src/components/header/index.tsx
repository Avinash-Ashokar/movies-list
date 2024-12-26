import Image from "next/image";

import { useRouter } from "next/navigation";
import { logoutUser } from "@/app/api/auth/logout";
import { AddIcon, LogoutIcon } from "../../../public";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex justify-between my-80 sm:my-120">
      <div className="flex items-center gap-12 sm:gap-16">
        <h2 className="text-heading-3 sm:text-heading-2 font-semibold font-montserrat text-textColor text-center">
          My Movies
        </h2>
        <button onClick={() => router.push("/add-movie")}>
          <Image
            src={AddIcon}
            alt="Add Icon"
            width={windowWidth > 640 ? 26 : 20}
            height={windowWidth > 640 ? 26 : 20}
          />
        </button>
      </div>
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={logoutUser}
      >
        {windowWidth > 640 && (
          <p className="text-body-regular font-bold text-textColor font-montserrat">
            Logout
          </p>
        )}
        <button onClick={logoutUser}>
          <Image src={LogoutIcon} alt="Logout Icon" width={18} height={18} />
        </button>
      </div>
    </div>
  );
}
