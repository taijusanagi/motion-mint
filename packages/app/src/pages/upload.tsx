// pages/upload.tsx

import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Button from "@/components/Button";

const inter = Inter({ subsets: ["latin"] });

const UploadAndConversion: React.FC = () => {
  const router = useRouter();
  const headerState = {
    isConnected: true,
    userAddress: "0x1234...abcd",
  };

  const [file, setFile] = useState<File | null>(null);
  const [motion, setMotion] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleConvertClick = () => {
    if (file) {
      setIsLoading(true);
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            setIsLoading(false);
            setMotion({});
            return 100;
          }
          return prevProgress + 10;
        });
      }, 500);
    }
  };

  const handleCancelClick = () => {
    setFile(null);
    setMotion(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-gradient-to-r from-green-100 to-blue-100 ${inter.className}`}>
      <Header {...headerState} />
      <main className="flex-1 mx-auto w-full max-w-2xl py-12 px-4 relative">
        <p className="mb-4 text-xs text-accent">
          Please upload video contains motion to create and mint motion data with AI.
        </p>
        <div className="mb-4">
          <label className="block text-default mb-2">Upload Video File</label>
          <input
            type="file"
            accept="video/*"
            className="border rounded-md p-2 w-full bg-default text-default"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
        </div>
        <div className="flex justify-end mb-8">
          <Button label="Start Convert" onClick={handleConvertClick} disabled={!file || isLoading || motion} />
        </div>
        {isLoading && (
          <div className="mb-4">
            <label className="block text-default mb-2">AI Conversion Progress</label>
            <div className="border rounded-md p-1 bg-white">
              <div style={{ width: `${progress}%` }} className="bg-primary h-2 rounded-md"></div>
            </div>
          </div>
        )}
        {motion && (
          <>
            <div className="mb-4">
              <div className="border rounded-md bg-default text-default p-4">Motion Data Preview Player Here</div>
            </div>
            <div className="flex justify-end gap-2">
              <Button label="Cancel" onClick={handleCancelClick} type="secondary" />
              <Button
                label="Mint"
                onClick={() => {
                  const id = "1234";
                  router.push(`/motions/${id}`);
                }}
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default UploadAndConversion;
