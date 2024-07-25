import React, { useState, useRef, useContext } from "react";
import { Box, styled, TextField, ClickAwayListener, IconButton, Button } from "@mui/material";
import { v4 as uuid } from "uuid";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import BrushOutlinedIcon from "@mui/icons-material/BrushOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";
import { DataContext } from '../context/DataProvider'; // Adjust the import path as needed
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Container = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    width: "600px",
    boxShadow: "0 1px 2px 0 rgb(60, 64, 67, 30%), 0 2px 6px 2px rgb(60, 64, 67, 15%)",
    padding: "10px 15px",
    borderRadius: "8px",
    border: "1px solid #e0e0e0",
    margin: "auto",
    backgroundColor: "#fff",
    transition: "min-height 0.2s ease-in-out",
    minHeight: "30px",
}));

const Btn = styled(Button)`
    color: #000;
`;

const note = {
    id: "",
    heading: "",
    text: "",
    imageUrl: "",
};

const Form = () => {
    const { setNotes } = useContext(DataContext); // Make sure useContext is used properly
    const [showTextField, setShowTextField] = useState(false);
    const [addNote, setAddNote] = useState({ ...note, id: uuid() });
    const [selectedImage, setSelectedImage] = useState(null);
    const containerRef = useRef();

    const onTextAreaClick = () => {
        setShowTextField(true);
        containerRef.current.style.minHeight = "120px";
    };

    const handleClickAway = async () => {
        setShowTextField(false);
        containerRef.current.style.minHeight = "20px";
        if (addNote.heading || addNote.text || addNote.imageUrl) {
            try {
                let imageUrl = "";
                if (selectedImage) {
                    const imageRef = ref(storage, `images/${selectedImage.name}`);
                    const uploadTask = uploadBytesResumable(imageRef, selectedImage);

                    await new Promise((resolve, reject) => {
                        uploadTask.on(
                            "state_changed",
                            null,
                            (error) => {
                                console.error("Error uploading image: ", error);
                                reject(error);
                            },
                            async () => {
                                imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
                                console.log("Image uploaded successfully:", imageUrl);
                                resolve();
                            }
                        );
                    });
                }
                
                await addDoc(collection(db, "notes"), { ...addNote, imageUrl });
                setNotes(prevArr => [{ ...addNote, imageUrl }, ...prevArr]);
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        }
        setAddNote({ ...note, id: uuid() });
        setSelectedImage(null);
    };

    const onTextChange = (e) => {
        setAddNote({ ...addNote, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
        }
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Container ref={containerRef}>
                {showTextField && (
                    <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
                        <TextField
                            placeholder="Title"
                            variant="standard"
                            onChange={onTextChange}
                            name="heading"
                            value={addNote.heading}
                            InputProps={{
                                disableUnderline: true,
                            }}
                            sx={{
                                flexGrow: 1,
                                "& .MuiInputBase-input::placeholder": {
                                    color: "#5f6368",
                                    opacity: 1,
                                },
                            }}
                        />
                        <IconButton size="small">
                            <PushPinOutlinedIcon fontSize="small" style={{ color: '#0e0e0e' }} />
                        </IconButton>
                    </Box>
                )}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <TextField
                        placeholder="Take a note..."
                        multiline
                        maxRows={Infinity}
                        variant="standard"
                        onClick={onTextAreaClick}
                        onChange={onTextChange}
                        name="text"
                        value={addNote.text}
                        InputProps={{
                            disableUnderline: true,
                        }}
                        sx={{
                            "& .MuiInputBase-input::placeholder": {
                                color: "#5f6368",
                                opacity: 1,
                            },
                            flexGrow: 1,
                        }}
                        style={{ marginBottom: 10 }}
                    />
                    {!showTextField && (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center",
                                paddingLeft: 1,
                            }}
                        >
                            <IconButton size="small">
                                <CheckBoxOutlinedIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small">
                                <BrushOutlinedIcon fontSize="small" />
                            </IconButton>
                      
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="image-upload"
                                onChange={handleImageChange}
                            />
                            <label htmlFor="image-upload">
                                <IconButton size="small" component="span">
                                    <ImageOutlinedIcon fontSize="small" />
                                </IconButton>
                            </label>
                        </Box>
                    )}  
                </Box>
                {showTextField && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <IconButton size="small">
                                <NotificationsOutlinedIcon fontSize="small" style={{ color: '#0e0e0e' }} />
                            </IconButton>
                            <IconButton size="small">
                                <PersonAddAltOutlinedIcon fontSize="small" style={{ color: '#0e0e0e' }} />
                            </IconButton>
                            <IconButton size="small">
                                <PaletteOutlinedIcon fontSize="small" style={{ color: '#0e0e0e' }} />
                            </IconButton>
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="image-upload"
                                onChange={handleImageChange}
                            />
                            <label htmlFor="image-upload">
                                <IconButton size="small" component="span">
                                    <ImageOutlinedIcon fontSize="small" style={{ color: '#0e0e0e' }}/>
                                </IconButton>
                            </label>
                            <IconButton size="small">
                                <BrushOutlinedIcon fontSize="small" style={{ color: '#0e0e0e' }} />
                            </IconButton>
                            <IconButton size="small">
                                <CheckBoxOutlinedIcon fontSize="small" style={{ color: '#0e0e0e' }} />
                            </IconButton>
                            <IconButton size="small">
                                <MoreVertOutlinedIcon fontSize="small" style={{ color: '#0e0e0e' }} />
                            </IconButton>
                            <IconButton size="small">
                                <UndoOutlinedIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small">
                                <RedoOutlinedIcon fontSize="small" />
                            </IconButton>
                        </Box>
                        <Btn size="small" onClick={handleClickAway}>
                            Close
                        </Btn>  
                    </Box>
                )}
            </Container>
        </ClickAwayListener>
    );
};

export default Form;
