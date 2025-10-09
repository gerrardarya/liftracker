import React, { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

export interface OptionalLabelProps extends ComponentPropsWithoutRef<'span'> {}

export default function OptionalLabel({ className, ...props }: OptionalLabelProps) {
  return (
    <span className={cn('text-muted-foreground', className)} {...props}>
      (任意)
    </span>
  );
}
