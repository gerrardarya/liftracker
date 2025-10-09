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
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export type TextAreaFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<ComponentPropsWithoutRef<typeof Textarea>, 'name' | 'value' | 'onChange' | 'onBlur'> & {
  name: TName;
  label?: string;
  description?: string;
  hasValueChangedFeedback?: boolean;
  onChangeFieldValue?: ChangeEventHandler<HTMLTextAreaElement>;
};

export function TextAreaFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  description,
  required,
  disabled,
  hasValueChangedFeedback,
  onChangeFieldValue,
  className,
  ...props
}: TextAreaFormFieldProps<TFieldValues, TName>) {
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
              <Textarea
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
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
