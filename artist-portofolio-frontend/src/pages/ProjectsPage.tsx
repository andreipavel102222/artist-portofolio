import { useEffect, useState } from 'react';
import ProjectCard, { IProjectCardProps } from '../components/ProjectCard/ProjectCard';
import './ProjectsPage.css'

function ProjectsPage() {
  const [projects, setProjects] = useState<IProjectCardProps[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/projects/visible')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setProjects(data);
      })
      .catch((error) => {
        console.log(error);
      });    
  }, [])

  return (
    <div className="container">
      <div className="components" style={{ width: '100%' }}>
        {
          projects.map((project:IProjectCardProps) => <ProjectCard key={project.id} {...project}/>)
        }
      </div>
    </div>
  )
}

export default ProjectsPage;
