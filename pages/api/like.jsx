import { uuid } from 'uuidv4';

import { client } from '../../utils/client'; 

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { userId, _id, like } = req.body;
    
    const data = 
    like ? await client
      .patch(_id)
      .setIfMissing({ likes : [] })
      .insert('after', 'likes[-1]', [
        {
          _key : uuid(),
          _ref : userId,
        },
      ])
      .commit()
    : await client
      .patch(_id)
      .unset([`likes[_ref=="${userId}"]`])
      .commit();
    
      res.status(200).json(data);
  }  else if (req.method === "GET") {


    res.status(200).json({message : "you don't know" });
  };
}