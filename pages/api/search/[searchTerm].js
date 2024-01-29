
import { client } from '../../../utils/client';
import { searchQuery } from '../../../utils/queries';

export default async function  handler (req, res) {
  if (req.method === "GET") {
    const { searchTerm } = await req.query;
    const data = await client.fetch(searchQuery(searchTerm));
    
    res.status(200).json(data);
  }
}