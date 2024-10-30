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
import { Alert, Button } from '@mui/material';

function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectResponseDTO[]>([]);
  const { token, logout } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleError = (error: Error) => {
    console.log(error);
    setErrorMessage(error.message);    
  }

  const deleteProject = (id: string) => {
    deleteProjectById(id, token, (data:  null | ErrorResponseDto) => {
      console.log(data);
      if(data !== null && 'statusCode' in data) {
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
    if('statusCode' in data) {
      if(data.statusCode === 401) {
        console.log(data.statusCode);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="wrapper">
      <NavBar position='static' title='Projects'>
        {token !== '' &&  <Button aria-label="previous" variant="outlined" color="inherit" sx={{  m: 1 }} onClick={() => navigate('/add')}>add project</Button>}
        {token !== '' &&  <Button aria-label="previous" variant="outlined" color="inherit" sx={{  m: 1 }} onClick={() => logout()}>Logout</Button>}
        {token === '' &&  <Button aria-label="previous" variant="outlined" color="inherit" sx={{  m: 1 }} onClick={() => navigate('/login')}>Login as artist</Button>}
      </NavBar>
      {errorMessage && 
        <div className="error-container">
          <Alert severity="error" sx={{ width: '100%', maxWidth: '1300px;', boxSizing: 'border-box' }}>{errorMessage}</Alert>
        </div>
      }
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
