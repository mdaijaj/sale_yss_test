import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, TextField, Button, List, ListItem, ListItemText, IconButton, CircularProgress, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const API_URL = "http://localhost:5000/notes";

const App=()=> {
    const [notes, setNotes] = useState([]);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL);
            setNotes(response.data);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
        setLoading(false);
    };

    const addNote = async () => {
        if (text.trim() === "") return;
        try {
            const response = await axios.post(API_URL, { text });
            setNotes([...notes, response.data]);
            setText("");
        } catch (error) {
            console.error("Error adding note:", error);
        }
    };

    const deleteNote = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setNotes(notes.filter(note => note.id !== id));
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    
    return (
        <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "40px" }}>
            <h2>📝 Simple Notes App</h2>
            <Paper elevation={3} style={{ padding: "20px", borderRadius: "10px" }}>
                <TextField
                    fullWidth
                    label="Enter a note"
                    variant="outlined"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    style={{ marginBottom: "15px" }}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={addNote}
                    fullWidth
                >
                    Add Note
                </Button>
            </Paper>

            {loading ? (
                <CircularProgress style={{ margin: "20px" }} />
            ) : (
                <List style={{ marginTop: "20px" }}>
                    {notes.map(note => (
                        <ListItem 
                            key={note.id} 
                            secondaryAction={
                                <IconButton edge="end" color="error" onClick={() => deleteNote(note.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            }
                            style={{ borderBottom: "1px solid #ddd" }}
                        >
                            <ListItemText primary={note.text} />
                        </ListItem>
                    ))}
                </List>
            )}
        </Container>
    );
}

export default App;
