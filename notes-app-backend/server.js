const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let notes = [];
let id = 1;

// create notes
app.post("/notes", (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: "Text is required" });
    }
    const note = { id: id++, text };
    notes.push(note);
    return res.status(201).json({message: "Note added successfully", note});
});


// Get all notes
app.get("/notes", (req, res) => {    
    if (notes.length === 0) {
        return res.status(200).json({ message: "No notes found" });
    }   
    return res.status(200).json(notes);
});


// Delete a note
app.delete("/notes/:id", (req, res) => {
    const noteId = parseInt(req.params.id);
    notes = notes.filter(note => note.id !== noteId);
    return res.json({ message: "Note deleted successfully" });
});


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
