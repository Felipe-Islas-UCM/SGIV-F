import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Controller } from 'react-hook-form';

export default function MySelectField_Tiposusuario(props) {
  const { label, name, control,width,content } = props
  

  return (
      <FormControl variant="standard" sx={{width:{width}}}>
        <InputLabel id="demo-simple-select-filled-label">{label}</InputLabel>
        <Controller
          name={name}
          control={control}
          render={({
            field: { onChange, value },
            fieldState: { error },
            formState,
          }) => (
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={value}
              onChange={onChange}
            >   
              {content.map(tipousuario => {
                return (
                    <MenuItem key={tipousuario.id} value={tipousuario.id}>{tipousuario.nombre_tipo_usuario}</MenuItem>
                )
              })}
            </Select>
          )}
        />
      </FormControl>
  );
}