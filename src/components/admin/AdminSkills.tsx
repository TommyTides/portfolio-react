import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase.ts';

interface Skill {
 id?: string;
 name: string;
 category: string;
 level: number;
 icon?: string;
}

const AdminSkills: React.FC = () => {
 const [skills, setSkills] = useState<Skill[]>([]);
 const [formData, setFormData] = useState<Omit<Skill, 'id'>>({
   name: '',
   category: '',
   level: 1,
   icon: ''
 });

 const categories = ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools'];

 useEffect(() => {
   fetchSkills();
 }, []);

 const fetchSkills = async () => {
   const snapshot = await getDocs(collection(db, 'skills'));
   setSkills(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Skill[]);
 };

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   await addDoc(collection(db, 'skills'), formData);
   setFormData({ name: '', category: '', level: 1, icon: '' });
   fetchSkills();
 };

 const handleDelete = async (id: string) => {
   await deleteDoc(doc(db, 'skills', id));
   fetchSkills();
 };

 const handleUpdateLevel = async (id: string, newLevel: number) => {
   await updateDoc(doc(db, 'skills', id), { level: newLevel });
   fetchSkills();
 };

 return (
   <div className="space-y-6">
     <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div>
           <label className="block text-sm font-medium text-gray-700">Skill Name</label>
           <input
             type="text"
             value={formData.name}
             onChange={(e) => setFormData({...formData, name: e.target.value})}
             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
             required
           />
         </div>

         <div>
           <label className="block text-sm font-medium text-gray-700">Category</label>
           <select
             value={formData.category}
             onChange={(e) => setFormData({...formData, category: e.target.value})}
             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
             required
           >
             <option value="">Select Category</option>
             {categories.map(category => (
               <option key={category} value={category}>{category}</option>
             ))}
           </select>
         </div>

         <div>
           <label className="block text-sm font-medium text-gray-700">Level (1-5)</label>
           <input
             type="number"
             min="1"
             max="5"
             value={formData.level}
             onChange={(e) => setFormData({...formData, level: Number(e.target.value)})}
             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
             required
           />
         </div>

         <div>
           <label className="block text-sm font-medium text-gray-700">Icon URL</label>
           <input
             type="text"
             value={formData.icon}
             onChange={(e) => setFormData({...formData, icon: e.target.value})}
             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
           />
         </div>
       </div>

       <button
         type="submit"
         className="mt-4 bg-ocean hover:bg-ocean-dark text-white font-bold py-2 px-4 rounded"
       >
         Add Skill
       </button>
     </form>

     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
       {skills.map(skill => (
         <div key={skill.id} className="bg-white p-4 rounded-lg shadow">
           <div className="flex justify-between items-start">
             <div>
               <h3 className="font-bold">{skill.name}</h3>
               <p className="text-sm text-gray-600">{skill.category}</p>
             </div>
             <button
               onClick={() => skill.id && handleDelete(skill.id)}
               className="text-red-500 hover:text-red-700"
             >
               Delete
             </button>
           </div>
           
           <div className="mt-2">
             <label className="block text-sm text-gray-600">Skill Level</label>
             <input
               type="range"
               min="1"
               max="5"
               value={skill.level}
               onChange={(e) => skill.id && handleUpdateLevel(skill.id, Number(e.target.value))}
               className="w-full"
             />
             <div className="text-right text-sm text-gray-600">{skill.level}/5</div>
           </div>
         </div>
       ))}
     </div>
   </div>
 );
};

export default AdminSkills;