import React from 'react';
import { Box, Input, Typography } from '@mui/material';

interface IMultipleFileUploadProps {
  names: string[],
  files: File[],
  setFiles: (files: File[]) => void,
}

const MultipleFileUpload = ({ names, files, setFiles }: IMultipleFileUploadProps) => {

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      setFiles(Array.from(selectedFiles));
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2} sx={{ width: '100%', mt: 1, mb: 1}}>
      <Input
        type="file"
        onChange={handleFileChange}
        inputProps={{ multiple: true }} 
        sx={{ width: '100%'}}
      />
      <Box>
        {files.length > 0 ? (
          files.map((file, index) => (
            <Typography key={index}>{file.name}</Typography>
          ))
        ) : (
          names.map((name, index) => (
            <Typography key={index}>{name}</Typography>
          ))
        )}
      </Box>
    </Box>
  );
};

export default MultipleFileUpload;