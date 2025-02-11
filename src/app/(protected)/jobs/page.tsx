"use client"

import React, { useState } from 'react';

const initialSkills = [
    { id: 1, name: 'JavaScript' },
    { id: 2, name: 'React' },
    { id: 3, name: 'Node.js' },
];

const JobsPage: React.FC = () => {
    const [skills, setSkills] = useState(initialSkills);
    const [newSkill, setNewSkill] = useState('');

    const handleAddSkill = () => {
        if (newSkill.trim()) {
            setSkills([...skills, { id: skills.length + 1, name: newSkill }]);
            setNewSkill('');
        }
    };

    const handleDeleteSkill = (id: number) => {
        setSkills(skills.filter(skill => skill.id !== id));
    };

    return (
        <div className="min-h-screen bg-[#f5f3ef] py-8">
            <div className="max-w-4xl mx-auto space-y-6">
                <h1 className="text-2xl font-bold">My Skills</h1>
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-semibold mb-4">Skills List</h2>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {skills.map(skill => (
                            <div key={skill.id} className="flex items-center bg-dip-80 text-white rounded-full px-4 py-2">
                                <span>{skill.name}</span>
                                <button 
                                    onClick={() => handleDeleteSkill(skill.id)} 
                                    className="ml-2 text-white hover:text-red-400"
                                >
                                    &times; {/* Close icon */}
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center border-2 border-dip-80 text-dip-100 rounded-full px-4 py-2">
                        <input 
                            type="text" 
                            value={newSkill} 
                            onChange={(e) => setNewSkill(e.target.value)} 
                            placeholder="Add a new skill" 
                            className="bg-transparent border-none outline-none text-dip-100 flex-1"
                        />
                        <button 
                            onClick={handleAddSkill} 
                            className="ml-2 bg-dip-80 text-white rounded-full px-4 py-1"
                        >
                            Add
                        </button>
                    </div>
                </div>

                {/* Job Listings */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Job Listings</h2>
                <div className="space-y-6">
                    {/* Sample Item 1 */}
                    <div className="flex gap-4">
                    <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-[#e6e0d4] rounded-lg flex items-center justify-center">
                        <span className="text-[#8b7355] font-semibold">C1</span>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900">Company 1</h3>
                        <p className="text-lg text-gray-700">Floor Cleaner</p>
                        <p className="text-sm text-gray-500 mt-1">Wipe that down</p>
                    </div>
                    </div>

                    {/* Sample Item 2 */}
                    <div className="flex gap-4">
                    <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-[#e6e0d4] rounded-lg flex items-center justify-center">
                        <span className="text-[#8b7355] font-semibold">C2</span>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900">Company 2</h3>
                        <p className="text-lg text-gray-700">Chicken Rice Eater</p>
                        <p className="text-sm text-gray-500 mt-1">Gobble Gobble</p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default JobsPage;
