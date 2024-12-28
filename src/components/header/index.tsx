import Image from "next/image"; // Importing Image component from Next.js

import { useRouter } from "next/navigation"; // Importing useRouter for navigation
import { logoutUser } from "@/app/api/auth/logout"; // Importing logout function
import { AddIcon, LogoutIcon } from "../../../public"; // Importing icons
import { useEffect, useState } from "react"; // Importing React hooks

// Main Header component
export default function Header() {
  const router = useRouter(); // Initializing router for navigation
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // State to track window width

  // Effect to handle window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth); // Update state on resize
    window.addEventListener("resize", handleResize); // Add event listener for resize

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize); // Remove listener
  }, []);

  return (
    <div className="flex justify-between my-80 sm:my-120">
      {/* Main container with flex layout */}
      <div className="flex items-center gap-12 sm:gap-16">
        {/* Container for title and add button */}
        <h2 className="text-heading-3 sm:text-heading-2 font-semibold font-montserrat text-textColor text-center">
          My Movies {/* Title of the header */}
        </h2>
        <button onClick={() => router.push("/add-movie")}>
          {/* Button to navigate to add movie page */}
          <Image
            src={AddIcon} // Source for the add icon
            alt="Add Icon" // Alt text for accessibility
            width={windowWidth > 640 ? 26 : 20} // Dynamic width based on window size
            height={windowWidth > 640 ? 26 : 20} // Dynamic height based on window size
          />
        </button>
      </div>
      <div
        className="flex items-center gap-3 cursor-pointer" // Container for logout functionality
        onClick={logoutUser} // Logout on click
      >
        {windowWidth > 640 && ( // Conditional rendering based on window width
          <p className="text-body-regular font-bold text-textColor font-montserrat">
            Logout {/* Logout text */}
          </p>
        )}
        <button onClick={logoutUser}>
          {/* Button to logout */}
          <Image src={LogoutIcon} alt="Logout Icon" width={18} height={18} />
          {/* Logout icon */}
        </button>
      </div>
    </div>
  );
}
