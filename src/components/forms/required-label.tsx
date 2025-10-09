import React, { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

export interface RequiredLabelProps extends ComponentPropsWithoutRef<'span'> {}

export default function RequiredLabel({ className, ...props }: RequiredLabelProps) {
  return (
    <span className={cn('text-muted-foreground text-xs', className)} {...props}>
      (必須)
    </span>
  );
}
