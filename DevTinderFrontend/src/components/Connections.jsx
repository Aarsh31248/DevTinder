import { BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    const res = await axios.get(BASE_URL + "/user/connections", {
      withCredentials: true,
    });
    dispatch(addConnections(res.data.data));
    try {
    } catch (error) {
      console.log(err);
      const errorMsg = err?.response?.data || "Something went wrong!";
      setError(errorMsg);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0)
    return <h1 className="flex justify-center my-10">No Connections Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-3xl">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, age, gender, photoUrl, about } =
          connection;

        return (
          <div
            key={_id}
            className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <div>
              <img
                src={photoUrl}
                alt="User Photo"
                className="w-20 h-20 rounded-full"
              />
            </div>

            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName + ", " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
