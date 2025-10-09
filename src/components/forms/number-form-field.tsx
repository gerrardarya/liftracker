import React, { ChangeEventHandler, ComponentPropsWithoutRef } from 'react';
import { FieldPath, FieldValues, useFormContext } from 'react-hook-form';

import RequiredLabel from '@/components/forms/required-label';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export type NumberFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<
  ComponentPropsWithoutRef<typeof Input>,
  'type' | 'name' | 'value' | 'onChange' | 'onBlur'
> & {
  name: TName;
  label?: string;
  unitLabel?: string;
  description?: string;
  hasValueChangedFeedback?: boolean;
  onChangeFieldValue?: ChangeEventHandler<HTMLInputElement>;
};

export function NumberFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  unitLabel,
  description,
  required,
  disabled,
  onChangeFieldValue,
  hasValueChangedFeedback,
  className,
  ...props
}: NumberFormFieldProps<TFieldValues, TName>) {
  const ctx = useFormContext<TFieldValues>();
  return (
    <FormField
      name={name}
      control={ctx.control}
      render={({ field: { onChange, ...field }, formState, fieldState }) => {
        return (
          <FormItem>
            {label && (
              <FormLabel>
                {label}
                {required && <RequiredLabel className="ml-1" />}
              </FormLabel>
            )}
            <FormControl>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  disabled={formState.isSubmitting || disabled}
                  {...props}
                  onChange={(event) => {
                    onChange(event.target.value);
                    onChangeFieldValue?.(event);
                  }}
                  className={cn(
                    hasValueChangedFeedback && fieldState.isDirty && 'bg-warning',
                    className,
                  )}
                  {...field}
                />
                {unitLabel && <span className="text-xs">{unitLabel}</span>}
              </div>
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
