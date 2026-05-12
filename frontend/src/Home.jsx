import ShowHeader from './show-header';
import ShowTools from './show-tools';
import Authenticate from './autheticate';
import Footer from './footer';
import HomeProjects from './home-projects';


export default function Home() {
  return (
    <div data-theme="black" className='font-display min-h-screen bg-white'>
      <Authenticate />
      <main className="max-w-3xl mx-auto px-6 py-16 flex flex-col gap-20">
        <ShowHeader />
        <HomeProjects />
        <section className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold text-gray-900">Tools I use</h2>
          <ShowTools />
        </section>
        <Footer />
      </main>
    </div>
  )
}
