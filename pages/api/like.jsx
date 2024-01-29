import { uuid } from 'uuidv4';

import { client } from '../../utils/client'; 

export default async function handler(req, res) {
  try {
    if (req.method === "PUT") {
    const { userId, _id, like } = await req.body;
    
    if (!userId.length || !_id.length) {
      return res.status(204).json("missing required fields");
    }

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
    }  
  } catch (error) {
    res.status(500).json(["LIKE_PUT_ERROR: ", error]);
  }
  
}