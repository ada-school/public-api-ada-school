import { CompactEncrypt, importSPKI, KeyLike } from "jose";
import jwt from "jsonwebtoken";

const publicKeyJweTest = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzR6gLIixIt+nWP+L73j1
vex0ia4t0EsSzRHB/flV0de6oNPVsEGJP+kfikSWIkWDnaRngtJvXH9IGvOe/owM
CTZSCPGSX0mfQJZJfy/DcnqItzViUjAFmioaEPSex04Wj6VuchtdiwFDlAj+dYEH
szyrwu8mQfzp/RbYBGVul1Ei7452JCjDHqbYsbQ9yL7/IHiSXrIYzdqhJGkXjZQ0
I4jkMOvbNt9K0EB+09bZ5UJu28o5ztCGssHzODz8Q2+YdghSdTScCiohWNBYgoqo
CbH87JTP9phhPD5+vHzCW3JE+UkhR+AmQJ4yzdE8JxyiZkwiy7uUz2i78T/xlPGn
WwIDAQAB
-----END PUBLIC KEY-----`;

let publicKey: KeyLike;

importSPKI(publicKeyJweTest, "RS256")
  .then((key) => {
    publicKey = key;
  })
  .catch((error) => {
    /* eslint-disable no-console */
    console.error(" jwtUtils: Failed import", error);
    throw error;
  });

export const encryptJwt = async (token: string): Promise<string> => {
  try {
    const jwe = await new CompactEncrypt(
      new TextEncoder().encode(JSON.stringify(token))
    )
      .setProtectedHeader({ alg: "RSA-OAEP-256", enc: "A256GCM" })
      .encrypt(publicKey);
    return jwe;
  } catch (_error) {
    throw new Error("Failed to encrypt");
  }
};

export const createToken = async ({
  userId,
  name = "test-user",
  roles = ["STUDENT"],
  schoolId = "school-id",
}: {
  userId: string;
  name?: string;
  roles?: Array<string>;
  schoolId?: string;
}) => {
  const token = jwt.sign(
    {
      sub: userId,
      name: name,
      meta: { r: roles, scid: schoolId },
    },
    "test-secret",
    { expiresIn: "1h" }
  );

  return await encryptJwt(token);
};
