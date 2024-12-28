import { auth } from "@/lib/firebase";
import { notifyError } from "@/utility/helper";
import { signOut } from "firebase/auth";
import { redirect } from "next/navigation";

export const logoutUser = () => {
  // Attempt to sign out the user from Firebase authentication
  signOut(auth)
    .then(() => {
      // Redirect the user to the sign-in page upon successful logout
      redirect("/signin");
    })
    .catch((error) => {
      // Notify the user of any errors that occur during the logout process
      notifyError(error || "Error while logging out the user.");
    });
};
