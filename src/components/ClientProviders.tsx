"use client";

import { SessionProvider } from "next-auth/react";

const ClientProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default ClientProviders;
