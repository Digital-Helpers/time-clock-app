import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';

export default function AccountType(props) {

  const handleChange = e => {
    props.setCompany(e.target.checked );
  };

  return (
    <FormGroup style={{margin: '0 auto'}} row>

        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Employee</Grid>
          <Grid item>
          <Switch
            checked={props.company}
            onChange={e => handleChange(e)}
            value={props.company}
            color="primary"
          />
          </Grid>
          <Grid item>Company</Grid>
        </Grid>
    </FormGroup>
  );
}
