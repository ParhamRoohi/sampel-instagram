
import React from "react";
import { useParams } from "react-router-dom";
import PostDetail from "../components/post/PostDetail";

function Post() {
  const { id } = useParams();

  return (
    <div className="user">
      <PostDetail id={id} />
    </div>
  );
}

export default Post;
