import React from "react";
import { useRouterContext, TitleProps } from "@refinedev/core";
import Button from "@mui/material/Button";

import { logo, homefinder } from "assets";

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const { Link } = useRouterContext();

  return (
    <Button fullWidth variant="text" disableRipple>
      <Link to="/">
        {collapsed ? (
          <img src={logo} alt="HomeFinder Logo" width="28px" />
        ) : (
          <img src={homefinder} alt="HomeFinder Logo" width="140px" />
        )}
      </Link>
    </Button>
  );
};
