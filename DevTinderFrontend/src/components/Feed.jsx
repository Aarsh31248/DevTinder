import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constant";
import { useEffect } from "react";
const Feed = () => {
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data));
    } catch (err) {
      console.log("ERROR:", err.response?.data);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return <div></div>;
};

export default Feed;
