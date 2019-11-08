import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AccountType from "./AccountType"
import CompanyForm from "./CompanyForm"
import UserForm from './UserForm'
import {useInput} from "../utils/useInput"

const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
    // margin: '0 auto'
  },
  button: {
    // margin: '0 auto'
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(3, 2),
    width: '50%',
    margin: '20px auto'
  },
}));

function getSteps() {
  return ['Choose Your Account Type', 'Add Your Details'];
}

function getStepContent(step, company, setCompany, inputs, setInputs, handleInputChange, handleSubmit) {

  switch (step) {
    case 0:
      return <AccountType
                setCompany={setCompany} 
                company={company}
                />;
    case 1:
      if(company.company) {
        return <CompanyForm 
                  inputs={inputs} 
                  setInputs={setInputs} 
                  handleInputChange={handleInputChange} 
                  handleSubmit={handleSubmit} 
                  setCompany={setCompany} 
                  company={company}
                  />
      }else{
        return <UserForm 
                  inputs={inputs} 
                  setInputs={setInputs} 
                  handleInputChange={handleInputChange} 
                  handleSubmit={handleSubmit} 
                  setCompany={setCompany} 
                  company={company}
                  />
      } 
    // case 2:
    //   return 'This is the bit I really care about!';
    default:
      return 'Unknown step';
  }
}

export default function OnboardUser() {
  const classes = useStyles();
  
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [company, setCompany] = React.useState({company: false})
  const steps = getSteps();
  
  const {inputs, setInputs, handleInputChange, handleSubmit} = useInput(()=>{
    console.log(company.company)
    if(company.company){
      axios.post('http://localhost:5001/api/company',inputs)
      .then(res => console.log(res.data))
      .catch(err=> console.log(err.message))
    }
    else{
      axios.post('http://localhost:5001/api/users',inputs)
      .then(res => console.log(res.data))
      .catch(err=> console.log(err.message))
    }
  })
  const isStepOptional = step => {
    return step === '' ;
  };

  const isStepSkipped = step => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Paper className={classes.paper}>
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
>
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep, company, setCompany, inputs, setInputs, handleInputChange, handleSubmit)}</Typography>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )}

              <Button
                variant="contained"
                color="primary"
                // onClick={handleNext}
                className={classes.button}
                onClick={(e)=> activeStep === steps.length - 1 ? handleSubmit(e) : handleNext()}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
          </Grid>
        )}
      </div>
    </div>
    </Paper>
  );
}