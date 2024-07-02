import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

export default function MyNumberField(props) {
  const { label, placeholder,width, name, control, axios_error, error_content} = props;
  return (
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { error },
          formState,
        }) => (
          <TextField
            value={value}
            onChange={onChange}
            id="outlined-basic"
            label={label}
            variant="standard"
            type="number"
            placeholder={placeholder}
            sx={{width:{width}}}
            error = {axios_error}
            helperText={error_content ? error_content : ''} // Mostrar el mensaje de error si está presente
          />
        )}
      />
  );
}