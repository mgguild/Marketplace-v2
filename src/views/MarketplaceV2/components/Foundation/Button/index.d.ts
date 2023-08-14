import React from "react";

export interface Props extends React.HTMLProps<HTMLButtonElement> {
  iconType?: string;
  icon?: string;
}