import { Menu, Fade } from '@material-ui/core';

const MenuDropDown = ({ anchorEl, handleClose, open, children }) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    anchorEl={anchorEl}
    keepMounted
    open={open}
    onClose={handleClose}
    TransitionComponent={Fade}
  >
    {/* children include menu item  */}
    {children}
  </Menu>
);

export default MenuDropDown;
