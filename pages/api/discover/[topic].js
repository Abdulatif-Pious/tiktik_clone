import { topicQuery } from '../../../utils/queries';
import { client } from '../../../utils/client';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { topic } = await req.query;
    const response = topicQuery(topic);
    const data = await client.fetch(response);

    res.status(200).json(data);
  }
}

