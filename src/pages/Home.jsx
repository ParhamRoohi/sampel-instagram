import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
function Home() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/data`);
      setData(res.data);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container">
      {data.map((item) => (
        <div>
          <h3>{item.name}</h3>
          <img src={item.image} alt="No Img" />
          <div className="like-comment">
            <span>
              <FavoriteBorderIcon /> {item.like}
            </span>
            <Link to={`/post/${item.id}`} key={item.id}>
              <span>
                <ChatBubbleOutlineIcon /> {item.comments.length}
              </span>
            </Link>
          </div>
          <hr />
          <p className={item.caption}>Caption: {item.caption}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
