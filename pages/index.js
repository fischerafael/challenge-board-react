import React from "react";
import AssemblyLine from "../src/components/AssemblyLine";

const index = () => {
  return (
    <AssemblyLine stages={["Idea", "Development", "Testing", "Deployment"]} />
  );
};

export default index;
