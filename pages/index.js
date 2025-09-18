import LoadingSpinner from "@/components/LoadingSpinner";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Admin Panel</title>
        <meta
          name="description"
          content="Admin Panel for managing the application"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoadingSpinner />
    </>
  );
}
