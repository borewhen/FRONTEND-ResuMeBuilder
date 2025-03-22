"use client";

import * as React from "react";
import * as Avatar from "@radix-ui/react-avatar";

export default function UserAvatar() {
  return (
    <Avatar.Root className="inline-flex items-center justify-center overflow-hidden select-none w-9 h-9 rounded-full bg-black/10">
      <Avatar.Image
        className="w-full h-full object-cover rounded-inherit"
        src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
        alt="Pedro Duarte"
      />
      <Avatar.Fallback className="w-full h-full flex items-center justify-center bg-white text-violet-700 text-[15px] font-medium leading-none">
        JD
      </Avatar.Fallback>
    </Avatar.Root>
  );
}
