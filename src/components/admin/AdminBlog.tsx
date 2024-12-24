import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase.ts';

interface BlogPost {
 id?: string;
 title: string;
 content: string;
 categories: string[];
 tags: string[];
 publishDate: string;
 status: 'draft' | 'published';
 readingTime: number;
}

const AdminBlog: React.FC = () => {
 const [posts, setPosts] = useState<BlogPost[]>([]);
 const [formData, setFormData] = useState<Omit<BlogPost, 'id'>>({
   title: '',
   content: '',
   categories: [],
   tags: [],
   publishDate: new Date().toISOString().split('T')[0],
   status: 'draft',
   readingTime: 0
 });

 useEffect(() => {
   fetchPosts();
 }, []);

 const fetchPosts = async () => {
   const snapshot = await getDocs(collection(db, 'blogPosts'));
   setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as BlogPost[]);
 };

 const calculateReadingTime = (content: string): number => {
   const wordsPerMinute = 200;
   const words = content.trim().split(/\s+/).length;
   return Math.ceil(words / wordsPerMinute);
 };

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   const readingTime = calculateReadingTime(formData.content);
   await addDoc(collection(db, 'blogPosts'), { ...formData, readingTime });
   setFormData({
     title: '',
     content: '',
     categories: [],
     tags: [],
     publishDate: new Date().toISOString().split('T')[0],
     status: 'draft',
     readingTime: 0
   });
   fetchPosts();
 };

 const handleDelete = async (id: string) => {
   await deleteDoc(doc(db, 'blogPosts', id));
   fetchPosts();
 };

 const handleStatusUpdate = async (id: string, newStatus: 'draft' | 'published') => {
   await updateDoc(doc(db, 'blogPosts', id), { status: newStatus });
   fetchPosts();
 };

 return (
   <div className="space-y-6">
     <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
       <div className="space-y-4">
         <div>
           <label className="block text-sm font-medium text-gray-700">Title</label>
           <input
             type="text"
             value={formData.title}
             onChange={(e) => setFormData({...formData, title: e.target.value})}
             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
             required
           />
         </div>

         <div>
           <label className="block text-sm font-medium text-gray-700">Content</label>
           <textarea
             value={formData.content}
             onChange={(e) => setFormData({...formData, content: e.target.value})}
             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
             rows={10}
             required
           />
         </div>

         <div>
           <label className="block text-sm font-medium text-gray-700">Categories (comma-separated)</label>
           <input
             type="text"
             value={formData.categories.join(', ')}
             onChange={(e) => setFormData({...formData, categories: e.target.value.split(',').map(cat => cat.trim())})}
             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
           />
         </div>

         <div>
           <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
           <input
             type="text"
             value={formData.tags.join(', ')}
             onChange={(e) => setFormData({...formData, tags: e.target.value.split(',').map(tag => tag.trim())})}
             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
           />
         </div>

         <div>
           <label className="block text-sm font-medium text-gray-700">Publish Date</label>
           <input
             type="date"
             value={formData.publishDate}
             onChange={(e) => setFormData({...formData, publishDate: e.target.value})}
             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
             required
           />
         </div>
       </div>

       <button
         type="submit"
         className="mt-4 bg-ocean hover:bg-ocean-dark text-white font-bold py-2 px-4 rounded"
       >
         Save Post
       </button>
     </form>

     <div className="space-y-4">
       {posts.map(post => (
         <div key={post.id} className="bg-white p-4 rounded-lg shadow">
           <div className="flex justify-between items-start">
             <div>
               <h3 className="font-bold">{post.title}</h3>
               <p className="text-sm text-gray-600">
                 {new Date(post.publishDate).toLocaleDateString()} · {post.readingTime} min read
               </p>
               <div className="mt-2 flex flex-wrap gap-2">
                 {post.categories.map((category, index) => (
                   <span key={index} className="bg-ocean-light text-ocean-dark px-2 py-1 rounded-full text-xs">
                     {category}
                   </span>
                 ))}
               </div>
             </div>
             <div className="flex space-x-2">
               <button
                 onClick={() => post.id && handleStatusUpdate(
                   post.id,
                   post.status === 'draft' ? 'published' : 'draft'
                 )}
                 className={`px-2 py-1 rounded text-sm ${
                   post.status === 'published' 
                     ? 'bg-green-100 text-green-800' 
                     : 'bg-gray-100 text-gray-800'
                 }`}
               >
                 {post.status === 'published' ? 'Published' : 'Draft'}
               </button>
               <button
                 onClick={() => post.id && handleDelete(post.id)}
                 className="text-red-500 hover:text-red-700"
               >
                 Delete
               </button>
             </div>
           </div>
         </div>
       ))}
     </div>
   </div>
 );
};

export default AdminBlog;