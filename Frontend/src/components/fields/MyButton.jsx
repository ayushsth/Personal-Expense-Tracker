import * as React from 'react'
import Button from '@mui/material/Button';

export default function MyButton(props) {
  const {label,onClick}=props
  return (
      <Button variant="contained" onClick={onClick} className={'myForm'}>
        {label}
      </Button>
  );
}