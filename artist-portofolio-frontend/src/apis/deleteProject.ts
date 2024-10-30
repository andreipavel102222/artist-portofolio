import ErrorResponseDto from "../interfaces/ErrorResponseDTO";


export function deleteProjectById(id: string | undefined, token: string | null, handle: (data:  null | ErrorResponseDto) => void, errorHandle: (error: Error) => void) {
  fetch(`http://localhost:3000/projects/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })
  .then((response) => {
    console.log(response.headers.get('content-length'));
    return response.headers.get('content-length') === '0' ? null : response.json();
  })
  .then((data) => {
    handle(data);
  })
  .catch((error) => {
    errorHandle(error)
  });  
}