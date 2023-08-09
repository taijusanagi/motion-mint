// pages/upload.tsx

import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { IDKitWidget } from "@worldcoin/idkit";

const inter = Inter({ subsets: ["latin"] });

const UploadAndConversion: React.FC = () => {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [motion, setMotion] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [worldIdAttestation, setWorldIdAttestation] = useState();

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
      <Header />
      <main className="flex-1 mx-auto w-full max-w-2xl py-12 px-4 relative">
        <h2 className="text-2xl font-bold text-default mb-2">Create Motion</h2>
        <p className="mb-4 text-xs text-accent">Please upload video to create and mint motion data with AI.</p>
        <div className="mb-4">
          <div className="border rounded-md bg-default text-default p-4">
            <h3 className="text-lg font-bold text-default mb-2">Upload Video File</h3>
            <input type="file" accept="video/*" onChange={handleFileChange} ref={fileInputRef} />
          </div>
        </div>
        <div className="flex justify-end mb-8">
          <Button label="Start Convert" onClick={handleConvertClick} disabled={!file || isLoading || motion} />
        </div>
        {isLoading && (
          <div className="mb-4">
            <h3 className="text-lg font-bold text-default mb-2">AI Conversion Progress</h3>
            <div className="border rounded-md p-1 bg-white">
              <div style={{ width: `${progress}%` }} className="bg-primary h-2 rounded-md"></div>
            </div>
          </div>
        )}
        {motion && (
          <>
            <div className="mb-4">
              <div className="border rounded-md bg-default text-default p-4">
                <h3 className="text-lg font-bold text-default mb-2">Motion Preview</h3>
                <p>Motion Data Preview Player Here</p>
              </div>
            </div>
            <div className="mb-4">
              <div className="border rounded-md bg-default text-default p-4">
                <h3 className="text-lg font-bold text-default mb-2">Attestation</h3>
                {!worldIdAttestation && (
                  <div className="flex justify-end">
                    <IDKitWidget
                      app_id="app_b2a3c336a98d489c29eb2ec29e787470"
                      action="attest"
                      signal="here goes contnet hash"
                      onSuccess={(attestation: any) => setWorldIdAttestation(attestation)}
                    >
                      {({ open }) => <Button label="Anonymous Attest with World ID" onClick={open} />}
                    </IDKitWidget>
                  </div>
                )}
                {worldIdAttestation && (
                  <>
                    <pre className="mb-4 border rounded-lg p-4 overflow-x-scroll min-w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 shadow-2xl text-xs text-white">
                      {JSON.stringify(worldIdAttestation, null, 2)}
                    </pre>
                    <div className="flex justify-end">
                      <Button label="Publish to EAS" />
                    </div>
                  </>
                )}
              </div>
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
