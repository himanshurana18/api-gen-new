import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function ContentManager() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/models");

      if (response.data && response.data.length > 0) {
        const sortedModels = response.data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        router.push(`/manager/${sortedModels[0].name.toLowerCase()}`);
      } else {
        // If no models exist, redirect to builder
        router.push("/builder");
      }
    } catch (error) {
      console.error("Model fetch failed:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h1>Content Manager</h1>
      <p>No models found. Please create a model first.</p>
    </div>
  );
}