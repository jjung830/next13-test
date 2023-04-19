// Breakpoints
export const lgDesktopBreakpoint = 1440;
export const smDesktopBreakpoint = 1200;
export const tabletBreakpoint = 1023;
export const mobileBreakpoint = 750;
export const smMobileBreakpoint = 360;

// Media Queries
export const lgDesktopQuery =
  "only screen and (max-width: " + lgDesktopBreakpoint + "px)";
export const smDesktopQuery =
  "only screen and (max-width: " + smDesktopBreakpoint + "px)";
export const tabletQuery =
  "only screen and (max-width: " + tabletBreakpoint + "px)";
export const mobileQuery =
  "only screen and (max-width: " + mobileBreakpoint + "px)";
export const smMobileQuery =
  "only screen and (max-width: " + smMobileBreakpoint + "px)";

// Media Queries (mobile first)
// I'm adding a "+1" so our desktop-first and mobile-first change at the same breakpoints

export const xlDesktopQueryM = `only screen and (min-width: ${
  lgDesktopBreakpoint + 1
}px)`;
export const lgDesktopQueryM = `only screen and (min-width: ${
  smDesktopBreakpoint + 1
}px)`;
export const smDesktopQueryM = `only screen and (min-width: ${
  tabletBreakpoint + 1
}px)`;
export const tabletQueryM = `only screen and (min-width: ${
  mobileBreakpoint + 1
}px)`;
export const mobileQueryM = `only screen and (min-width: ${
  smMobileBreakpoint + 1
}px)`;
