import axios from "axios";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";

export default function KajuManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      // Add your fetch logic here
      setItems([]);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Kaju Manager</h1>
      <Link href="/manager/kaju/create">
        <button>
          <FaPlus /> Add New
        </button>
      </Link>
      {/* Add your content here */}
    </div>
  );
}
