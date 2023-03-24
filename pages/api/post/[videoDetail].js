import { uuid } from 'uuidv4';

import { client } from '../../../utils/client';
import { videoDetailQuery } from '../../../utils/queries';

export default async function handler(req, res)  {
  if (req.method === 'GET') {
    const { videoDetail } = req.query;
    const response = videoDetailQuery(videoDetail);
    const data = await client.fetch(response);

    res.status(200).json(data[0]);
  }  else if (req.method === "PUT") {
    const { _id, userId,  comment, createdAt } = req.body;

    const data = await client
      .patch(_id)
      .setIfMissing({ comments: [] })
      .insert('after', 'comments[-1]', [
        {
          comment,
          _key: uuid(),
          createdAt,
          postedBy: {
            _type: 'postedBy', 
            _ref: userId,
          },
        }
      ])
      .commit();

      res.status(200).json(data);
  }
};

