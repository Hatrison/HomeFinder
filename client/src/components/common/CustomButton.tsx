import { Button } from "@pankod/refine-mui";
import { CustomButtonProps } from "interfaces/common";
import { Link } from "react-router-dom";

const CustomButton = ({
  type,
  title,
  path,
  backgroundColor,
  color,
  fullWidth,
  icon,
}: CustomButtonProps) => {
  const Btn = () => {
    return (
      <Button
        type={type === "submit" ? "submit" : "button"}
        sx={{
          flex: fullWidth ? 1 : "unset",
          padding: "10px 15px",
          width: fullWidth ? "100%" : "fit-content",
          minWidth: 130,
          backgroundColor,
          color,
          fontSize: 16,
          fontWeight: 600,
          gap: "10px",
          textTransform: "capitalize",
          "&:hover": {
            opacity: 0.9,
            backgroundColor,
          },
        }}
      >
        {icon}
        {title}
      </Button>
    );
  };

  return path ? (
    <Link to={path}>
      <Btn />
    </Link>
  ) : (
    <Btn />
  );
};

export default CustomButton;
