import React from "react";
import { useParams } from "react-router-dom";
import Post_detail from "../components/post/Post-detail";

function Post() {
  const { id } = useParams();

  return (
    <>
      <div className="user">
        <Post_detail id={id} />
      </div>
    </>
  );
}

export default Post;
