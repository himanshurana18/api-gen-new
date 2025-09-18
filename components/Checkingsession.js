// import { useSession } from "next-auth/react";
// import { Children, use } from "react";
// import LoadingSpinner from "./LoadingSpinner";
// import { useRouter } from "next/router";
// import { useEffect } from "react";
// // Set to false to disable the session check

// export default function CheckingSession(children, enabled = true) {
//   const { status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (!enabled) return;
//     if (status === "authenticated") {
//       router.push("/auth/signin");
//     }
//   }, [status, router, enabled]);
//   if (enabled && status === "loading") {
//     return <LoadingSpinner />;
//   }

//   return <>{children}</>;
// }
import { useSession } from "next-auth/react";
import LoadingSpinner from "./LoadingSpinner";
import { useRouter } from "next/router";
import { useEffect } from "react";

// Set to false to disable the session check
export default function CheckingSession({ children, enabled = true }) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!enabled) return;
    if (status === "unauthenticated") {
      router.push("/auth/signin"); // ya redirect ke hisaab se sahi page
    }
  }, [status, router, enabled]);

  if (enabled && status === "loading") {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
}
