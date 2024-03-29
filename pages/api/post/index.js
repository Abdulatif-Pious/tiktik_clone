
import { client } from '../../../utils/client';
import { allPostsQuery } from '../../../utils/queries';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const query = allPostsQuery();
    const data = await client.fetch(query);

    res.status(200).json(data);
  }
  else if (req.method === 'POST') {
    const doc = await req.body;

    client.create(doc).then(() => {
      res.status(201).json('video created');
    });
  }
}