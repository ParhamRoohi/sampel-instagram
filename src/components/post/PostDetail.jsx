import { useState, useEffect } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import axios from "axios";

function PostDetail({ id }) {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/data/${id}`);
        setPost(res.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    getPost();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h3>{post.name}</h3>
        <img src={`./../${post.image}`} alt="No Img" />
        <div className="like-comment">
          <span>
            <FavoriteBorderIcon /> {post.like}
          </span>
          <span>
            <ChatBubbleOutlineIcon /> {post.comments.length}
          </span>
          {post.comments.map((item) => (
            <div>
              <span> Name: {item.name}</span>
              <hr />
              <span> Comment: {item.comment}</span>
            </div>
          ))}
        </div>
        <hr />
        <p>Caption: {post.caption}</p>
      </div>
    </>
  );
}

export default PostDetail;
