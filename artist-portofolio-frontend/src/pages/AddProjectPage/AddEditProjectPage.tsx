import { Alert, Button, FormControlLabel, Switch, TextField } from "@mui/material";
import NavBar from "../../components/NavBar/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import MultipleFileUpload from "../../components/FileInput/MultipleFileUpload";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

function AddEditProjectPage() {
  const [title, setTile] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [visible, setVisible] = useState(true);
  const [files, setFiles] = useState<File[]>([]);
  const [names, setNames] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();  
  const { id } = useParams();

  useEffect(() => {
    if( id ){
      fetch(`http://localhost:3000/projects/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          if(data.error) {
            throw new Error(data.message);
          }
          setTile(data.title);
          setDescription(data.description);
          setLink(data.link);
          setVisible(data.visible === 'VISIBLE' ? true : false);
          const newNames = data.imagesLink.map((link:string) => {
            const arrLink = link.split('/');
            return arrLink[arrLink.length - 1]
          })
          setNames(newNames);
          console.log(title);
          console.log(description);
          console.log(link);
          console.log(visible);
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage(error.message);
        });
    }    
  },[])

  const addProject = () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('link', link);
    formData.append('status', visible ? 'VISIBLE' : 'HIDDEN');
    files.forEach(file => {
      formData.append('file', file);
    })


    fetch('http://localhost:3000/projects', {
      method: 'POST',
      headers: {
        'Authorization' : `Bearer ${token}`
      },
      body: formData
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        if(data.error) {
          throw new Error(data.message);
        }
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message);
      });       
  }

  const editProject = () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('link', link);
    formData.append('status', visible ? 'VISIBLE' : 'HIDDEN');

    files.forEach(file => {
      formData.append('file', file);
    })
    
    fetch(`http://localhost:3000/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization' : `Bearer ${token}`
      },
      body: formData
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        if(data.error) {
          throw new Error(data.message);
        }
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message);
      });     
  }

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
              value={title}
              onChange={e => setTile(e.target.value)}
              onFocus={() => setErrorMessage('')}
              sx={{ width: '100%', mt: 1, mb: 1}}
            />
            <TextField 
              id="description"   
              label="Description" 
              variant="outlined"   
              multiline
              rows={6}
              value={description}
              onChange={e => setDescription(e.target.value)}     
              onFocus={() => setErrorMessage('')}                   
              sx={{ width: '100%', mt: 1, mb: 1}}
            />
            <TextField 
              id="link"   
              label="Link"
              variant="outlined"
              value={link}
              onChange={e => setLink(e.target.value)}
              onFocus={() => setErrorMessage('')}   
              sx={{ width: '100%', mt: 1, mb: 1}}
            />
            <FormControlLabel control={
                <Switch checked={visible} onChange={(e) => setVisible(e.target.checked)} onFocus={() => setErrorMessage('')}   />
              } 
              label="Visible" 
            />
            <MultipleFileUpload files={files} setFiles={setFiles} names={names}/>
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
