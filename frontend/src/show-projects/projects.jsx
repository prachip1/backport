const [project1, setProject1] = useState({
  id: 'boarded-gif2',
  title: "boarded- a task management tool.",
  description: "A tool with kanban board and drag & drop feature.",
  tag:"Reactjs, Tailwind CSS, Firebase, Daisy UI, Netlify",
  link: "https://boarded.netlify.app/",

});

const [project2, setProject2] = useState({
  id: 'yourtyme',
  title: "yourtyme- a web timezone tool",
  description: "Invite global member and view each others current time.",
  tag:"MERN stack, Tailwind CSS, Daisy UI,Vercel",
  link: "https://yourtyme.vercel.app/",

});

const [project3, setProject3] = useState({
  id:'aitripplannervd',
  title:'TripAI - a simple AI trip planner',
  description: 'Plan your Trip using AI and get your itineraries in 1 minute',
  tag:'AI Wrapper, ReactJS, Firebase, Google Gemini',
  link:'https://tripai-one.vercel.app/',
  
})
 
 
 
 
 {/* Project 1 */}
  <div className="flex flex-col justify-center items-center lg:justify-normal lg:items-start gap-6 w-screen lg:w-full 
  bg-base-300 p-4 lg:p-8 rounded-md shadow-xl">
   
   <img src="./placeholderport.png" />
 

    <div className="flex flex-col gap-2 w-full pl-2 pr-2">
      <h3 className="text-xl font-bold">{project1.title}</h3>
      <p className="text-xs font-light bg-slate-900 text-slate-400 p-1 rounded-lg">{project1.tag}</p>
      <p>{project1.description}</p>
    </div>
    <div className="flex gap-8 mt-4 pl-2 pr-2">
      {/** <Link href={`/projects/${project1.id}/boarded-gif2`} passHref>
        <button className="btn bg-primary text-black">
          Check the project
        </button>
      </Link>*/}
      <a href={project1.link} target="_blank" rel="noopener noreferrer">
        <button className="btn bg-white text-base-300 tracking-tighter hover:bg-slate-900 hover:text-slate-200">
          Visit Website
        </button>
      </a>
    </div>

  </div>

  {/* Project 2 */}
  <div className="flex flex-col justify-center items-center lg:justify-normal lg:items-start gap-6 w-screen lg:w-full 
  bg-base-300 p-4 lg:p-8 rounded-md shadow-xl">
  
  <img src="./placeholderport.png" />
   
    <div className="flex flex-col gap-2 w-full pl-2 pr-2">
      <h3 className="text-xl font-bold">{project2.title}</h3>
      <p className="text-xs font-light bg-slate-900 text-slate-400 p-1 rounded-lg">{project2.tag}</p>
      <p>{project2.description}</p>
    </div>
    <div className="flex gap-8 mt-4 pl-2 pr-2">
      {/*<Link href={`/projects/${project2.id}/design-changes-tyme`} passHref>
        <button className="btn bg-primary text-black">
          Check the project
        </button>
      </Link> */}
      <a href={project2.link} target="_blank" rel="noopener noreferrer">
        <button className="btn  bg-white text-base-300 tracking-tighter hover:bg-slate-900 hover:text-slate-200">
          Visit Website
        </button>
      </a>
    </div>
 
  </div>


     {/* Project 3 */}
     <div className="flex flex-col justify-center items-center lg:justify-normal lg:items-start gap-6 w-screen lg:w-full 
  bg-base-300 p-4 lg:p-8 rounded-md shadow-xl">
  
      <img src="./placeholderport.png" />
   
    <div className="flex flex-col gap-2 w-full pl-2 pr-2">
      <h3 className="text-xl font-bold">{project3.title}</h3>
      <p className="text-xs font-light bg-slate-900 text-slate-400 p-1 rounded-lg">{project3.tag}</p>
      <p>{project3.description}</p>
    </div>
    <div className="flex gap-8 mt-4 pl-2 pr-2">
      {/*<Link href={`/projects/${project2.id}/design-changes-tyme`} passHref>
        <button className="btn bg-primary text-black">
          Check the project
        </button>
      </Link> */}
      <a href={project3.link} target="_blank" rel="noopener noreferrer">
        <button className="btn  bg-white text-base-300 tracking-tighter hover:bg-slate-900 hover:text-slate-200">
          Visit Website
        </button>
      </a>
    </div>
 
  </div>