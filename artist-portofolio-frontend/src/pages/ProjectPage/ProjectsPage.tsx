import { useContext, useEffect, useState } from 'react';
import ProjectCard, { IProjectCardProps } from '../../components/ProjectCard/ProjectCard';
import './ProjectsPage.css'
import NavBar from '../../components/NavBar/NavBar';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function ProjectsPage() {
  const [projects, setProjects] = useState<IProjectCardProps[]>([]);
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/projects/visible')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Something went wrong');
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

  const buttonHandler = () => {
    if(token === '') {
      navigate('/login')
    }
    else{
      logout();
    }
  }

  return (
    <div className="wrapper">
      <NavBar position='static' buttonText={token !== '' ? 'logout' : 'log in as artist'} title='Projects' buttonHandler={buttonHandler}/>
      <div className="container">
        <div className="components" style={{ width: '100%' }}>
          {
            projects.map((project:IProjectCardProps) => <ProjectCard key={project.id} {...project}/>)
          }
        </div>
      </div>            
    </div>
  )
}

export default ProjectsPage;
