import React, { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export interface IconButtonWithTooltipProps
  extends ComponentPropsWithoutRef<typeof Button>,
    PropsWithChildren {
  tooltipContent: string;
}

export function IconButtonWithTooltip({
  children,
  tooltipContent,
  className,
  ...props
}: IconButtonWithTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {props.disabled ? (
          <span>
            <Button
              tabIndex={0}
              type="button"
              size="icon"
              className={cn('rounded-full', className)}
              {...props}
            >
              {children}
            </Button>
          </span>
        ) : (
          <Button type="button" size="icon" className={cn('rounded-full', className)} {...props}>
            {children}
          </Button>
        )}
      </TooltipTrigger>
      <TooltipContent>{tooltipContent}</TooltipContent>
    </Tooltip>
  );
}
