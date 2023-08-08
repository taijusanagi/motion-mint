// pages/dashboard.tsx

import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { FaPlus } from "react-icons/fa"; // Assuming you have react-icons installed

const inter = Inter({ subsets: ["latin"] });

interface Motion {
  id: string;
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
    { id: "1", title: "Motion 1", status: "Converted", thumbnailUrl: "https://via.placeholder.com/400" },
    { id: "2", title: "Motion 2", status: "Pending Conversion", thumbnailUrl: "https://via.placeholder.com/400" },
  ];

  const earningsSummary = {
    totalEarnings: 100,
    pendingPayments: 20,
    recentSales: 50,
  };

  return (
    <div className={`min-h-screen flex flex-col bg-gradient-to-r from-green-100 to-blue-100 ${inter.className}`}>
      <Header {...headerState} />
      <main className="flex-1 mx-auto w-full max-w-2xl py-12 px-4 relative">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-default mb-2">Your Motion</h2>
          <p className="mb-4 text-xs text-accent">Created motions are displayed here.</p>
          <ul>
            {userMotions.map((motion, idx) => (
              <li
                key={idx}
                className="flex border p-4 rounded-md shadow-sm my-2 bg-default text-default cursor-pointer"
                onClick={() => {
                  router.push(`/motions/${motion.id}`);
                }}
              >
                <img src={motion.thumbnailUrl} alt={motion.title} className="w-32 h-18 rounded-md object-cover mr-4" />
                <div>
                  <h3 className="font-bold">{motion.title}</h3>
                  <p>Status: {motion.status}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-default mb-2">Earnings Summary</h2>
          <p className="mb-4 text-xs text-accent">Data is fetched from The Graph.</p>
          <div className="border p-4 rounded-md shadow-sm bg-default text-default">
            <p>Total Earnings: ${earningsSummary.totalEarnings.toFixed(2)}</p>
            <p>Pending Payments: ${earningsSummary.pendingPayments.toFixed(2)}</p>
            <p>Recent Sales: ${earningsSummary.recentSales.toFixed(2)}</p>
          </div>
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
