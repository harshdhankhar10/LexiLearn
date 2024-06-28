import React, { useState, useEffect } from 'react';
import { app } from '../../../firebase/Firebase';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const FavoriteLists = () => {
  const [lists, setLists] = useState([]);
  const [currentList, setCurrentList] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('dateCreated');
  const [newWord, setNewWord] = useState('');

  const db = getFirestore(app);

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    const userInfoString = localStorage.getItem("userInfo");
    if (!userInfoString) {
      console.error("User info not found");
      return;
    }

    try {
      const userInfo = JSON.parse(userInfoString);
      const querySnapshot = await getDocs(collection(db, 'users', userInfo.uid, 'favoriteLists'));
      const fetchedLists = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLists(fetchedLists);
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  };

  const handleCreateList = () => {
    setCurrentList({
      name: '',
      words: [],
      notes: '',
      dateCreated: new Date().toISOString(),
      lastModified: new Date().toISOString(),
    });
    setIsModalOpen(true);
  };

  const handleSaveList = async () => {
    setIsLoading(true);
    const userInfoString = localStorage.getItem("userInfo");
    if (!userInfoString) {
      console.error("User info not found");
      setIsLoading(false);
      return;
    }

    try {
      const userInfo = JSON.parse(userInfoString);
      if (currentList.id) {
        await updateDoc(doc(db, 'users', userInfo.uid, 'favoriteLists', currentList.id), {
          ...currentList,
          lastModified: new Date().toISOString(),
        });
      } else {
        await addDoc(collection(db, 'users', userInfo.uid, 'favoriteLists'), {
          ...currentList,
          dateCreated: new Date().toISOString(),
          lastModified: new Date().toISOString(),
        });
      }
      setIsLoading(false);
      setIsModalOpen(false);
      fetchLists();
    } catch (error) {
      console.error("Error saving list:", error);
      setIsLoading(false);
    }
  };

  const handleDeleteList = async (listId) => {
    const userInfoString = localStorage.getItem("userInfo");
    if (!userInfoString) {
      console.error("User info not found");
      return;
    }

    try {
      const userInfo = JSON.parse(userInfoString);
      await deleteDoc(doc(db, 'users', userInfo.uid, 'favoriteLists', listId));
      fetchLists();
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  };

  const handleAddWord = () => {
    if (newWord.trim() !== '') {
      setCurrentList(prev => ({
        ...prev,
        words: [...prev.words, newWord.trim()],
        lastModified: new Date().toISOString(),
      }));
      setNewWord('');
    }
  };

  const handleRemoveWord = (word) => {
    setCurrentList(prev => ({
      ...prev,
      words: prev.words.filter(w => w !== word),
      lastModified: new Date().toISOString(),
    }));
  };

  const filteredWords = currentList?.words.filter(word => 
    word.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const sortedWords = [...filteredWords].sort((a, b) => {
    if (sortBy === 'alphabetical') {
      return a.localeCompare(b);
    }
    return 0;
  });

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-600">Favorite Lists</h1>
      <button
        onClick={handleCreateList}
        className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 mb-8 block mx-auto"
      >
        Create New List
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-6 text-indigo-600">
              {currentList.id ? 'Edit List' : 'Create New List'}
            </h2>
            <input
              type="text"
              value={currentList.name}
              onChange={(e) => setCurrentList(prev => ({ ...prev, name: e.target.value }))}
              placeholder="List Name"
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              value={currentList.notes}
              onChange={(e) => setCurrentList(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Notes for the List"
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="3"
            ></textarea>
            <div className="mb-4">
              <input
                type="text"
                value={newWord}
                onChange={(e) => setNewWord(e.target.value)}
                placeholder="Add new word"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleAddWord}
                className="mt-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                Add Word
              </button>
            </div>
            <div className="mb-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search within list"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="dateAdded">Sort by Date Added</option>
                <option value="alphabetical">Sort Alphabetically</option>
              </select>
            </div>
            <ul className="mb-4 max-h-60 overflow-y-auto">
              {sortedWords.map((word, index) => (
                <li key={index} className="flex justify-between items-center mb-2">
                  <span>{word}</span>
                  <button
                    onClick={() => handleRemoveWord(word)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-lg transition duration-300"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveList}
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lists.map((list) => (
          <div key={list.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold mb-3 text-indigo-600">{list.name}</h3>
            <p className="text-gray-700 mb-2"><span className="font-semibold">Words:</span> {list.words.join(', ')}</p>
            <p className="text-gray-700 mb-2"><span className="font-semibold">Notes:</span> {list.notes}</p>
            <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
              <p>Created: {new Date(list.dateCreated).toLocaleDateString()}</p>
              <p>Modified: {new Date(list.lastModified).toLocaleDateString()}</p>
            </div>
            <div className="mt-4 space-x-2">
              <button
                onClick={() => {
                  setCurrentList(list);
                  setIsModalOpen(true);
                }}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteList(list.id)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteLists;