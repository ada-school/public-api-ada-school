/**
 * @license
 * Copyright 2024 Ada School
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import fetch from "node-fetch";
import { HTTPError } from "./HTTPError";
import { config } from "./config";

interface CheckTokenResponse {
  data: {
    checkApiKey: boolean;
  };
}

const isCheckTokenResponse = (data: unknown): data is CheckTokenResponse => {
  return (
    (data as CheckTokenResponse).data !== undefined &&
    (data as CheckTokenResponse).data.checkApiKey !== undefined
  );
};

export const checkStudentAPIToken = async (apiKey: string) => {
  const postData = JSON.stringify({
    query: `query { checkApiKey(apiKey: "${apiKey}") }`,
  });

  const response = await fetch(config.ADA_LXP_URL, {
    method: "POST",
    body: postData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.ADA_PUBLIC_API_KEY}`,
      Origin: "https://learn.ada-school.org",
    },
  });

  try {
    const data = await response.json();

    if (!isCheckTokenResponse(data)) {
      return false;
    }

    return data.data.checkApiKey;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Error checking token:", e);
    throw new HTTPError({ status: 500, message: "Internal server error" });
  }
};
