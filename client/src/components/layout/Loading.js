import React from "react";
import { Grid } from "@material-ui/core";
import { ClipLoader } from "react-spinners";
import { useTheme } from "@material-ui/core/styles";

function Loading() {
  const theme = useTheme();

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="column"
      style={{ minHeight: "50vh" }}
      color="secondary"
    >
      <Grid item xs={3}>
        <ClipLoader size={60} color={theme.palette.secondary.main} />
      </Grid>
    </Grid>
  );
}

export default Loading;
