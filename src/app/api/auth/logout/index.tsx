import { auth } from "@/lib/firebase";
import { notifyError } from "@/utility/helper";
import { signOut } from "firebase/auth";
import { redirect } from "next/navigation";

export const logoutUser = () => {
  signOut(auth)
    .then(() => {
      redirect("/signin");
    })
    .catch((error) => {
      notifyError(error || "Error while logging out the user.");
    });
};
