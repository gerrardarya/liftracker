import { ChevronsUpDown } from 'lucide-react';
import React from 'react';
import { FieldPath, FieldPathValue, FieldValues, useFormContext } from 'react-hook-form';

import { Combobox } from '@/components/forms/combobox';
import RequiredLabel from '@/components/forms/required-label';
import { ResponsiveSelector } from '@/components/layout/responsive-selector';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';

export interface ComboboxFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TValue extends FieldPathValue<TFieldValues, TName> = FieldPathValue<TFieldValues, TName>,
> {
  name: TName;
  label?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  items: { id: string; label: string; value: TValue }[];
  onChangeFieldValue?: (value: TValue) => void;
}

export function ComboboxFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TValue extends FieldPathValue<TFieldValues, TName> = FieldPathValue<TFieldValues, TName>,
>({
  name,
  label,
  description,
  required,
  disabled,
  placeholder,
  items,
  onChangeFieldValue,
}: ComboboxFormFieldProps<TFieldValues, TName, TValue>) {
  const ctx = useFormContext<TFieldValues>();
  return (
    <FormField
      name={name}
      control={ctx.control}
      render={({ field, formState }) => {
        return (
          <FormItem>
            {label && (
              <FormLabel>
                {label}
                {required && <RequiredLabel className="ml-1" />}
              </FormLabel>
            )}
            <ResponsiveSelector
              trigger={
                <FormControl>
                  <Button
                    variant="outline"
                    disabled={formState.isSubmitting || disabled}
                    role="combobox"
                    className={cn(
                      'w-full justify-between',
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    {placeholder}
                    <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              }
            >
              <Combobox
                items={items}
                onChangeFieldValue={onChangeFieldValue}
                selectedItem={field.value}
              />
            </ResponsiveSelector>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
