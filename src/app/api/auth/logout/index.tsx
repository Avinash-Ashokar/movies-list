import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { redirect } from "next/navigation";

export const logoutUser = () => {
  signOut(auth)
    .then(() => {
      redirect("/signin");
    })
    .catch((error) => {
      console.log(error);
    });
};
