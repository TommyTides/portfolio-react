// src/components/admin/AdminProjects.tsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../services/firebase.ts';

interface Project {
  id?: string;
  title: string;
  description: string;
  technologies: string[];
  imageId: string;
  githubUrl: string;
  demoUrl: string;
  order: number;
}

const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [formData, setFormData] = useState<Project>({
    title: '',
    description: '',
    technologies: [],
    imageId: '',
    githubUrl: '',
    demoUrl: '',
    order: 0
  });

  const getGoogleDriveImageUrl = (fileId: string) => {
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const snapshot = await getDocs(collection(db, 'projects'));
    setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Project[]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'projects'), {
        ...formData,
        technologies: formData.technologies,
        order: projects.length + 1
      });

      setFormData({
        title: '',
        description: '',
        technologies: [],
        imageId: '',
        githubUrl: '',
        demoUrl: '',
        order: 0
      });
      fetchProjects();
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
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
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Google Drive Image ID
          </label>
          <input
            type="text"
            value={formData.imageId}
            onChange={(e) => setFormData({...formData, imageId: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="Enter Google Drive file ID"
          />
          <p className="mt-1 text-sm text-gray-500">
            Upload image to Google Drive and paste the file ID here
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Technologies</label>
          <input
            type="text"
            value={formData.technologies.join(', ')}
            onChange={(e) => setFormData({...formData, technologies: e.target.value.split(',').map(tech => tech.trim())})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="React, TypeScript, Firebase"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">GitHub URL</label>
          <input
            type="url"
            value={formData.githubUrl}
            onChange={(e) => setFormData({...formData, githubUrl: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Demo URL</label>
          <input
            type="url"
            value={formData.demoUrl}
            onChange={(e) => setFormData({...formData, demoUrl: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <button
          type="submit"
          className="bg-ocean hover:bg-ocean-dark text-white font-bold py-2 px-4 rounded"
        >
          Add Project
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-bold">{project.title}</h4>
            <p className="text-sm text-gray-600">{project.description}</p>
            {project.imageId && (
              <img 
                src={getGoogleDriveImageUrl(project.imageId)}
                alt={project.title}
                className="mt-2 w-full h-40 object-cover rounded"
              />
            )}
            <div className="mt-2 flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span 
                  key={index}
                  className="bg-ocean-light text-ocean-dark px-2 py-1 rounded-full text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProjects;