import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiEdit } from "react-icons/fi";
import { AiTwotoneDelete } from "react-icons/ai";
import { ImGithub } from "react-icons/im";
import { TbExternalLink } from "react-icons/tb";
import { useUser } from '@clerk/clerk-react';

const isMOR = (title = '') => {
    const t = title.toLowerCase();
    return t.includes('makersofresume') || t.includes('mor');
};

export default function HomeProjects({ limit }) {
    const [projects, setProjects] = useState([]);
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('https://backport-backend.vercel.app/api/showprojects');
                const sorted = [...response.data].sort((a, b) => {
                    if (isMOR(a.title) && !isMOR(b.title)) return -1;
                    if (!isMOR(a.title) && isMOR(b.title)) return 1;
                    return 0;
                });
                setProjects(limit ? sorted.slice(0, limit) : sorted);
            } catch (error) {
                console.error("Error fetching projects", error);
            }
        };
        fetchProjects();
    }, [limit]);

    return (
        <section className="flex flex-col gap-5">
            <div className="flex items-baseline justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Projects</h2>
                <span className="text-xs text-gray-500">{projects.length} shipped</span>
            </div>

            <div className="flex flex-col gap-4">
                {projects.map((project) => (
                    <article
                        key={project._id}
                        className="relative flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition"
                    >
                        {user && (
                            <div className="absolute top-2 right-2 z-10 flex gap-1">
                                <button
                                    onClick={() => navigate(`/show-projects/edit/${project._id}`)}
                                    className="text-xs bg-gray-800 text-white p-1.5 rounded hover:bg-gray-700"
                                >
                                    <FiEdit className="text-sm" />
                                </button>
                            </div>
                        )}

                        <div className="sm:w-40 h-32 sm:h-28 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                            <img
                                src={project.images?.[0] || '/placeholder-project.jpg'}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="flex flex-col justify-between flex-1 min-w-0">
                            <div>
                                <h3 className="text-base font-semibold text-gray-900 mb-1">{project.title}</h3>
                                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{project.desc}</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {project.tags.split(',').map((tag, index) => (
                                        <span
                                            key={index}
                                            className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                                        >
                                            {tag.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-2 mt-3">
                                {project.projlink && (
                                    <a
                                        href={project.projlink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-xs bg-gray-900 text-white px-3 py-1.5 rounded-md hover:bg-gray-700 transition"
                                    >
                                        <TbExternalLink /> Visit
                                    </a>
                                )}
                                {project.githublink && (
                                    <a
                                        href={project.githublink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-xs border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-50 transition"
                                    >
                                        <ImGithub /> Code
                                    </a>
                                )}
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
