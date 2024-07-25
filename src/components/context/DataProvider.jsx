import React, { createContext, useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs, addDoc, deleteDoc, doc,updateDoc } from "firebase/firestore";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);
    const [archiveNotes, setArchiveNotes] = useState([]);
    const [deleteNotes, setDeleteNotes] = useState([]);

    useEffect(() => {
        const fetchNotes = async () => {
            const querySnapshot = await getDocs(collection(db, "notes"));
            setNotes(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };

        const fetchArchiveNotes = async () => {
            const querySnapshot = await getDocs(collection(db, "archiveNotes"));
            setArchiveNotes(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };

        const fetchDeleteNotes = async () => {
            const querySnapshot = await getDocs(collection(db, "deleteNotes"));
            setDeleteNotes(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };

        fetchNotes();
        fetchArchiveNotes();
        fetchDeleteNotes();
    }, []);
    const updateNote = async (updatedNote) => {
        try {
          const noteDoc = doc(db, 'notes', updatedNote.id);
          await updateDoc(noteDoc, updatedNote);
          setNotes((prevNotes) =>
            prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
          );
        } catch (error) {
          console.error('Error updating note:', error);
        }
      };
    
    const archiveNote = async (note) => {
        try {
            await deleteDoc(doc(db, "notes", note.id));
            await addDoc(collection(db, "archiveNotes"), note);
            setNotes(prev => prev.filter(n => n.id !== note.id));
            setArchiveNotes(prev => [note, ...prev]);
        } catch (error) {
            console.error("Error archiving note: ", error);
        }
    };

    const unarchiveNote = async (note) => {
        try {
            await deleteDoc(doc(db, "archiveNotes", note.id));
            await addDoc(collection(db, "notes"), note);
            setArchiveNotes(prev => prev.filter(n => n.id !== note.id));
            setNotes(prev => [note, ...prev]);
        } catch (error) {
            console.error("Error unarchiving note: ", error);
        }
    };

    const deleteNote = async (note) => {
        try {
            await deleteDoc(doc(db, "notes", note.id));
            await addDoc(collection(db, "deleteNotes"), note);
            setNotes(prev => prev.filter(n => n.id !== note.id));
            setDeleteNotes(prev => [note, ...prev]);
        } catch (error) {
            console.error("Error deleting note: ", error);
        }
    };

    const permanentlyDeleteNote = async (note) => {
        try {
            await deleteDoc(doc(db, "deleteNotes", note.id));
            setDeleteNotes(prev => prev.filter(n => n.id !== note.id));
        } catch (error) {
            console.error("Error permanently deleting note: ", error);
        }
    };

    return (
        <DataContext.Provider value={{ notes, setNotes, archiveNotes, setArchiveNotes, deleteNotes, setDeleteNotes, archiveNote, unarchiveNote, deleteNote, permanentlyDeleteNote , updateNote}}>
            {children}
        </DataContext.Provider>
    );
};
