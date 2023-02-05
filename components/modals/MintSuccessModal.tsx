import {
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { FC } from "react";
import RedMuiButton from "../buttons/RedMuiButton";

type Props = {
  handleClose: () => void;
  imageUrlOfNft: string;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const MintSuccessModal: FC<Props> = ({ handleClose, imageUrlOfNft }) => {
  return (
    <Dialog
      open
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>
        {" "}
        <p className="text-red-500 text-2xl font-light text-center">
          Hooray! You minted your NFT!
        </p>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <img
            src={imageUrlOfNft}
            alt="NFT"
            className="h-100 w-100 object-contain rounded-xl mx-auto"
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <RedMuiButton variant="contained" size="small" onClick={handleClose}>
          Got it!
        </RedMuiButton>
      </DialogActions>
    </Dialog>
  );
};

export default MintSuccessModal;
