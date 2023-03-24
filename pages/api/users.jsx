
import { client } from '../../utils/client'
import { allUsersQuery } from '../../utils/queries';

export default async function handler(req, res) {
  if (req.method === "GET") {
    const query = allUsersQuery();
    const data = await client.fetch(query);

    res.status(200).json(data);
  }
}