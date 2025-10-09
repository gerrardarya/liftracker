import React, { Fragment } from 'react';
import { FieldPath, FieldValues, useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export type RadioOption = { id?: string; label: string; value: string; description?: string };

export type RadioGroupFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  label?: string;
  description?: string;
  options: RadioOption[];
  required?: boolean;
  disabled?: boolean;
  className?: string;
  horizontal?: boolean;
};

export function RadioGroupFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  description,
  options,
  required,
  disabled,
  className,
  horizontal = false,
}: RadioGroupFormFieldProps<TFieldValues, TName>) {
  const ctx = useFormContext<TFieldValues>();

  return (
    <FormField
      name={name}
      control={ctx.control}
      render={({ field, formState }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              disabled={formState.isSubmitting || disabled}
              className={horizontal ? 'flex flex-col sm:flex-row' : 'flex flex-col'}
            >
              {options.map((option) => (
                <Fragment key={option.id ?? option.value}>
                  <label
                    htmlFor={`${name}-${option.value}`}
                    className="flex cursor-pointer items-center space-x-2 rounded border p-3"
                  >
                    <RadioGroupItem value={option.value} id={`${name}-${option.value}`} />
                    <span className="text-sm">{option.label}</span>
                  </label>
                  {option.description && (
                    <span className="text-xs text-gray-400">{option.description}</span>
                  )}
                </Fragment>
              ))}
            </RadioGroup>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
