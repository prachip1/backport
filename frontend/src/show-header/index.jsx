import React from 'react'
import { SocialIcon } from 'react-social-icons';
import { Link, useNavigate } from 'react-router-dom';
export default function ShowHeader() {

  const navigate = useNavigate();

  return (
    <div>
       <div className="flex flex-col justify-center items-center gap-8">
       
          <div className="w-24 rounded-full">
            <img src="/prachishead.png" className='w-24 rounded-full' alt="Profile" />
          </div>
      
        <h2 className="text-lg font-semibold cursor-pointer">Prachi Priyadarshini</h2>
        <p className="text-gray-900 font-regular text-lg text-center">I build web apps for individuals who want their ideas<br></br>out in the market.</p>
        <div className="flex gap-4">
         <SocialIcon url="https://www.linkedin.com/in/prachi-priyadarshini/" bgColor="black" style={{ height: 30, width: 30 }} />
         <SocialIcon url="https://github.com/prachip1" bgColor="black"  style={{ height: 30, width: 30 }}/>
         <SocialIcon url="mailto:prachiscoding@gmail.com" bgColor="black"  style={{ height: 30, width: 30 }} />
         <SocialIcon url="https://www.threads.net/@justgetajobprachi" bgColor="black"  style={{ height: 30, width: 30 }}/>
         <SocialIcon url="https://www.instagram.com/justgetajobprachi/" bgColor="black"  style={{ height: 30, width: 30 }}/>
          <SocialIcon url="https://x.com/getajobprachi" bgColor="black"  style={{ height: 30, width: 30 }}/>
        </div>
        
        <div className="flex gap-4">
          <button className="btn bg-gray-900 text-gray-300 px-6 py-2 rounded-md text-base-300 hover:text-white"><a href="https://calendar.app.google/c88iM7FpXWdA43Lu7">Book a call</a></button>
         {/** <button className="btn bg-base-300 hover:bg-base-100"><a href="https://calendly.com/prachiscoding/15min">Book a Call</a></button>*/} 
        </div>
      </div>
    </div>
  )
}
