import NextLink from "next/link";
import { ReactNode } from "react";

interface LinkProps {
  href: string;
  children: ReactNode; // ✅ Agregado para que Next.js reconozca los hijos del componente
}

export const Link: React.FC<LinkProps> = ({ href, children }) => {
  return (
    <NextLink href={href} className="link">
      {children}
    </NextLink>
  );
};