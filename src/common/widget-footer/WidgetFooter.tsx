import { IconButton } from "@mui/material";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { TDirection } from "../../interfaces/types";
import "./WidgetFooter.css";

interface WidgetFooterProps {
  disableLeftBtn: boolean;
  disableRightBtn: boolean;
  handleOnClick: (direction: TDirection) => void;
}

const WidgetFooter = ({
  disableLeftBtn,
  disableRightBtn,
  handleOnClick,
}: WidgetFooterProps) => {
  return (
    <div className="widget-footer">
      <IconButton
        className={`button ${
          disableLeftBtn ? "inactive-button" : "active-button"
        }`}
        disabled={disableLeftBtn}
        onClick={() => handleOnClick("LEFT")}
      >
        <ArrowLeft className="icon" />
      </IconButton>
      <IconButton
        className={`button ${
          disableRightBtn ? "inactive-button" : "active-button"
        }`}
        disabled={disableRightBtn}
        onClick={() => handleOnClick("RIGHT")}
      >
        <ArrowRight className="icon" />
      </IconButton>
    </div>
  );
};

export default WidgetFooter;
