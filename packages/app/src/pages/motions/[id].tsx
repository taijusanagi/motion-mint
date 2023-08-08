import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Button from "@/components/Button";

const inter = Inter({ subsets: ["latin"] });

const MotionDataDetail: React.FC = () => {
  const headerState = {
    isConnected: true,
    userAddress: "0x1234...abcd",
  };

  const isCreator = true;

  return (
    <div className={`min-h-screen flex flex-col ${inter.className}`}>
      <Header {...headerState} />
      <main className="flex-1 mx-auto w-full max-w-2xl py-12 px-4 relative">
        <h2 className="text-2xl font-bold text-default mb-2">Motion Detail</h2>
        <p className="mb-4 text-xs text-accent">Motion detail is displayed.</p>
        <div className="border rounded-md shadow-sm p-4 mb-6">Motion Data Preview Player Here</div>
        <div className="border rounded-md shadow-sm p-4 mb-6">
          <h3 className="text-default font-bold mb-2">Price and Licensing Details:</h3>
          <p>Price: 0.1 ETH</p>
          <p>Licensing: XYZ</p>
        </div>
        {isCreator ? (
          <div className="mb-6 flex justify-end">
            <Button label="List for Sale" /* onClick={} */ />
          </div>
        ) : (
          <>
            <div className="mb-6 flex justify-end">
              <Button label="Purchase" /* onClick={} */ />
            </div>
            <div className="border rounded-md shadow-sm p-4 mb-6">
              <h3 className="text-accent font-bold mb-2">Thank you for your purchase!</h3>
              <a href="#" className="underline">
                Access Link
              </a>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default MotionDataDetail;
