import ErrorResponseDto from "../interfaces/ErrorResponseDTO";
import { ProjectResponseDTO } from "../interfaces/ProjectResponseDTO";


export function getProjects(token: string | null, handle: (data:  ProjectResponseDTO[] | ErrorResponseDto) => void, errorHandle: (error: Error) => void) {
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
    return response.json();
  })
  .then((data) => {
    handle(data);
  })
  .catch((error) => {
    errorHandle(error)
  });  
}