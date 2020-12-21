import { makeStyles, Tab } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  tabRoot: {
    width: '100%',
    height: '40px!important',
    padding: '0',
    minHeight: '40px!important',
  },
  tabSelected: {
    color: '#00b46e',
  },
  root: {
    flexGrow: 1,
    backgroundColor: 'inherit',
    display: 'flex',
  },
  tabs: {
    width: '35%',
  },
  indicator: {
    display: 'none',
  },
  tabWrapper: {
    '& > span': {
      display: 'flex',
      flexDirection: 'row!important',
      justifyContent: 'flex-start',
      height: '40px',

      '& > svg': {
        marginRight: '10px',
      },
    },
    textTransform: 'none!important',
  },
}));

const TabMenu = ({ index, icon, label }) => {
  const classes = useStyles();
  return (
    <Tab
      label={label}
      id={`vertical-tab-${index}`}
      aria-controls={`vertical-tabpanel-${index}`}
      fullWidth
      icon={icon}
      centered="false"
      className={classes.tabWrapper}
      disableFocusRipple
      disableRipple
      classes={{
        root: classes.tabRoot,
        wrapper: classes.tabWrapper,
        selected: classes.tabSelected,
      }}
    />
  );
};

export default TabMenu;
