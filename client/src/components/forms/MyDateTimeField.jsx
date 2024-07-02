import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import { Controller } from 'react-hook-form';

export default function MyDateTimeField(props) {
  const {label, control,width, name} = props
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
      name={name}
      control={control}
      render= {({
        field:{onChange,value},
      }) => (
        <DateTimeField label={label} 
        sx={{width:{width}}}
        onChange={onChange}
        value={value} 
        />
      ) 
      }      
      />
    </LocalizationProvider>
  );
}