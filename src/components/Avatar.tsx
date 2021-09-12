import styled from "styled-components";

const SAvatar = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 100%;
  background-color: #fff;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  align-items: center;
`;

const Avatar = ({ url = "" }) => {
  return (
    <SAvatar>
      {url !== "" ? (
        <Image
          style={{ width: "100%", height: "100%" }}
          src={url}
          alt="profile"
        />
      ) : null}
    </SAvatar>
  );
};

export default Avatar;
