import { Helmet } from "react-helmet-async";

interface Props {
  title: string;
}

const PageTitle = ({ title }: Props) => {
  return (
    <Helmet>
      <title>{title} | Instagram</title>
    </Helmet>
  );
};

export default PageTitle;
