import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { fire } from '../servises/firebase';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function IconLabelButtons() {
  const classes = useStyles();
  const logout = () => {
    fire.auth().signOut();
  };

  return (
    <Button
      variant="contained"
      color="default"
      className={classes.button}
      startIcon={<CloudUploadIcon />}
      onClick={logout}
    >
      LogOff
    </Button>
  );
}
