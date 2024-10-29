import { Box, Button, Card, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export interface IProjectCardProps {
  id: string;
  title: string;
  description: string;
  imagesLink: string[],
  link: string;
}

const ProjectCard = ({ title, description, imagesLink, link }: IProjectCardProps) => {
  return (
    <Card sx={{ display: 'flex', width: '100%', position: 'relative', mt: 4}}>
      <CardMedia
        component="img"
        sx={{ width: 350, height: 350 }}
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