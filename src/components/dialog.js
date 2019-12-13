import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    minWidth: '500px',
  },
});

export default function AlertDialog({
 message, title, name, clicked 
}) {
  const [open, setOpen] = React.useState(true);
  const classes = useStyles();
  function handleClose() {
    setOpen(false);
    if (name === 'reset password') {
      clicked();
    }
  }

  return (
    <div>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent className={classes.root}>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export const Dialog2 = ({
 message, title, handleNo, handleYes 
}) => {
  const [open, setOpen] = React.useState(true);
  function handleClose() {
    setOpen(false);
  }
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleNo();
              handleClose();
            }}
            color="primary"
          >
            No
          </Button>
          <Button
            onClick={() => {
              handleYes();
              handleClose();
            }}
            color="primary"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
