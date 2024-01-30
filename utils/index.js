import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const BASE_URL = "https://abdulatif-tiktik-clone.vercel.app";

export const createOrGetUser = async (response, addUser) => {
  const decoded = jwt_decode(response.credential);

  const { name, picture, sub } = decoded;

  const user = {
    _type: "user",
    _id : sub,
    userName : name,
    image : picture
  };

  addUser(user);

  await axios.post(`${BASE_URL}/api/auth`, user);
};