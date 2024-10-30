import ErrorResponseDto from "../interfaces/ErrorResponseDTO";
import { ProjectResponseDTO } from "../interfaces/ProjectResponseDTO";

export function getProjectById(id: string | undefined, token: string | null, handle: (data:  ProjectResponseDTO | ErrorResponseDto) => void, errorHandle: (error: Error) => void) {
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
    handle(data);
  })
  .catch((error) => {
    errorHandle(error)
  });  
}