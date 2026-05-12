import React from 'react'
import { SocialIcon } from 'react-social-icons';
import { Link, useNavigate } from 'react-router-dom';
export default function ShowHeader() {

  const navigate = useNavigate();

  return (
    <header className="flex flex-col items-center text-center gap-5">
      <img src="/prachishead.png" className="w-24 h-24 rounded-full object-cover" alt="Prachi Priyadarshini" />

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-gray-900">Prachi Priyadarshini</h1>
        <p className="text-sm text-gray-500">Founder &amp; Developer</p>
      </div>

      <p className="text-gray-700 text-base max-w-md leading-relaxed">
        I build web apps for individuals who want their ideas out in the market. Here&apos;s what I&apos;ve shipped so far.
      </p>

      <div className="flex gap-3 mt-1">
        <SocialIcon url="https://www.linkedin.com/in/prachi-priyadarshini/" bgColor="black" style={{ height: 28, width: 28 }} />
        <SocialIcon url="https://github.com/prachip1" bgColor="black" style={{ height: 28, width: 28 }} />
        <SocialIcon url="mailto:prachiscoding@gmail.com" bgColor="black" style={{ height: 28, width: 28 }} />
        <SocialIcon url="https://www.threads.net/@justgetajobprachi" bgColor="black" style={{ height: 28, width: 28 }} />
        <SocialIcon url="https://www.instagram.com/justgetajobprachi/" bgColor="black" style={{ height: 28, width: 28 }} />
        <SocialIcon url="https://x.com/getajobprachi" bgColor="black" style={{ height: 28, width: 28 }} />
      </div>

      <a
        href="https://calendar.app.google/c88iM7FpXWdA43Lu7"
        className="mt-2 bg-gray-900 text-gray-100 hover:text-white px-5 py-2 rounded-md text-sm transition"
      >
        Book a call
      </a>
    </header>
  )
}
