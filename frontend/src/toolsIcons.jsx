// toolsIcons.js (Example file containing some icons)
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaPython, FaGit, FaFigma } from 'react-icons/fa';

//import { SiJavascript, SiTypescript, SiAdobeXd } from 'react-icons/si';
import { RiJavascriptFill } from "react-icons/ri";
import { BiLogoTypescript } from "react-icons/bi";
import { SiShadcnui } from "react-icons/si";
import { RiNextjsLine } from "react-icons/ri";
import { TbBrandMongodb } from "react-icons/tb";
import { RiFirebaseLine } from "react-icons/ri";
import { SiGlide } from "react-icons/si";
import { RiTailwindCssLine } from "react-icons/ri";
import { IoLogoVercel } from "react-icons/io5";
import { SiNetlify } from "react-icons/si";
import { DiHeroku } from "react-icons/di";
import { SiDaisyui } from "react-icons/si";
import { VercelLogoIcon } from '@radix-ui/react-icons';


export const toolIcons = [
    { name: 'React', icon: <FaReact />, category: 'Programming Language' },
  { name: 'Node.js', icon: <FaNodeJs />, category: 'Programming Language' },
 { name: 'JavaScript', icon: <RiJavascriptFill />, category: 'Programming Language' },
  { name: 'TypeScript', icon: <BiLogoTypescript />, category: 'Programming Language' },
  { name: 'HTML5', icon: <FaHtml5 />, category: 'Programming Language' },
  { name: 'CSS3', icon: <FaCss3Alt />, category: 'Programming Language' },
  { name: 'Python', icon: <FaPython />, category: 'Programming Language' },
  { name: 'Git', icon: <FaGit />, category: 'Tool' },
  { name: 'Figma', icon: <FaFigma />, category: 'Design Tool' },
 // { name: 'Adobe XD', icon: <SiAdobeXd />, category: 'Design Tool' },
  { name: 'DaisyUI', icon:<SiDaisyui />, category: 'CSS'},
  { name: 'ShadCN', icon:<SiShadcnui />, category: 'CSS'},
  { name: 'NextJS', icon:<RiNextjsLine />, category: 'Programming Language'},
  { name: 'Tailwind CSS', icon:<RiTailwindCssLine />, category: 'Programming Language'},
  { name: 'MongoDB', icon:<TbBrandMongodb />,category:'Database'},
  {name:'Firebase',icon:<RiFirebaseLine />, category:'Database as a service'},
  {name:'Glide',icon:<SiGlide />, category:'No Code tool'},
  {name:'Vercel', icon:<IoLogoVercel />, category:'Platform'},
  {name:'Netlify', icon:<SiNetlify />, category:'Platform'},
  {name:'Heroku',icon:<DiHeroku />, category:'Platform'}
  
];
