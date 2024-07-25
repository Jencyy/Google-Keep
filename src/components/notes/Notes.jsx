import { Box, Grid, styled } from "@mui/material";
import React, { useContext } from "react";
import Form from "./Form";
import Note from "./Note";
import EmptyNotes from "./EmptyNotes";
import { DataContext } from "../context/DataProvider";

const Notes = () => {
  const DrawerHeader = styled("div")(({ theme }) => ({
    ...theme.mixins.toolbar,
  }));

  const { notes } = useContext(DataContext);

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box sx={{ p: 3, width: "100%" }}>
        <DrawerHeader />
        <Form />
        {notes.length > 0 ? (
          <Grid container style={{ marginTop: 16 }}>
            {notes.map((note) => (
              <Grid item key={note.id}>
                <Note note={note} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <EmptyNotes />
        )}
      </Box>
    </Box>
  );
}

export default Notes;
