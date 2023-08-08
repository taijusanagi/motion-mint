// pages/dashboard.tsx

import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { FaPlus } from "react-icons/fa"; // Assuming you have react-icons installed

const inter = Inter({ subsets: ["latin"] });

interface Motion {
  title: string;
  status: "Pending Conversion" | "Converted" | "Listed for Sale";
  thumbnailUrl: string; // Assuming each motion data has a thumbnail
}

export default function Dashboard() {
  const router = useRouter();
  const headerState = {
    isConnected: true,
    userAddress: "0x1234...abcd",
  };

  const userMotions: Motion[] = [
    { title: "Motion 1", status: "Converted", thumbnailUrl: "https://via.placeholder.com/400" },
    { title: "Motion 2", status: "Pending Conversion", thumbnailUrl: "https://via.placeholder.com/400" },
  ];

  return (
    <div className={`min-h-screen flex flex-col ${inter.className}`}>
      <Header {...headerState} />
      <main className="flex-1 mx-auto w-full max-w-2xl py-12 px-4 relative">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-default mb-4">Your Motion</h2>
          <ul>
            {userMotions.map((motion, idx) => (
              <li key={idx} className="flex border p-4 rounded-md shadow-sm my-2 bg-default text-default">
                <img src={motion.thumbnailUrl} alt={motion.title} className="w-32 h-18 rounded-md object-cover mr-4" />
                <div>
                  <h3 className="font-bold">{motion.title}</h3>
                  <p>Status: {motion.status}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
        <Button
          label={<FaPlus />}
          className="bg-primary text-white rounded-full shadow-sm p-4 hover:bg-accent transition-colors duration-200 fixed bottom-8 right-8"
          onClick={() => {
            router.push("/upload");
          }}
        />
      </main>
    </div>
  );
}
