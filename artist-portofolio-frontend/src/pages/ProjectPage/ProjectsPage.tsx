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
    const url = `http://localhost:3000/projects/${token ? '' : 'visible'}`
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
  
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }    
    fetch(url, {
      method: 'GET',
      headers
    })
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

  const deleteProject = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Eroare la ștergerea datelor');
      }

      const newProjects = projects.filter(project => project.id !== id);
      setProjects(newProjects);
    } catch (error) {
      console.error('Eroare:', error);
    }    
  }

  return (
    <div className="wrapper">
      <NavBar position='static' buttonText={token !== '' ? 'logout' : 'log in as artist'} title='Projects' buttonHandler={buttonHandler}/>
      <div className="container">
        <div className="components" style={{ width: '100%' }}>
          {
            projects.map((project:IProjectCardProps) => <ProjectCard key={project.id} {...project} deleteProject={deleteProject}/>)
          }
        </div>
      </div>            
    </div>
  )
}

export default ProjectsPage;
