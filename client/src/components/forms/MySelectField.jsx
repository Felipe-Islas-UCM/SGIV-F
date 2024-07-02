import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Controller } from 'react-hook-form';
import { FormHelperText } from "@mui/material";

export default function MySelectField(props) {
  const { label, name, control,width,content, axios_error, error_content } = props

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
            error = {axios_error}
            >
              {content}
            </Select>
          )}
        />
        <FormHelperText error= {axios_error}>{error_content ? error_content : ''}</FormHelperText>
      </FormControl>
  );
}

//{content.map((item) => (
//  <><MenuItem value={10}>Ten</MenuItem><MenuItem value={20}>Twenty</MenuItem><MenuItem value={30}>Thirty</MenuItem></>
//))}  
