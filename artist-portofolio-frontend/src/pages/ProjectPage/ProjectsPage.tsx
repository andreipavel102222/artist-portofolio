import { useContext, useEffect, useState } from 'react';
import ProjectCard, { IProjectCardProps } from '../../components/ProjectCard/ProjectCard';
import './ProjectsPage.css'
import NavBar from '../../components/NavBar/NavBar';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getProjects } from '../../apis/getProjects';
import { ProjectResponseDTO } from '../../interfaces/ProjectResponseDTO';
import ErrorResponseDto from '../../interfaces/ErrorResponseDTO';
import { deleteProjectById } from '../../apis/deleteProject';

function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectResponseDTO[]>([]);
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleError = (error: Error) => {
    console.log(error);
  }

  const buttonHandler = () => {
    if(token === '') {
      navigate('/login')
    }
    else{
      logout();
    }
  }

  const deleteProject = (id: string) => {
    deleteProjectById(id, token, (data:  null | ErrorResponseDto) => {
      console.log(data);
      if(data !== null && 'error' in data) {
        if(data.statusCode === 401) {
          navigate('/login');    
          return;
        }
        else{
          throw new Error(data.message);
        }
      }
      const newProjects = projects.filter(project => project.id !== id);
      setProjects(newProjects);
    }, handleError)    
  }

  const handleGetProjects = (data:  ProjectResponseDTO[] | ErrorResponseDto) => {
    if('error' in data) {
      if(data.statusCode === 401) {
        navigate('/login');    
        return;
      }
      else{
        throw new Error(data.message);
      }
    }
    setProjects(data);      
  }

  useEffect(() => {
    getProjects(token, handleGetProjects, handleError)
  }, [])

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
