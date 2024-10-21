import React from 'react'
import { RiNextjsLine } from "react-icons/ri";
import { TbBrandMongodb } from "react-icons/tb";
import { RiFirebaseLine } from "react-icons/ri";
import { SiGlide } from "react-icons/si";
import { RiTailwindCssLine } from "react-icons/ri";
import { IoLogoVercel } from "react-icons/io5";
import { SiNetlify } from "react-icons/si";
import { DiHeroku } from "react-icons/di";
import { SiDaisyui } from "react-icons/si";
import { FaFigma, FaReact } from "react-icons/fa";
export default function ShowTools() {
  return (
    <div>
           {/*tools i use */}
            <div className="flex flex-col justify-center items-center gap-8 mb-14">
      
        <h2 className="text-3xl">Tools I use.</h2>
     
     
       <div className="flex flex-col lg:flex-row justify-center items-center lg:mt-20 gap-8">
       <div className="flex gap-4">
       <FaFigma className="w-6 h-6 lg:w-20 lg:h-20" />
       <FaReact className="w-6 h-6 lg:w-20 lg:h-20" />
       <RiNextjsLine className="w-6 h-6 lg:w-20 lg:h-20" />  
       </div>
        
       <div className="flex gap-4">
       <RiTailwindCssLine className="w-6 h-6 lg:w-20 lg:h-20"  />
       <TbBrandMongodb className="w-6 h-6 lg:w-20 lg:h-20" />
       <RiFirebaseLine className="w-6 h-6 lg:w-20 lg:h-20" />
       </div>

       <div className="flex gap-4">
       <SiGlide className="w-6 h-6 lg:w-20 lg:h-20" />
       <IoLogoVercel className="w-6 h-6 lg:w-20 lg:h-20"/>
       <SiNetlify className="w-6 h-6 lg:w-20 lg:h-20"/>
       </div>
   
       <div className="flex gap-4">
       <DiHeroku className="w-6 h-6 lg:w-20 lg:h-20"/>
       <SiDaisyui className="w-12 h-12 lg:w-20 lg:h-20" />
       </div>
     
       </div>
      </div>
    </div>
  )
}
