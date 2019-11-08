import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: '30px 0px'
  },
  textField: {
    margin: '15px auto',
    width: '50%'
  },
}));

export default function CompanyForm() {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate autoComplete="off">

        <TextField
          id="outlined-basic"
          className={classes.textField}
          label="Name of Company Admin"
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          className={classes.textField}
          label="E-mail"
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          className={classes.textField}
          label="Phone"
          margin="normal"
          variant="outlined"
        />
    </form>
  );
}
