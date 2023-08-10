import React, { Suspense, useEffect, useRef, useState } from "react";
import { AnimationMixer, Box3, Vector3 } from "three";
import { Canvas, useFrame } from "@react-three/fiber";

import JSZip from "jszip";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OrbitControls, useFBX, PerspectiveCamera } from "@react-three/drei";

async function fetchAndUnzipFBX(zipUrl: string) {
  const response = await fetch(zipUrl);
  const zipBlob = await response.blob();
  const zip = await JSZip.loadAsync(zipBlob);
  let fbxBlob;
  zip.forEach((relativePath, zipEntry) => {
    if (relativePath.endsWith(".fbx")) {
      fbxBlob = zipEntry.async("blob");
    }
  });

  if (!fbxBlob) {
    throw new Error("No FBX file found in the ZIP.");
  }

  const blobURL = URL.createObjectURL(await fbxBlob);
  return blobURL;
}

function Model({ url }: { url: string }) {
  const fbx = useFBX(url);
  const mixer = useRef<AnimationMixer | null>(null);
  const boundingBox = new Box3().setFromObject(fbx);

  const center = new Vector3();
  boundingBox.getCenter(center);
  // fbx.position.set(-center.x, -center.y, -center.z);
  useEffect(() => {
    mixer.current = new AnimationMixer(fbx);
    fbx.animations.forEach((clip) => {
      mixer.current?.clipAction(clip).play();
    });

    return () => {
      // Stop the animation when component unmounts
      mixer.current?.stopAllAction();
    };
  }, [fbx]);

  useFrame((_, delta) => mixer.current?.update(delta));

  return <primitive object={fbx} scale={0.035} position={[0, -2.5, 0]} />;
}

function FBXPreview({ zipUrl }: { zipUrl: string }) {
  const [fbxUrl, setFbxUrl] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const unzippedFBXUrl = await fetchAndUnzipFBX(zipUrl);
        setFbxUrl(unzippedFBXUrl);
      } catch (error) {
        console.error("Error unzipping and fetching FBX:", error);
      }
    })();
  }, [zipUrl]);

  return (
    <Canvas style={{ background: "gray" }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>{fbxUrl && <Model url={fbxUrl} />}</Suspense>
      <OrbitControls />
    </Canvas>
  );
}

export default FBXPreview;
