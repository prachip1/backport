import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiEdit } from "react-icons/fi";
import { TbArrowUpRight } from "react-icons/tb";
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
            <h2 className="text-xl font-semibold text-gray-900">What I&apos;m building</h2>

            <ul className="flex flex-col divide-y divide-gray-100 border-y border-gray-100">
                {projects.map((project) => {
                    const link = project.projlink || project.githublink;
                    const CardTag = link ? 'a' : 'div';
                    const cardProps = link
                        ? { href: link, target: '_blank', rel: 'noopener noreferrer' }
                        : {};

                    return (
                        <li key={project._id} className="relative">
                            <CardTag
                                {...cardProps}
                                className="group flex items-start justify-between gap-4 py-4 hover:bg-gray-50 transition px-2 -mx-2 rounded-md"
                            >
                                <div className="flex flex-col gap-1 min-w-0">
                                    <h3 className="text-base font-medium text-gray-900 group-hover:underline underline-offset-2">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {project.desc}
                                    </p>
                                </div>
                                {link && (
                                    <TbArrowUpRight className="text-gray-400 group-hover:text-gray-900 text-lg flex-shrink-0 mt-1 transition" />
                                )}
                            </CardTag>

                            {user && (
                                <button
                                    onClick={() => navigate(`/show-projects/edit/${project._id}`)}
                                    className="absolute top-3 right-8 z-10 text-xs bg-gray-800 text-white p-1.5 rounded hover:bg-gray-700"
                                >
                                    <FiEdit className="text-xs" />
                                </button>
                            )}
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
