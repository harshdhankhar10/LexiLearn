import React, { useState, useEffect } from 'react';
import { app } from '../../../firebase/Firebase';
import { getAuth, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Settings = () => {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);

  const [userInfo, setUserInfo] = useState(null);
  const [settings, setSettings] = useState({
    email: '',
    username: '',
    profilePicture: '',
    emailNotifications: false,
    pushNotifications: false,
    notificationFrequency: 'daily',
    dataSharing: false,
    preferredLanguage: 'english',
    secondaryLanguages: [],
    theme: 'light',
    fontSize: 'medium',
    connectedAccounts: [],
    dailyLearningGoal: 10,
    preferredWordCategories: [],
    learningReminders: false,
    twoFactorAuth: false,
  });

  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newProfilePicture, setNewProfilePicture] = useState(null);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      const parsedUserInfo = JSON.parse(storedUserInfo);
      setUserInfo(parsedUserInfo);
      fetchUserSettings(parsedUserInfo.uid);
    }
  }, []);

  const fetchUserSettings = async (uid) => {
    try {
      const userDocRef = doc(db, 'users', uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        setSettings({ ...userDocSnap.data(), email: userInfo.email });
      }
    } catch (error) {
      console.error("Error fetching user settings:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleChangeEmail = async () => {
    try {
      await updateEmail(auth.currentUser, settings.email);
      // Update localStorage
      const updatedUserInfo = { ...userInfo, email: settings.email };
      localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
      setUserInfo(updatedUserInfo);
      alert("Email updated successfully!");
    } catch (error) {
      console.error("Error updating email:", error);
      alert("Failed to update email. Please try again.");
    }
  };

  const handleChangePassword = async () => {
    try {
      const credential = EmailAuthProvider.credential(
        userInfo.email,
        currentPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPassword);
      alert("Password updated successfully!");
      setNewPassword('');
      setCurrentPassword('');
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Failed to update password. Please check your current password and try again.");
    }
  };

  const handleUpdateProfilePicture = async () => {
    if (newProfilePicture) {
      const storageRef = ref(storage, `profilePictures/${userInfo.uid}`);
      try {
        const snapshot = await uploadBytes(storageRef, newProfilePicture);
        const downloadURL = await getDownloadURL(snapshot.ref);
        await updateDoc(doc(db, 'users', userInfo.uid), { profilePicture: downloadURL });
        setSettings(prev => ({ ...prev, profilePicture: downloadURL }));
        // Update localStorage
        const updatedUserInfo = { ...userInfo, profilePicture: downloadURL };
        localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
        setUserInfo(updatedUserInfo);
        alert("Profile picture updated successfully!");
      } catch (error) {
        console.error("Error updating profile picture:", error);
        alert("Failed to update profile picture. Please try again.");
      }
    }
  };

  const handleSaveSettings = async () => {
    try {
      await updateDoc(doc(db, 'users', userInfo.uid), settings);
      // Update localStorage
      const updatedUserInfo = { ...userInfo, ...settings };
      localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
      setUserInfo(updatedUserInfo);
      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings. Please try again.");
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        await deleteDoc(doc(db, 'users', userInfo.uid));
        await auth.currentUser.delete();
        // Clear localStorage
        localStorage.removeItem("userInfo");
        alert("Your account has been deleted.");
        // Redirect to home page or login page
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("Failed to delete account. Please try again.");
      }
    }
  };

  if (!userInfo) {
    return <div>Please log in to view settings.</div>;
  }



  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-600">LexiLearn Settings</h1>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={settings.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            <button onClick={handleChangeEmail} className="mt-2 bg-blue-500 text-white p-2 rounded">Change Email</button>
          </div>
          <div>
            <label className="block mb-2">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <button onClick={handleChangePassword} className="mt-2 bg-blue-500 text-white p-2 rounded">Change Password</button>
          </div>
          <div>
            <label className="block mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={settings.username}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Profile Picture</label>
            <input
              type="file"
              onChange={(e) => setNewProfilePicture(e.target.files[0])}
              className="w-full p-2 border rounded"
            />
            <button onClick={handleUpdateProfilePicture} className="mt-2 bg-blue-500 text-white p-2 rounded">Update Profile Picture</button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Notification Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="emailNotifications"
                checked={settings.emailNotifications}
                onChange={handleInputChange}
                className="mr-2"
              />
              Email Notifications
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="pushNotifications"
                checked={settings.pushNotifications}
                onChange={handleInputChange}
                className="mr-2"
              />
              Push Notifications
            </label>
          </div>
          <div>
            <label className="block mb-2">Notification Frequency</label>
            <select
              name="notificationFrequency"
              value={settings.notificationFrequency}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Privacy Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="dataSharing"
                checked={settings.dataSharing}
                onChange={handleInputChange}
                className="mr-2"
              />
              Data Sharing
            </label>
          </div>
          <div>
            <button onClick={handleDeleteAccount} className="bg-red-500 text-white p-2 rounded">Delete Account</button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Language Preferences</h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Preferred Language</label>
            <select
              name="preferredLanguage"
              value={settings.preferredLanguage}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
              {/* Add more language options */}
            </select>
          </div>
          {/* Add component for secondary languages */}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Display Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Theme</label>
            <select
              name="theme"
              value={settings.theme}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Font Size</label>
            <select
              name="fontSize"
              value={settings.fontSize}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Connected Accounts</h2>
        {/* Add components for social media connections and third-party app integrations */}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Learning Preferences</h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Daily Learning Goal</label>
            <input
              type="number"
              name="dailyLearningGoal"
              value={settings.dailyLearningGoal}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          {/* Add components for preferred word categories and learning reminders */}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Security Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="twoFactorAuth"
                checked={settings.twoFactorAuth}
                onChange={handleInputChange}
                className="mr-2"
              />
              Two-Factor Authentication
            </label>
          </div>
          {/* Add components for login activity and authorized devices */}
        </div>
      </div>

      <button onClick={handleSaveSettings} className="bg-green-500 text-white p-3 rounded-lg w-full">Save All Settings</button>
    </div>
  );
};

export default Settings;