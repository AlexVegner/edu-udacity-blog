import React from 'react';

const PostDetail = ({ match }) => {
  const params = match.params;
  console.log(params);
  return (
    <h1>
      Post '{params.post_id}' of category '{params.category}' in future
      versions.
    </h1>
  );
};

export default PostDetail;
