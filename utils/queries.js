export const allPostsQuery = () => {
  const query = `*[ _type == "post" ] | order( _createdAt desc) {
    _createdAt,
    _id,
    caption,
    video {
      asset -> {
        _id,
        url
      }
    },
    userId,
    likes,
    postedBy -> {
      _id,
      userName,
      image,
    },
    comments[] {
      comment,
      _key,
      postedBy -> {
        _id,
        userName,
        image
      }
    }
  }[0...10]`;

  return query;
};

export const topicQuery = (topic) => {
  const query = `*[ _type == "post" && topic match '${topic}*'] {
    _createdAt,
    _id,
    caption,
    video {
      asset -> {
        _id,
        url,
      },
    },
    userId,
    likes,
    postedBy -> {
      _id,
      userName,
      image,
    },
    comments[] {
      comment,
      _key,
      postedBy -> {
        _id,
        userName,
        image,
      },
    },
  }`
  return query;
};

export const videoDetailQuery = (id) => {
  const query = `*[ _type == "post" && _id == '${id}'] {
    _id,
    caption,
    video {
      asset -> {
        _id,
        url
      }
    },
    userId,
    postedBy -> {
      _id,
      userName,
      image
    },
    likes,
    comments[] {
      createdAt,
      comment,
      _key,
      postedBy,
    },
  }`;

  return query;
};

export const allUsersQuery = () => {
  const query = `*[ _type == "user"]`;
  return query;
};

export const singleUserQuery = (id) => {
  const query = `*[ _type == "user" && _id == "${id}"]`;
  return query; 
};

export const userCreatedPostsQuery = (userId) => {
  const query = `*[ _type == "post" && userId == "${userId}"] {
    _id,
    _createdAt,
    caption,
    video {
      asset -> {
        _id,
        url,
      },
    },
    userId,
    postedBy -> {
      _id,
      userName,
      image,
    },
    likes,
    comments[] {
      _key,
      createdAt,
      comment,
      postedBy -> {
        _id,
        userName,
        image,
      },
    },
  }`;

  return query;
};

export const userLikedPostsQuery = (userId) => {
  const query = `*[ _type == "post" && "${userId}" in likes[]._ref] {
    _id,
    _createdAt,
    caption,
    videos  {
      asset -> {
        _id,
        url,
      },
    },
    userId,
    postedBy -> {
      _id,
      userName,
      image,
    },
    likes,
    comments[] {
      _key,
      createdAt,
      comment,
      postedBy -> {
        _id,
        userName,
        image,
      },
    },
  }`;

  return query;
};

export const searchQuery = (searchTerm) => {
  const query = `*[ _type == "post" && caption match "${searchTerm}*" || topic match "${searchTerm}*"] {
    _id,
    _createdAt,
    caption,
    video {
      asset -> {
        _id,
        url,
      },
    },
    postedBy -> {
      _id,
      userName,
      image,
    },
    likes,
    comments[] {
      _key,
      comment,
      postedBy -> {
        _id,
        userName,
        image,
      },
    },
  }[0...10]`;

  return query;
  
} 



