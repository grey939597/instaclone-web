import styled from "styled-components";

interface IAvatarProps {
  lg: boolean;
}

const SAvatar = styled.div<IAvatarProps>`
  width: ${(props) => (props.lg ? "35px" : "20px")};
  height: ${(props) => (props.lg ? "35px" : "20px")};
  border-radius: 100%;
  background-color: #fff;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  align-items: center;
`;

const Avatar = ({ url = "", lg = false }) => {
  return (
    <SAvatar lg={lg}>
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
