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
    // width: '50%'
  },
}));

export default function UserForm({inputs, handleInputChange, handleSubmit}) {

  const classes = useStyles();

  return (
    <form onSubmit={(e)=> handleSubmit(e)} className={classes.container} noValidate autoComplete="off">

        <TextField
          id="outlined-basic"
          className={classes.textField}
          label="Name"
          margin="normal"
          variant="outlined"
          name="name"
          value={inputs.name}
          onChange={(e)=> handleInputChange(e)}
        />
        <TextField
          id="outlined-basic"
          className={classes.textField}
          label="E-mail"
          margin="normal"
          variant="outlined"
          name="email"
          value={inputs.email}
          onChange={(e)=> handleInputChange(e)}
        />
        {/* <TextField
          id="outlined-basic"
          className={classes.textField}
          label="Phone"
          margin="normal"
          variant="outlined"
        /> */}
    </form>
  );
}
