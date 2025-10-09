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

export type NumericStringFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<
  ComponentPropsWithoutRef<typeof Input>,
  'type' | 'name' | 'value' | 'onChange' | 'onBlur' | 'inputMode'
> & {
  name: TName;
  label?: string;
  description?: string;
  hasValueChangedFeedback?: boolean;
  onChangeFieldValue?: ChangeEventHandler<HTMLInputElement>;
};

export function NumericStringFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  description,
  required,
  disabled,
  onChangeFieldValue,
  hasValueChangedFeedback,
  className,
  ...props
}: NumericStringFormFieldProps<TFieldValues, TName>) {
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
              <Input
                type="text"
                inputMode="numeric"
                disabled={formState.isSubmitting || disabled}
                {...props}
                onChange={(event) => {
                  onChange(event.target.value.replaceAll(/[^0-9]/g, ''));
                  onChangeFieldValue?.(event);
                }}
                className={cn(
                  hasValueChangedFeedback && fieldState.isDirty && 'bg-warning',
                  className,
                )}
                {...field}
              />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
