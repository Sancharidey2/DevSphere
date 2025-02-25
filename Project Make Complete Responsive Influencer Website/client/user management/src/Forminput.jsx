import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';


export default function Forminput({label,value,onchange,name,type,error,helperText}) {
    return (
        <Box sx={{ display: "flex", flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <FormControl sx={{width:'50%',mt:'10px',mb:'10px'}} variant="standard">
                {/* <InputLabel htmlFor="input-with-icon-adornment">
                    {label}
                </InputLabel> */}
                <TextField
                    id="input-with-icon-adornment"
                    value={value}
                    label={label}
                    onChange= {onchange}
                    name={name}
                    type={type}
                    error={error}
                    helperText={helperText}
                />
            </FormControl>
        </Box>
    )
}