import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../services/firebase.ts';

interface AboutData {
 bio: string;
 profileImage: string;
 resumeUrl: string;
 linkedin: string;
 github: string;
 email: string;
 location: string;
}

const AdminAbout: React.FC = () => {
 const [formData, setFormData] = useState<AboutData>({
   bio: '',
   profileImage: '',
   resumeUrl: '',
   linkedin: '',
   github: '',
   email: '',
   location: ''
 });
 const [selectedImage, setSelectedImage] = useState<File | null>(null);
 const [selectedResume, setSelectedResume] = useState<File | null>(null);

 useEffect(() => {
   fetchAboutData();
 }, []);

 const fetchAboutData = async () => {
   const docRef = doc(db, 'about', 'main');
   const docSnap = await getDoc(docRef);
   if (docSnap.exists()) {
     setFormData(docSnap.data() as AboutData);
   }
 };

 const handleFileUpload = async (file: File, path: string): Promise<string> => {
   const storageRef = ref(storage, path);
   await uploadBytes(storageRef, file);
   return getDownloadURL(storageRef);
 };

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   try {
     let updatedData = { ...formData };

     if (selectedImage) {
       const imageUrl = await handleFileUpload(selectedImage, `about/profile-${Date.now()}`);
       updatedData.profileImage = imageUrl;
     }

     if (selectedResume) {
       const resumeUrl = await handleFileUpload(selectedResume, `about/resume-${Date.now()}`);
       updatedData.resumeUrl = resumeUrl;
     }

     await setDoc(doc(db, 'about', 'main'), updatedData);
     setSelectedImage(null);
     setSelectedResume(null);
     alert('About section updated successfully!');
   } catch (error) {
     console.error('Error updating about section:', error);
     alert('Error updating about section');
   }
 };

 return (
   <div className="max-w-2xl mx-auto">
     <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-6">
       <div>
         <label className="block text-sm font-medium text-gray-700">Bio</label>
         <textarea
           value={formData.bio}
           onChange={(e) => setFormData({...formData, bio: e.target.value})}
           rows={6}
           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
           required
         />
       </div>

       <div>
         <label className="block text-sm font-medium text-gray-700">Profile Image</label>
         <input
           type="file"
           onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
           className="mt-1 block w-full"
           accept="image/*"
         />
         {formData.profileImage && (
           <img 
             src={formData.profileImage} 
             alt="Current profile" 
             className="mt-2 h-32 w-32 object-cover rounded-full"
           />
         )}
       </div>

       <div>
         <label className="block text-sm font-medium text-gray-700">Resume</label>
         <input
           type="file"
           onChange={(e) => setSelectedResume(e.target.files?.[0] || null)}
           className="mt-1 block w-full"
           accept=".pdf,.doc,.docx"
         />
         {formData.resumeUrl && (
           <a 
             href={formData.resumeUrl}
             target="_blank"
             rel="noopener noreferrer"
             className="text-ocean hover:text-ocean-dark"
           >
             Current Resume
           </a>
         )}
       </div>

       <div>
         <label className="block text-sm font-medium text-gray-700">LinkedIn URL</label>
         <input
           type="url"
           value={formData.linkedin}
           onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
         />
       </div>

       <div>
         <label className="block text-sm font-medium text-gray-700">GitHub URL</label>
         <input
           type="url"
           value={formData.github}
           onChange={(e) => setFormData({...formData, github: e.target.value})}
           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
         />
       </div>

       <div>
         <label className="block text-sm font-medium text-gray-700">Email</label>
         <input
           type="email"
           value={formData.email}
           onChange={(e) => setFormData({...formData, email: e.target.value})}
           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
         />
       </div>

       <div>
         <label className="block text-sm font-medium text-gray-700">Location</label>
         <input
           type="text"
           value={formData.location}
           onChange={(e) => setFormData({...formData, location: e.target.value})}
           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
         />
       </div>

       <button
         type="submit"
         className="w-full bg-ocean hover:bg-ocean-dark text-white font-bold py-2 px-4 rounded"
       >
         Update About Section
       </button>
     </form>
   </div>
 );
};

export default AdminAbout;