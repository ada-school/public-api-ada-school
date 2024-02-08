import jwt from "jsonwebtoken";

export const createToken = ({
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
  return jwt.sign(
    {
      sub: userId,
      name: name,
      meta: { r: roles, scid: schoolId },
    },
    "test-secret",
    { expiresIn: "1h" }
  );
};
