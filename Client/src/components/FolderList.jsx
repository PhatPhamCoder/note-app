import { Box, Card, CardContent, List, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import NewFolder from "./NewFolder";

export default function FolderList({ folders }) {
  const { folderId } = useParams();
  const [activeFolderId, setActiveFolderId] = useState(folderId);

  return (
    <List
      sx={{
        width: "100%",
        height: "100%",
        padding: "10px",
        textAlign: "left",
        overflowY: "auto",
        bgcolor: "#7D9C9D",
        borderRadius: "10px 0 0 10px",
      }}
      subheader={
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", mb: "10px", color: "white" }}
          >
            Danh mục Folder
          </Typography>
          <NewFolder />
        </Box>
      }
    >
      {folders.map(({ id, name }) => {
        return (
          <Link
            key={id}
            to={`folders/${id}`}
            style={{
              textDecoration: "none",
            }}
            onClick={() => setActiveFolderId(id)}
          >
            <Card
              sx={{
                mb: "5px",
                backgroundColor:
                  id === activeFolderId ? "rgb(255 211 240)" : null,
              }}
            >
              <CardContent
                sx={{
                  "&:last-child": { padding: "10px" },
                  padding: "10px",
                }}
              >
                <Typography sx={{ fontWeight: "16px", fontSize: "16px" }}>
                  {name}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </List>
  );
}
