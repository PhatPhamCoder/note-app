import React, { useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  IconButton,
  List,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Link,
  Outlet,
  useLoaderData,
  useParams,
  useSubmit,
} from "react-router-dom";
import { Box } from "@mui/system";
import { HiOutlineDocumentAdd } from "react-icons/hi";
export default function NoteList() {
  const { folderId, noteId } = useParams();
  const [activeFolderId, setActiveFolderId] = useState(folderId);
  const { folder } = useLoaderData();
  const submit = useSubmit();

  const handleAddNewNote = () => {
    submit(
      {
        content: "",
        folderId,
      },
      { method: "POST", action: `/folders/${folderId}` }
    );
  };

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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>Notes</Typography>
              <Tooltip title="Add Note" onClick={handleAddNewNote}>
                <IconButton size="small">
                  <HiOutlineDocumentAdd className="fs-5" />
                </IconButton>
              </Tooltip>
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
