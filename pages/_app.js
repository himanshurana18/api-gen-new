// // pages/_app.js
// import Aside from "@/components/Aside";
// import CheckingSession from "@/components/Checkingsession";
// import { useRouter } from "next/router";
// import "@/styles/globals.css"; // agar tum CSS use kar rahe ho
// import { SessionProvider } from "next-auth/react";
// import { RestartProvider } from "@/context/RestartContext";
// import { Bounce, ToastContainer } from "react-toastify";
// function MyApp({ Component, pageProps: { session, ...pageProps } }) {
//   const router = useRouter();
//   const isAuthPage = ["/auth/signin", "/auth/signup"].includes(router.pathname);

//   const isContainerNeeded = !isAuthPage;

//   return (
//     <>
//       <SessionProvider session={session}>
//         <RestartProvider>
//           <Aside />
//           <main className={isContainerNeeded ? "container" : "container close"}>
//             <CheckingSession enabled={!isAuthPage}>
//               <Component {...pageProps} />
//             </CheckingSession>
//           </main>
//         </RestartProvider>
//       </SessionProvider>
//       <ToastContainer
//         position="bottom-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick={false}
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//         transition={Bounce}
//       />
//     </>
//   );
// }

// export default MyApp;
// pages/_app.js
import Aside from "@/components/Aside";
import CheckingSession from "@/components/Checkingsession";
import { useRouter } from "next/router";
import "@/styles/globals.css"; // agar tum CSS use kar rahe ho
import { SessionProvider } from "next-auth/react";
import { RestartProvider } from "@/context/RestartContext";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  const isAuthPage = ["/auth/signin", "/auth/signup"].includes(router.pathname);

  const isContainerNeeded = !isAuthPage;

  return (
    <>
      <SessionProvider session={session}>
        <RestartProvider>
          <Aside />
          <main className={isContainerNeeded ? "container" : "container close"}>
            <CheckingSession enabled={!isAuthPage}>
              <Component {...pageProps} />
            </CheckingSession>
          </main>
        </RestartProvider>
      </SessionProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default MyApp;
