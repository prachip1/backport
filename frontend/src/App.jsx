import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Home from './Home';
import Authenticate from './autheticate';
import ConnectWebsite from './connect-website';
import AddContents from './add-contents';
import AddProjects from './add-contents/add-projects';
import ShowProjects from './show-projects';
import EditProject from './show-projects/EditProject';
import ProjectCarousel from './show-projects/ProjectCarousel';
import AddTools from './add-contents/add-tools';
import YourApiKeys from './your-api-keys';
import UpdateData from './updates';
import Footer from './footer';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authenticate" element={<Authenticate />} />
        <Route path="/connect-website" element={<ConnectWebsite />} />
        
        <Route
          path="/add-contents"
          element={
            <ProtectedRoute>
              <AddContents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-projects"
          element={
            <ProtectedRoute>
              <AddProjects />
            </ProtectedRoute>
          }
        />
        <Route path="/show-projects" element={<ShowProjects />} />
        <Route
          path="/show-projects/edit/:projectId"
          element={
            <ProtectedRoute>
              <EditProject />
            </ProtectedRoute>
          }
        />
        <Route path="/project-car" element={<ProjectCarousel />} />
        <Route
          path="/add-tools"
          element={
            <ProtectedRoute>
              <AddTools />
            </ProtectedRoute>
          }
        />
        <Route path="/your-api-keys" element={<YourApiKeys />} />
        <Route
          path="/updates"
          element={
            <ProtectedRoute>
              <UpdateData />
            </ProtectedRoute>
          }
        />
        <Route path="/footer" element={<Footer />} />
      </Routes>
    </div>
  );
}

export default App;
