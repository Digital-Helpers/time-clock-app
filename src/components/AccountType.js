import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';

export default function AccountType(props) {
  const [state, setState] = React.useState({
    isCompany: false,
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <FormGroup style={{margin: '0 auto'}} row>

        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Employee</Grid>
          <Grid item>
          <Switch
            checked={state.isCompany}
            onChange={handleChange('isCompany')}
            value="isCompany"
            color="primary"
          />
          </Grid>
          <Grid item>Company</Grid>
        </Grid>
    </FormGroup>
  );
}
