import React, { useEffect } from "react";
import { useAppSelector } from "@/hooks/useStoreTypes";
import { setCloseModal, closeAllModals } from "@/state/slices/uiSlice";
import { useAppDispatch } from "@/hooks/useStoreTypes";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

type Tooltip = {
  open?: boolean;
  content?: React.ReactNode;
  children: React.ReactNode;
  onOpenChange?: () => void;
};

export default function Tooltip({
  open,
  content,
  children,
  onOpenChange,
  ...props
}: Tooltip) {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root delayDuration={0} onOpenChange={onOpenChange}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content sideOffset={5}>
            {content}
            <TooltipPrimitive.Arrow className="fill-gray-100 w-3 h-3" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
