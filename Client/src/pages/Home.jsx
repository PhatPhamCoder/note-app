import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import FolderList from "../components/FolderList";
import PushNotification from "../components/PushNotification";
import UserMenu from "../components/UserMenu";

export default function Home() {
  const { folders } = useLoaderData();
  // console.log({ data })
  return (
    <>
      <div className="container">
        <Typography
          variant="h4"
          sx={{ mb: "20px", textAlign: "center", fontWeight: "bold" }}
        >
          App Note 2023
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
            alignItems: "center",
            mb: "10px",
            gap: "3px",
          }}
        >
          <UserMenu />
          <PushNotification />
        </Box>

        <Grid
          container
          sx={{
            height: "50vh",
            boxShadow: "0 0 15px 0 rgb(193 193 193 / 60%)",
            borderRadius: "10px",
          }}
        >
          <Grid item xs={3} sx={{ height: "100%" }}>
            <FolderList folders={folders} />
          </Grid>
          <Grid item xs={9} sx={{ height: "100%" }}>
            <Outlet />
          </Grid>
        </Grid>
      </div>
    </>
  );
}
