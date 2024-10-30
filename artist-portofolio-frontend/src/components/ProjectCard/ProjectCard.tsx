import { Box, Button, Card, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import './ProjectCard.css'

export interface IProjectCardProps {
  id: string;
  title: string;
  description: string;
  imagesLink: string[],
  link: string;
  status?: string
  deleteProject?: (id: string) => void
}

const ProjectCard = ({ id, title, description, imagesLink, link, deleteProject }: IProjectCardProps) => {
  const { token } = useContext(AuthContext);
  const [imagesIndex, setImageIndex] = useState<number>(0);
  return (
    <Card className="card">
      <div className="image-container">
        <CardMedia
          component="img"
          sx={{ width: '350px', height: '350px' }}
          image={imagesLink[imagesIndex]}
          alt="Live from space album cover">
        </CardMedia>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', m: 1}}>
          <IconButton  
            onClick={() => setImageIndex(prevIndex => (prevIndex === 0) ? imagesLink.length - 1 : prevIndex - 1)}>
            <ArrowBackIcon />
          </IconButton>
          <IconButton 
            onClick={() => setImageIndex(prevIndex => (prevIndex === imagesLink.length - 1) ? 0 : prevIndex + 1)}>
            <ArrowForwardIcon />
          </IconButton>        
        </Box>        
      </div>    
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {title}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: 'text.secondary' }}
          >
            {description}
          </Typography>
        </CardContent>
        <Box>
        <Button aria-label="previous" sx={{  m: 1 }}>
          <a href={link} target="_blank">See website</a>
        </Button>
        {token !== '' && 
          <Link to={`/edit/${id}`}>
            <Button aria-label="previous" sx={{  m: 1 }}>
              Edit
            </Button>
          </Link>        
        }
        {token !== '' && 
          <Button onClick={() => {
              if(deleteProject) 
                deleteProject(id);
            }} 
            aria-label="previous" 
            sx={{  m: 1 }} 
            variant="outlined" 
            color="error">
            delete
          </Button>     
        }        
        </Box>
      </Box>
    </Card>
  );  
}

export default ProjectCard;