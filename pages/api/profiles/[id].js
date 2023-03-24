
import { client } from '../../../utils/client';
import { singleUserQuery, userCreatedPostsQuery, userLikedPostsQuery } from '../../../utils/queries';

export default async function handler (req, res) {
  const { id } = req.query;

  const user = await client.fetch(singleUserQuery(id));
  const userPosts = await client.fetch(userCreatedPostsQuery(id));
  const userLikedPosts = await client.fetch(userLikedPostsQuery(id));

  const data = {
    user : user[0],
    userPosts,
    userLikedPosts,
  }

  res.status(200).json(data);
};