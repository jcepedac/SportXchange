import React, { useState, useEffect } from 'react';
import { auth, db, storage } from '../../firebase/config';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";

const UserProfile = () => {
  const [profileData, setProfileData] = useState({
    bio: '',
    contactInfo: '',
    profilePicture: '',
  });
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUserId(user.uid);
        fetchUserProfile(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserProfile = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setProfileData(docSnap.data());
    } else {
      console.log("No user profile found!");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePictureFile(file);
      const previewUrl = URL.createObjectURL(file);
      setProfileData(prev => ({ ...prev, profilePicture: previewUrl }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      let profilePictureUrl = profileData.profilePicture;

      if (profilePictureFile) {
        const fileRef = ref(storage, `profilePictures/${userId}`);
        const snapshot = await uploadBytes(fileRef, profilePictureFile);
        profilePictureUrl = await getDownloadURL(snapshot.ref);
      }

      await setDoc(doc(db, "users", userId), {
        ...profileData,
        profilePicture: profilePictureUrl,
      });

      setIsEditing(false);
      setIsLoading(false);
      toast.success("Profile updated successfully.");
    } catch (error) {
      setError("Failed to save profile. Please try again.");
      console.error(error);
      setIsLoading(false);
      toast.error("An error occurred while updating the profile.");
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setError("");
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg max-w-2xl mx-auto my-10">
      <h1 className="text-2xl font-bold text-center mb-4">Edit Profile</h1>
      {isLoading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Profile Picture:
            </label>
            <input
              type="file"
              name="profilePicture"
              onChange={handleFileChange}
              className="border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {profileData.profilePicture && (
              <img
                src={profileData.profilePicture}
                alt="Profile Preview"
                className="h-24 w-24 mt-2 rounded-full"
              />
            )}
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Bio:
            </label>
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Contact Information:
            </label>
            <input
              type="text"
              name="contactInfo"
              value={profileData.contactInfo}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center">
          {profileData.profilePicture && (
            <img
              src={profileData.profilePicture}
              alt="Profile"
              className="mx-auto h-24 w-24 mt-2 rounded-full"
            />
          )}
          <p className="text-lg">Bio: {profileData.bio}</p>
          <p className="text-lg">Contact Information: {profileData.contactInfo}</p>
          <button
            type="button"
            onClick={toggleEdit}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;

