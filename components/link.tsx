import React from 'react';
import NextLink from 'next/link';

export const Link: React.FC<{ href: string }> = ({ href, children }) => {
  return (
    <NextLink href={href}>
      <a className="link">{children}</a>
    </NextLink>
  );
};