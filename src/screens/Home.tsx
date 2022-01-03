import { gql, useQuery } from "@apollo/client";
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { logUserOut } from "../apollo";
import Avatar from "../components/Avatar";
import { FatText } from "../components/shared";
import {
  seeFeed,
  seeFeed_seeFeed,
  seeFeed_seeFeed_user,
} from "../__generated__/seeFeed";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      user {
        username
        avatar
      }
      file
      caption
      likes
      comments
      createdAt
      isMine
    }
  }
`;

const PhotoContainer = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 20px;
  max-width: 615px;
`;

const PhotoHeader = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
`;

const Username = styled(FatText)`
  margin-left: 15px;
`;

const PhotoFile = styled.img`
  min-width: 100%;
`;

const PhotoData = styled.div`
  padding: 16px;
`;

const PhotoActions = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
  }
`;
const PhotoAction = styled.div`
  margin-right: 10px;
`;
const Likes = styled(FatText)`
  margin-top: 15px;
  display: block;
`;

const Home = () => {
  const { data } = useQuery(FEED_QUERY);
  console.log(data);
  return (
    <div>
      {data?.seeFeed?.map((photo: seeFeed_seeFeed) => (
        <PhotoContainer>
          <PhotoHeader>
            <Avatar url={photo.user?.avatar || ""} lg />
            <Username>{photo.user.username}</Username>
          </PhotoHeader>
          <PhotoFile src={photo?.file || ""}></PhotoFile>
          <PhotoData>
            <PhotoActions>
              <div>
                <PhotoAction>
                  <FontAwesomeIcon icon={faHeart} size="2x" />
                </PhotoAction>
                <PhotoAction>
                  <FontAwesomeIcon icon={faComment} size="2x" />
                </PhotoAction>
                <PhotoAction>
                  <FontAwesomeIcon icon={faPaperPlane} size="2x" />
                </PhotoAction>
              </div>
              <div>
                <PhotoAction>
                  <FontAwesomeIcon icon={faBookmark} size="2x" />
                </PhotoAction>
              </div>
            </PhotoActions>
            <Likes>
              {photo.likes === 1 ? "1 like" : `${photo.likes} likes`}
            </Likes>
          </PhotoData>
        </PhotoContainer>
      ))}
      <button onClick={() => logUserOut()}>Logout</button>
    </div>
  );
};
export default Home;
