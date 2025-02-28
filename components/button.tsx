import React, { ReactNode } from "react";

interface TouchTargetProps {
  children: ReactNode; // ✅ Definimos explícitamente `children`
}

export const TouchTarget: React.FC<TouchTargetProps> = ({ children }) => {
  return <button className="touch-target">{children}</button>;
};