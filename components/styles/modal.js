import dynamic from "next/dynamic";

// Material
const Button = dynamic(() => import("@material-ui/core/Button"));
const Dialog = dynamic(() => import("@material-ui/core/Dialog"));
const DialogActions = dynamic(() => import("@material-ui/core/DialogActions"));
const DialogContent = dynamic(() => import("@material-ui/core/DialogContent"));
const DialogContentText = dynamic(() =>
  import("@material-ui/core/DialogContentText")
);
const DialogTitle = dynamic(() => import("@material-ui/core/DialogTitle"));

const ModalEvent = (props) => {
  let open = props.open;
  let setOpen = props.setOpen;
  let handleClose = props.handleClose;
  let infoEvent = props.infoEvent;
  let dateStr = infoEvent ? infoEvent.dateStr : null;

  const close = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Date du rendez-vous"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {dateStr}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Ok
        </Button>
        <Button onClick={close} color="primary" autoFocus>
          Annuler
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalEvent;
