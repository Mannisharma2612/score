import React from "react";
type Props = {
  params: {
    id: string;
  };
};
const Team: React.FC<Props> = ({ params }) => {
  return <div>{params.id}</div>;
};

export default Team;
