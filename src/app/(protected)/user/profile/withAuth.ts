"use client";

import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";

const withAuth = (WrappedComponent: any) => {
  return function AuthComponent(props: any) {
    const router = useRouter();
    const { role } = useUserStore();

    useEffect(() => {
      if (role === "unregistered") {
        router.replace("/details-form");
      }
    }, [role, router]);

    if (role === "unregistered") {
      return null;
    }
    return React.createElement(WrappedComponent, props);
  };
};

export default withAuth;