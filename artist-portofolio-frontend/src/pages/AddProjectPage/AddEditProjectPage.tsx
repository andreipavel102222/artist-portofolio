import { Alert, Button, FormControlLabel, Switch, TextField } from "@mui/material";
import NavBar from "../../components/NavBar/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import MultipleFileUpload from "../../components/FileInput/MultipleFileUpload";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import CreateEditProjectDto from "../../interfaces/CreateEditProjectResponseDTO";
import ErrorResponseDto from "../../interfaces/ErrorResponseDTO";
import { createProject } from "../../apis/createProject";
import { updateProject } from "../../apis/updateProject";
import { getProjectById } from "../../apis/getProjectById";
import { ProjectResponseDTO } from "../../interfaces/ProjectResponseDTO";

interface IProjectInfo {
  title: string,
  description: string,
  link: string, 
  visible: boolean,
  files: File[],
}

const getFormDataFromJSON = (projectInfo: IProjectInfo): FormData => {
  const formData = new FormData();
  formData.append('title', projectInfo.title);
  formData.append('description', projectInfo.description);
  formData.append('link', projectInfo.link);
  formData.append('status', projectInfo.visible ? 'VISIBLE' : 'HIDDEN');
  
  projectInfo.files.forEach(file => {
    formData.append('file', file);
  })

  return formData;
}

function AddEditProjectPage() {
  const [projectInfo, setProjectInfo] = useState<IProjectInfo>({
    title: '',
    description: '',
    link: '',
    visible: true,
    files: [],
  });
  const [names, setNames] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();  
  const { id } = useParams();

  const handleError = (error: Error) => {
    console.log(error);
    setErrorMessage(error.message);    
  }

  const handleGetByIdRequest = (data:  ProjectResponseDTO | ErrorResponseDto) => {
    if('error' in data) {
      if(data.statusCode === 401) {
        navigate('/login');    
        return;
      }
      else{
        throw new Error(data.message);
      }
    }
    setProjectInfo((projectInfo) => { 
      return  {
        ...projectInfo,
        title: data.title, 
        description: data.description, 
        link: data.link, 
        visible: data.status === 'VISIBLE' ? true : false
      }
    });
    const newNames = data.imagesLink.map((link:string) => {
      const arrLink = link.split('/');
      return arrLink[arrLink.length - 1]
    })
    setNames(newNames);        
  }

  const handleRequest = (data: CreateEditProjectDto | ErrorResponseDto) => {
    if('error' in data) {
      if(data.statusCode === 401) {
        navigate('/login');
        return;    
      }
      else{
        throw new Error(data.message);
      }
    }
    navigate('/');      
  } 

  const addProject = () => {
    const formData = getFormDataFromJSON(projectInfo);
    createProject(token, formData, handleRequest, handleError)  
  }

  const editProject = () => {
    const formData = getFormDataFromJSON(projectInfo);
    updateProject(id, token, formData, handleRequest, handleError);
  }

  useEffect(() => {
    if( id ){
      getProjectById(id, token,  handleGetByIdRequest, handleError)
    }    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className="wrapper" style={{  height: '100vh' }}>
      <NavBar title="Login" buttonText="Go to Projects" buttonHandler={() => navigate('/')}/>
      <div className="container login-wrapper">
        <div className="login-container">
          {errorMessage !== '' && <Alert severity="error" sx={{ minWidth: '100%',  boxSizing: 'border-box' }}>{errorMessage}</Alert>}
            <TextField 
              id="title"   
              label="Title"
              variant="outlined"
              value={projectInfo.title}
              onChange={e => setProjectInfo((projectInfo) => {return {...projectInfo, title: e.target.value}})}
              onFocus={() => setErrorMessage('')}
              sx={{ width: '100%', mt: 1, mb: 1}}
            />
            <TextField 
              id="description"   
              label="Description" 
              variant="outlined"   
              multiline
              rows={6}
              value={projectInfo.description}
              onChange={e => setProjectInfo((projectInfo) => {return {...projectInfo, description: e.target.value}})}
              onFocus={() => setErrorMessage('')}                   
              sx={{ width: '100%', mt: 1, mb: 1}}
            />
            <TextField 
              id="link"   
              label="Link"
              variant="outlined"
              value={projectInfo.link}
              onChange={e => setProjectInfo((projectInfo) => {return {...projectInfo, link: e.target.value}})}
              onFocus={() => setErrorMessage('')}   
              sx={{ width: '100%', mt: 1, mb: 1}}
            />
            <FormControlLabel control={
                <Switch checked={projectInfo.visible} onChange={e => setProjectInfo((projectInfo) => {return {...projectInfo, visible: e.target.checked}})} onFocus={() => setErrorMessage('')}   />
              } 
              label="Visible" 
            />
            <MultipleFileUpload files={projectInfo.files} setFiles={(files) => setProjectInfo((projectInfo) => {return {...projectInfo, files: files}})} names={names}/>
            <Button 
              variant="contained"
              color="primary"
              aria-label="menu"
              sx={{ width: '100%', mt: 1, mb: 1, height: '3.5em'}}
              onClick={() => id ? editProject() : addProject()}
              >
                {id ? 'Edit project' : 'Add project'}
            </Button>
        </div>
      </div>            
    </div>
  )
}

export default AddEditProjectPage;
