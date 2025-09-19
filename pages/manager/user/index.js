import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function ContentManager() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchModels(); // component mount pe models fetch karo
  }, []);

  const fetchModels = async () => {
    try {
      setLoading(true); // loading state true kar do
      const response = await axios.get("/api/models");

      // agar data mila toh usko sort karo by createdAt (latest first)
      if (response.data && response.data.length > 0) {
        const sortedModels = response.data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        // sabse latest model pe redirect kar do
        router.push(`/manager/${sortedModels[0].name}`);
      }
    } catch (error) {
      console.error("Model fetch failed:", error); // error log karo for debugging

      setLoading(false); // loading khatam
    }
  };
  if (loading) {
    return <LoadingSpinner />;
  }
}
