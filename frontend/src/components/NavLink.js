import React from "react";
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import { NavLink as RouterNavLink } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
const NavLink = /*#__PURE__*/forwardRef(({
  className,
  activeClassName,
  pendingClassName,
  to,
  ...props
}, ref) => {
  return /*#__PURE__*/React.createElement(RouterNavLink, _extends({
    ref: ref,
    to: to,
    className: ({
      isActive,
      isPending
    }) => cn(className, isActive && activeClassName, isPending && pendingClassName)
  }, props));
});
NavLink.displayName = "NavLink";
export { NavLink };