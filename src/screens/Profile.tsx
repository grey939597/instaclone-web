import { useParams } from "react-router-dom";

interface IParams {
  username: string;
}

const Profile = () => {
  const { username }: IParams = useParams();
  return <h1>{username}</h1>;
};

export default Profile;
