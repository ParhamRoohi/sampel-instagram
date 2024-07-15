import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
function Home() {
  const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);
  const getData = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/data`);
      setData(res.data);
      //   setLoading(false);
    } catch (error) {
      console.log(error);
      //   setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="container">
      {data.map((item) => (
        <Link to={`/post/${item.id}`} key={item.id}>
          <h3>{item.name}</h3>
          <img src={item.image} alt="No Img" />
          <div className="like-comment">
            <span>
              <FavoriteBorderIcon /> {item.like}
            </span>
            <span>
              <ChatBubbleOutlineIcon /> {item.comments.length}
            </span>
          </div>
          <hr />
        </Link>
      ))}
    </div>
  );
}

export default Home;
