import { NextApiRequest, NextApiResponse } from "next";
import { apiServerUrl, getSession } from "@/utils/deepmotion";
import path from "path";
interface ExtendedNextApiRequest extends NextApiRequest {
  jobId?: string;
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  const session = await getSession();
  if (!session) {
    return res.status(400).send("Session is invalid.");
  }

  const { jobId } = req.body;
  if (!jobId) {
    return res.status(400).send("Please provide a job ID.");
  }

  try {
    const jobListResponse = await session.get(`${apiServerUrl}/list/SUCCESS`, {
      withCredentials: true,
    });

    const jobList = jobListResponse.data.list;
    const jobExists = jobList.some((job: any) => job.rid === jobId);

    if (!jobExists) {
      return res.status(404).send("Job ID not found in the success list.");
    }

    // At this point, we have verified that the job ID exists in the successful jobs list.
    // You can then proceed with the download logic or other operations.
    const downloadResp = await session.get(`${apiServerUrl}/download/${jobId}`);
    const downloadData = downloadResp.data;
    const result = {} as any;
    if (downloadData.count > 0) {
      const urls = downloadData.links[0].urls;
      for (const fileUrl of urls) {
        if (fileUrl.name === "male-young") {
          for (const file of fileUrl.files) {
            for (const fileType of ["bvh", "fbx", "mp4"]) {
              if (file[fileType]) {
                result[fileType] = file[fileType];
              }
            }
          }
        }
      }
      return res.status(200).send({ result });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).send("Internal Server Error.");
  }
};

export default handler;
