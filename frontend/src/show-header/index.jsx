import React from 'react'
import { SocialIcon } from 'react-social-icons';
import { Link, useNavigate } from 'react-router-dom';
export default function ShowHeader() {

  const navigate = useNavigate();

  return (
    <header className="flex flex-col gap-6">
      <div className="flex items-center gap-5">
        <img src="/prachishead.png" className="w-20 h-20 rounded-full object-cover" alt="Prachi Priyadarshini" />
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-gray-900">Hi, I&apos;m Prachi 👋</h1>
          <p className="text-sm text-gray-500">Product builder &amp; messy fullstack dev</p>
        </div>
      </div>

      <p className="text-gray-700 text-base leading-relaxed">
        I build web apps for individuals who want their ideas out in the market.
        Some are live, some I&apos;m still shipping — everything I&apos;m working on lives below.
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <a
          href="https://calendar.app.google/c88iM7FpXWdA43Lu7"
          className="bg-gray-900 text-gray-100 hover:text-white px-4 py-2 rounded-md text-sm transition"
        >
          Book a call
        </a>
        <div className="flex gap-2">
          <SocialIcon url="https://www.linkedin.com/in/prachi-priyadarshini/" bgColor="black" style={{ height: 26, width: 26 }} />
          <SocialIcon url="https://github.com/prachip1" bgColor="black" style={{ height: 26, width: 26 }} />
          <SocialIcon url="mailto:prachiscoding@gmail.com" bgColor="black" style={{ height: 26, width: 26 }} />
          <SocialIcon url="https://www.threads.net/@justgetajobprachi" bgColor="black" style={{ height: 26, width: 26 }} />
          <SocialIcon url="https://www.instagram.com/justgetajobprachi/" bgColor="black" style={{ height: 26, width: 26 }} />
          <SocialIcon url="https://x.com/getajobprachi" bgColor="black" style={{ height: 26, width: 26 }} />
        </div>
      </div>
    </header>
  )
}
