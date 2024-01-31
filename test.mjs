import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const key = process.env.SECRET_KEY;
const data = {
  sub: '65bad360d1e12f4fd32acf86',
  name: 'Erik Hernandez',
  meta: {
    r: ['STUDENT', 'MENTOR', 'MANAGER'],
    scid: '65bac142b8ef4d3dea10863',
  },
  iat: 1706704144,
};
const token = jwt.sign(data, key);
