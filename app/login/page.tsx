"use client";

import { useSession } from "next-auth/react";

export default () => {
  const { data, status } = useSession();

  if (status === "unauthenticated") {
    return <div>"please login you are unauthenticated"</div>;
  }

  return <div>you logged in successfully</div>;
};
