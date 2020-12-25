import { Stepper, Step, StepLabel, withStyles, StepConnector, makeStyles } from '@material-ui/core';
import {
  Assignment as AssignmentIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  BusinessCenter as BusinessCenterIcon,
  AirportShuttle as AirportShuttleIcon,
  Check as CheckIcon,
} from '@material-ui/icons';
import clsx from 'clsx';

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 40,
  },
  active: {
    '& $line': {
      backgroundColor: '#00b46e!important',
    },
  },
  completed: {
    '& $line': {
      backgroundColor: '#00b46e!important',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: 'white',
    border: '4px solid #ced4da',
    zIndex: 1,
    color: '#ced4da',
    width: 80,
    height: 80,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    border: '4px solid #00b46e',
    background: 'white',
    color: '#00b46e',
  },
  completed: {
    border: '4px solid #00b46e',
    background: 'white',
    color: '#00b46e',
  },
});

function ColorlibStepIcon({ icon, active, completed }) {
  const classes = useColorlibStepIconStyles();

  const icons = {
    1: <AssignmentIcon fontSize="large" />,
    2: <AssignmentTurnedInIcon fontSize="large" />,
    3: <BusinessCenterIcon fontSize="large" />,
    4: <AirportShuttleIcon fontSize="large" />,
    5: <CheckIcon fontSize="large" />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(icon)]}
    </div>
  );
}

const steps = ['Chờ xác nhận', 'Đã xác nhận', 'Đang xử lý', 'Đang giao hàng', 'Hoàn tất'];

const OrderDetailStep = ({ activeStep = 1 }) => (
  <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
    {steps.map((label) => (
      <Step key={label}>
        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
      </Step>
    ))}
  </Stepper>
);

export default OrderDetailStep;
