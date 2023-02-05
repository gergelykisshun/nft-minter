import styled from "@emotion/styled";
import { Button, ButtonProps } from "@mui/material";
import { red } from "@mui/material/colors";

const RedMuiButton = styled(Button)<ButtonProps>(() => ({
  backgroundColor: red[600],
  "&:hover": {
    backgroundColor: red[700],
  },
}));

export default RedMuiButton;
