import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Controller, useFormState } from 'react-hook-form';


export default function BasicTextFields(props) {
  const { label,placeholder,name,control } = props
  return (
    
      <Controller
      name = {name}
      control={control}
      render={({
        field:{onChange, value},
        fieldState:{error},
        formState,
      }) => (<Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
      <TextField id="outlined-basic" label={label} variant="outlined" placeholder={placeholder}/>
      
      </Box>
      )
    }
      />
    
  );
}