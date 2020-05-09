import React from "react";
import { Typography, Container } from "@material-ui/core";
import { APP_NAME } from "../../config";

const Home = (props) => {
  return (
    <div>
      <Container>
        <Typography color="primary" variant="h3">
          {APP_NAME}
        </Typography>
      </Container>
    </div>
  );
};

export default Home;
