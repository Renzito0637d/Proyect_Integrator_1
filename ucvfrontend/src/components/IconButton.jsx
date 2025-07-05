import React from 'react';

const IconButton = ({
  type = "button",
  className = "",
  disabled = false,
  onClick,
  icon: Icon,
  iconStyle = { marginRight: 5 },
  children,
  ...props
}) => (
  <button
    type={type}
    className={`d-inline-flex align-items-center ${className}`}
    disabled={disabled}
    onClick={onClick}
    {...props}
  >
    {Icon && <Icon style={iconStyle} />}
    {children}
  </button>
);

export default IconButton;