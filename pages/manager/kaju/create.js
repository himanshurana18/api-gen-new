import { useState } from "react";
import { useRouter } from "next/router";

export default function CreateKaju() {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Add your create logic here
      router.push("/manager/kaju");
    } catch (error) {
      console.error("Error creating item:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create New Kaju</h1>
      <form onSubmit={handleSubmit}>
        {/* Add your form fields here */}
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
}