import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import multer from "multer";
import formidable, { IncomingForm } from "formidable";
import path from "path";
import fs from "fs";

import { apiServerUrl, getSession } from "@/utils/deepmotion";

export const config = {
  api: {
    bodyParser: false,
  },
};

interface ExtendedNextApiRequest extends NextApiRequest {
  files?: {
    video?: Express.Multer.File[];
  };
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  const session = await getSession();
  if (!session) {
    return res.status(400).send("Session is invalid.");
  }

  const form = new IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "Failed to parse form." });
    }
    const uploadedFile = files.video;
    if (!uploadedFile) {
      return res.status(400).send("No file uploaded.");
    }
    let vFile: formidable.File;
    if (Array.isArray(files.video)) {
      // If multiple files were uploaded, take the first one.
      // Adjust as needed based on your use case.
      vFile = files.video[0];
    } else {
      vFile = files.video;
    }
    const headerContent = {
      "Content-length": vFile.size.toString(),
      "Content-type": vFile.mimetype,
    };
    if (!vFile.originalFilename) {
      return res.status(400).send("Uploaded file does not have a name.");
    }
    const vName = vFile.originalFilename.split(".")[0];
    const uploadUrl = `${apiServerUrl}/upload?name=${vName}&resumable=0`;

    try {
      const resp = await session.get(uploadUrl);
      if (resp.status === 200) {
        const gcsUrl = resp.data.url;
        const fileData = await fs.promises.readFile(vFile.filepath);
        const headerContent = {
          "Content-length": fileData.length.toString(),
          "Content-type": vFile.mimetype,
        };
        const uploadResp = await session.put(gcsUrl, fileData, {
          headers: headerContent,
        });
        if (uploadResp.status === 200) {
          console.log("File successfully uploaded.");
          const processCfgJson = {
            url: gcsUrl,
            processor: "video2anim",
            params: ["config=configDefault", "formats=bvh,fbx,mp4"],
          };
          const processUrl = `${apiServerUrl}/process`;
          try {
            const processResp = await session.post(processUrl, processCfgJson);
            if (processResp.status === 200) {
              const pRespJson = processResp.data;
              const jobId = pRespJson["rid"];
              console.log("Job is processing:", jobId);
              return res.send({ jobId });
            } else {
              console.error(processResp.status, "Failed to process");
            }
          } catch (error) {
            console.error("Error during processing:", error);
          }
        } else {
          console.error("Failed to upload the file:", uploadResp.status);
        }
      } else {
        console.error("Failed to get upload URL", resp.status);
      }
    } catch (error) {
      console.error("Error during upload:", error);
    }
    return res.send({ error: "error" });
  });
};

export default handler;
