import React, { useState } from "react";
import { Card, CardContent, Grid, List, Typography } from "@mui/material";
import { Link, Outlet, useLoaderData, useParams } from "react-router-dom";
import { Box } from "@mui/system";

export default function NoteList() {
  const { folderId } = useParams();
  const [activeFolderId, setActiveFolderId] = useState(folderId);
  const { folder } = useLoaderData();

  return (
    <Grid container height="100%">
      <Grid
        item
        xs={4}
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "#F0EBE3",
          height: "100%",
          overflow: "auto",
          padding: "10px",
          textAlign: "left",
        }}
      >
        <List
          subheader={
            <Box>
              <Typography sx={{ fontWeight: "bold" }}>Notes</Typography>
            </Box>
          }
        >
          {folder.notes.map(({ id, content }) => {
            return (
              <Link
                key={id}
                to={`note/${id}`}
                style={{ textDecoration: "none" }}
                onClick={() => setActiveFolderId(id)}
              >
                <Card
                  sx={{
                    mb: "5px",
                    bgcolor: id === activeFolderId ? "rgb(255 211 240)" : null,
                  }}
                >
                  <CardContent
                    sx={{ "&:last-child": { pb: "10px" }, padding: "10px" }}
                  >
                    <div
                      style={{ fontSize: 14, fontWeight: "bold" }}
                      dangerouslySetInnerHTML={{
                        __html: `${content.substring(0, 30) || "Empty"}`,
                      }}
                    />
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </List>
      </Grid>
      <Grid item xs={8}>
        <Outlet />
      </Grid>
    </Grid>
  );
}
