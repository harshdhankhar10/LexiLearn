import React, { useState, useEffect } from 'react';
import { app } from '../../../firebase/Firebase';
import { getFirestore, collection, addDoc, query, getDocs, doc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const PersonalNotes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    wordTerm: '',
    definition: '',
    personalNote: '',
    tags: '',
  });

  const db = getFirestore(app);
  const auth = getAuth(app);

  useEffect(() => {
    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
      try {
        const userInfo = JSON.parse(userInfoString);
        if (userInfo && userInfo.uid) {
          fetchNotes(userInfo.uid);
        } else {
          console.error("User info does not contain UID");
        }
      } catch (error) {
        console.error("Error parsing user info:", error);
      }
    } else {
      console.error("User info not found in localStorage");
    }
  }, []);

  const fetchNotes = async (uid) => {
    try {
      const q = query(collection(db, 'users', uid, 'personalNotes'));
      const querySnapshot = await getDocs(q);
      const fetchedNotes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotes(fetchedNotes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const userInfoString = localStorage.getItem("userInfo");
    if (!userInfoString) {
      console.error("User info not found");
      setIsLoading(false);
      return;
    }

    try {
      const userInfo = JSON.parse(userInfoString);
      if (editingNote) {
        await updateDoc(doc(db, 'users', userInfo.uid, 'personalNotes', editingNote.id), {
          ...formData,
          lastModified: new Date().toISOString(),
        });
      } else {
        await addDoc(collection(db, 'users', userInfo.uid, 'personalNotes'), {
          ...formData,
          dateCreated: new Date().toISOString(),
          lastModified: new Date().toISOString(),
        });
      }
      setIsLoading(false);
      setIsModalOpen(false);
      fetchNotes(userInfo.uid);
      resetForm();
    } catch (error) {
      console.error("Error saving document: ", error);
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      wordTerm: '',
      definition: '',
      personalNote: '',
      tags: '',
    });
    setEditingNote(null);
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setFormData({
      title: note.title,
      wordTerm: note.wordTerm,
      definition: note.definition,
      personalNote: note.personalNote,
      tags: note.tags,
    });
    setIsModalOpen(true);
  };

  // ... (rest of the component remains the same)

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-600">Personal Notes</h1>
      <button
        onClick={() => {
          resetForm();
          setIsModalOpen(true);
        }}
        className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 mb-8 block mx-auto"
      >
        Create New Note
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-indigo-600">{editingNote ? 'Edit Note' : 'Create New Note'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Title"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <input
                type="text"
                name="wordTerm"
                value={formData.wordTerm}
                onChange={handleInputChange}
                placeholder="Word/Term"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <textarea
                name="definition"
                value={formData.definition}
                onChange={handleInputChange}
                placeholder="Definition/Meaning"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows="3"
              ></textarea>
              <textarea
                name="personalNote"
                value={formData.personalNote}
                onChange={handleInputChange}
                placeholder="Personal Note"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows="3"
              ></textarea>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="Tags/Categories (comma-separated)"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <div key={note.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold mb-3 text-indigo-600">{note.title}</h3>
            <p className="text-gray-700 mb-2"><span className="font-semibold">Word/Term:</span> {note.wordTerm}</p>
            <p className="text-gray-700 mb-2"><span className="font-semibold">Definition:</span> {note.definition}</p>
            <p className="text-gray-700 mb-2"><span className="font-semibold">Personal Note:</span> {note.personalNote}</p>
            <p className="text-gray-700 mb-2"><span className="font-semibold">Tags:</span> {note.tags}</p>
            <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
              <p>Created: {new Date(note.dateCreated).toLocaleDateString()}</p>
              <p>Modified: {new Date(note.lastModified).toLocaleDateString()}</p>
            </div>
            <button
              onClick={() => handleEdit(note)}
              className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 w-full"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalNotes;