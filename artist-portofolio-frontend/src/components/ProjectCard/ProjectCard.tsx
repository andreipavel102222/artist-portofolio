import { Box, Button, Card, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

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
  return (
    <Card sx={{ display: 'flex', width: '100%', position: 'relative', mt: 4}}>
      <CardMedia
        component="img"
        sx={{ width: '350px', height: '350px' }}
        image={imagesLink[0]}
        alt="Live from space album cover">
      </CardMedia>    
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
      <Box sx={{ display: 'flex', position: 'absolute', bottom: 0, left: 100 }}>
        <IconButton aria-label="delete">
          <ArrowBackIcon />
        </IconButton>
        <IconButton aria-label="delete">
          <ArrowForwardIcon />
        </IconButton>        
      </Box>
    </Card>
  );  
}

export default ProjectCard;