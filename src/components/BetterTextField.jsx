import * as React from 'react';
import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';


export default function ComposedTextField(props) {
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        marginBottom: 1,
        backgroundColor: 'none',
      }}
    >
      <FormControl fullWidth variant="filled">
        <InputLabel>{props.label}</InputLabel>
        <FilledInput fullWidth type={props.type} onChange={props.onChange} disableUnderline={true} sx={{ backgroundColor: 'transparent', border: 1, borderColor: 'gray', borderRadius: 2,}}/>
      </FormControl>
    </Box>
  );
}
