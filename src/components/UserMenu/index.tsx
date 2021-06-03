import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface IUserMenu {
  title: string;
  href: string;
  onClick: () => void;
}

interface IMenuItem {
  items: IUserMenu[];
}

const UserMenu: React.FC<RouteComponentProps & IMenuItem> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
      >
        {props.items.map((i) => (
          <MenuItem
            onClick={() => {
              handleClose();
              i.onClick();
              props.history.push(i.href);
            }}
            key={i.title}
          >
            {i.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default withRouter(UserMenu);
