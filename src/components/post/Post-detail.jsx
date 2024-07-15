import { useState, useEffect } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import axios from "axios";
import styles from "./Post-detail.module.css";

function Post_detail({ id }) {
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState({ name: "", comment: "" });

  const getPost = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/data/${id}`);
      setPost(res.data);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComment((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedComments = [...post.comments, newComment];
      await axios.patch(`http://localhost:8000/data/${post.id}`, {
        comments: updatedComments,
      });
      setNewComment({ name: "", comment: "" });
      getPost();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  useEffect(() => {
    getPost();
    // eslint-disable-next-line
  }, []);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.detail}>
        <h3 className={styles.title}>{post.name}</h3>
        <img className={styles.image} src={`./../${post.image}`} alt="No Img" />
        <div className={styles.likeComment}>
          <span>
            <FavoriteBorderIcon /> {post.like}
          </span>
          <span>
            <ChatBubbleOutlineIcon /> {post.comments?.length}
          </span>
        </div>
        <p className={styles.caption}>Caption: {post.caption}</p>
      </div>
      <hr />
      <div className={styles.form}>
        <div className={styles.commentList}>
          {post.comments.map((item, index) => (
            <div key={index} className={styles.comment}>
              <span>Name: {item.name}</span>
              <hr />
              <span>Comment: {item.comment}</span>
            </div>
          ))}
        </div > 
        <hr />
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="name"
            value={newComment.name}
            onChange={handleInputChange}
            placeholder="Your name"
            required
            className={styles.input}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
          />
          <textarea
            name="comment"
            value={newComment.comment}
            onChange={handleInputChange}
            placeholder="Your comment"
            required
            className={styles.textarea}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
          ></textarea>
          <button type="submit" className={styles.button}>
            Add Comment
          </button>
        </form>
      </div>
    </div>
  );
}

export default Post_detail;
