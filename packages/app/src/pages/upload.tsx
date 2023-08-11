// pages/upload.tsx

import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Button from "@/components/Button";
import Checkbox from "@/components/CheckBox";
import { IDKitWidget } from "@worldcoin/idkit";
import { NFTStorage, File } from "nft.storage";
import { NFT_STORAGE_API_KEY } from "@/config";

const client = new NFTStorage({ token: NFT_STORAGE_API_KEY });

const inter = Inter({ subsets: ["latin"] });

const UploadAndConversion: React.FC = () => {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [motion, setMotion] = useState<any | null>(null);
  const [jobId, setJobId] = useState("");
  const [cid, setCid] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [worldIdAttestation, setWorldIdAttestation] = useState();
  const [isChecked, setIsChecked] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [elapsedTime, setElapsedTime] = useState("0h 0m 0s");

  function formatElapsedTime(milliseconds: number) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];

    if (selectedFile) {
      if (selectedFile.type !== "video/mp4") {
        alert("Please upload an mp4 file.");
        event.target.value = ""; // Clear the file input
        setFile(null);
        return;
      }

      if (selectedFile.size > 1000000) {
        // 1MB in bytes
        alert("Please upload a file less than 1MB.");
        event.target.value = ""; // Clear the file input
        setFile(null);
        return;
      }

      // Continue processing the file...

      setFile(selectedFile);
    }
  };

  const handleConvertClick = async () => {
    if (file) {
      setIsLoading(true);
      setProgress(0);
      if (!file) {
        return;
      }
      const startTime = new Date().getTime();
      const formData = new FormData();
      formData.append("video", file);

      // const createJobResponse = await fetch("/api/createJob", {
      //   method: "POST",
      //   body: formData,
      // });
      // if (createJobResponse.status !== 200) {
      //   alert(createJobResponse.statusText);
      //   return;
      // }

      // const createJobData = await createJobResponse.json();
      // const { jobId } = createJobData;
      const jobId = "vuhAYMPbSTcfAtm8NopRGj";
      setJobId(jobId);

      const intervalId = setInterval(async () => {
        const currentTime = new Date().getTime();
        const elapsedMillis = currentTime - startTime;
        setElapsedTime(formatElapsedTime(elapsedMillis));

        const downloadResponse = await fetch("/api/download", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ jobId: jobId }),
        });
        setProgress((prevProgress) => {
          let newProgress = prevProgress + 2.5;
          if (newProgress > 100) {
            newProgress = 100;
          }
          return newProgress;
        });

        if (downloadResponse.status === 200) {
          // Once we get a 200 status, clear the interval and proceed to the next process
          clearInterval(intervalId);

          const downloadData = await downloadResponse.json();
          console.log(downloadData);
          // Assuming 'setMotion' is a state setter, update it here or move to next process
          setMotion(downloadData.result);

          // Upload to NFT Storage
          const cid = await client.storeBlob(
            new Blob([
              JSON.stringify({
                name: "Motion",
                description: "Motion data",
                animation_url: downloadData.result.mp4,
                attributes: [
                  {
                    trait_type: "bvh",
                    value: downloadData.result.bvh,
                  },
                  {
                    trait_type: "fbx",
                    value: downloadData.result.fbx,
                  },
                ],
              }),
            ]),
          );
          setCid(cid);
          console.log(cid);
          setProgress(100);
          setIsLoading(false);
        }
      }, 5000); // Check every 5 seconds
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
        <h2 className="text-2xl font-bold text-default mb-1">Create Motion</h2>
        <p className="mb-4 text-xs text-accent">Mint your motion data from your video with AI and blockchain.</p>
        <div className="mb-4">
          <div className="border rounded-md bg-default text-default p-4">
            <h3 className="text-lg font-bold text-default mb-1">Upload Video File</h3>
            <p className="mb-4 text-xs text-accent">Only mp4 file less than 1MB is allowed to upload.</p>
            <input type="file" onChange={handleFileChange} ref={fileInputRef} />
          </div>
        </div>
        <div className="mb-4">
          <div className="border rounded-md bg-default text-default p-4">
            <h3 className="text-lg font-bold text-default mb-1">Terms</h3>
            <p className="mb-4 text-xs text-accent">Please accept the terms before using the app.</p>
            <p className="text-xs text-default mb-2">
              {`- You must follow all laws and respect third-party rights. Do not use our APIs for illegal activities or
              to infringe on others' rights.`}
            </p>
            <p className="text-xs text-default mb-6">
              {`- You're responsible for any Content you submit via our APIs. We aren't liable for your use of the Content
              but can review or remove it at our discretion.`}
            </p>
            <Checkbox label="I agree with the terms." onChange={setIsChecked} />
          </div>
        </div>
        <div className="flex justify-end mb-8">
          <Button
            label="Start Convert"
            onClick={handleConvertClick}
            disabled={!file || !isChecked || isLoading || motion}
          />
        </div>
        {(isLoading || motion) && (
          <div className="mb-4">
            <div className="border rounded-md bg-default text-default p-4">
              <h3 className="text-lg font-bold text-default mb-1">AI Conversion Progress</h3>
              <p className="mb-4 text-xs text-accent">Upload video, convert to motion with AI, upload to IPFS...</p>
              <div className="border rounded-md p-1 bg-white mb-4">
                <div style={{ width: `${progress}%` }} className="bg-primary h-2 rounded-md"></div>
              </div>
              <p className="text-xs text-default mb-1">Time: {elapsedTime}</p>
              <p className="text-xs text-default mb-1">=====================================</p>
              <p className="text-xs text-default mb-1">🕺 Uploading video ...</p>
              {jobId && <p className="text-xs text-default mb-1">🕺 Job ID created: {jobId} ...</p>}
              {jobId && <p className="text-xs text-default mb-1">🕺 Converting video to Motion ...</p>}
              {motion && <p className="text-xs text-default mb-1">🕺 Motion Converted ...</p>}
              {motion && <p className="text-xs text-default mb-1">🕺 Uploading to IPFS ...</p>}
              {cid && <p className="text-xs text-default mb-1">🕺 CID created: {cid} ...</p>}
              {cid && <p className="text-xs text-default mb-1">🕺 Generating preview ...</p>}
              {cid && <p className="text-xs text-default mb-1">🕺 Done!</p>}
            </div>
          </div>
        )}
        {cid && (
          <>
            <div className="mb-4">
              <div className="border rounded-md bg-default text-default p-4">
                <h3 className="text-lg font-bold text-default mb-1">Motion Preview </h3>
                <p className="mb-4 text-xs text-accent">This is mp4 preview, bvh and fbx are also created.</p>
                <section className="flex justify-center">
                  <video autoPlay muted loop className="background-video h-80 rounded-md shadow-sm">
                    <source src={motion.mp4} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </section>
              </div>
            </div>
            <div className="mb-4">
              <div className="border rounded-md bg-default text-default p-4">
                <h3 className="text-lg font-bold text-default mb-1">Attestation</h3>
                <p className="mb-4 text-xs text-accent">
                  Create attestation with cid to verify the content is created by the trusted issuer.
                </p>
                <p className="text-default text-xs mb-4">CID: {cid}</p>
                {!worldIdAttestation && (
                  <div className="flex justify-end">
                    <IDKitWidget
                      app_id="app_b2a3c336a98d489c29eb2ec29e787470"
                      action="attest"
                      signal={cid} // use cid as signal
                      onSuccess={(attestation: any) => setWorldIdAttestation(attestation)}
                    >
                      {({ open }) => <Button label="Attest with World ID" onClick={open} />}
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
                onClick={async () => {
                  const metadata = await client.store({
                    name: "Test",
                    description: "Test",
                    image: file,
                  } as any);
                  console.log(metadata.url);
                  // router.push(`/motions/${id}`);
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
