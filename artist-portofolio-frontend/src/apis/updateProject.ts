import CreateProjectDto from "../interfaces/CreateEditProjectResponseDTO";
import ErrorResponseDto from "../interfaces/ErrorResponseDTO";


export function updateProject(id: string | undefined, token: string | null, formData: FormData, handle: (data: CreateProjectDto | ErrorResponseDto) => void, errorHandle: (error: Error) => void) {
  fetch(`http://localhost:3000/projects/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization' : `Bearer ${token}`
    },
    body: formData
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