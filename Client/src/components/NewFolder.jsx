import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Tooltip,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { AiOutlineFolderAdd } from "react-icons/ai";
import { addNewFolder } from "../utils/folderUtils";
export default function NewFolder() {
  const [newFolderName, setNewFolderName] = useState();
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const popupName = searchParams.get("popup");

  const handleOpenPopup = () => {
    // setOpen(true);
    setSearchParams({ popup: "add-folder" });
  };

  const handlenewFolderNameChange = (e) => {
    setNewFolderName(e.target.value);
  };

  const handleClose = () => {
    // setOpen(false);
    setNewFolderName("");
    navigate(-1);
  };

  const handleAddNewFolder = async () => {
    const { addFolder } = await addNewFolder({ name: newFolderName });
    console.log({ addFolder });

    handleClose();
  };

  useEffect(() => {
    console.log({ popupName });
    if (popupName === "add-folder") {
      setOpen(true);
      return;
    }

    setOpen(false);
  }, [popupName]);

  return (
    <div>
      <Tooltip title="Add Folder" onClick={handleOpenPopup}>
        <AiOutlineFolderAdd
          className="fs-4 text-white cursor-pointer"
          style={{ cursor: "pointer" }}
        />
      </Tooltip>
      <Dialog open={open} onClass={handleClose}>
        <DialogTitle>New Folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Folder Name"
            fullWidth
            size="small"
            variant="standard"
            sx={{ width: "400px" }}
            value={newFolderName}
            onChange={handlenewFolderNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddNewFolder}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
