import axios from "axios";

export const apiServerUrl = "https://service.deepmotion.com";

const credentials = {
  clientId: process.env.DEEP_MOTION_CLIENT_ID,
  clientSecret: process.env.DEEP_MOTION_CLIENT_SECRET,
};

export async function getSession() {
  const authUrl = `${apiServerUrl}/session/auth`;

  // Encode the credentials as required
  const credentialsBase64 = Buffer.from(`${credentials.clientId}:${credentials.clientSecret}`).toString("base64");

  try {
    const response = await axios.get(authUrl, {
      headers: {
        Authorization: `Basic ${credentialsBase64}`,
      },
    });

    if (response.status === 200) {
      // Extracting the 'dmsess' cookie
      const setCookieHeader = response.headers["set-cookie"];
      const dmsessCookie = setCookieHeader && setCookieHeader[0].split(";")[0];

      if (dmsessCookie && dmsessCookie.startsWith("dmsess=")) {
        // Return the axios instance with the authenticated cookie set up
        return axios.create({
          headers: {
            cookie: dmsessCookie,
          },
        });
      } else {
        console.error("Failed to extract the dmsess cookie");
      }
    } else {
      console.error("Failed to authenticate", response.status);
    }
  } catch (error) {
    console.error("Error while authenticating:", error);
  }
}
