import { CheckedState } from '@radix-ui/react-checkbox';
import React, { ComponentPropsWithoutRef } from 'react';
import { FieldPath, FieldValues, useFormContext } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export type CheckboxFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TValue extends ComponentPropsWithoutRef<typeof Checkbox>['value'] = ComponentPropsWithoutRef<
    typeof Checkbox
  >['value'],
> = Omit<
  ComponentPropsWithoutRef<typeof Checkbox>,
  'name' | 'checked' | 'onChange' | 'onCheckedChange' | 'children'
> & {
  name: TName;
  label?: string;
  description?: string;
  onChangeFieldValue?: (value: TValue, checked: CheckedState) => void;
};

export function CheckboxFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  description,
  disabled,
  onChangeFieldValue,
  ...props
}: CheckboxFormFieldProps<TFieldValues, TName>) {
  const ctx = useFormContext<TFieldValues>();
  return (
    <FormField
      name={name}
      control={ctx.control}
      render={({ field: { value, onChange, ...field }, formState }) => {
        return (
          <FormItem>
            <div>
              <div className="flex flex-row items-center space-x-2">
                <FormControl>
                  <Checkbox
                    disabled={formState.isSubmitting || disabled}
                    checked={value}
                    onCheckedChange={(checked) => {
                      onChange(checked);
                      onChangeFieldValue?.(value, checked);
                    }}
                    {...props}
                    {...field}
                  />
                </FormControl>
                {label && <FormLabel className="font-normal">{label}</FormLabel>}
              </div>
              <div className="ml-6">
                {description && <FormDescription>{description}</FormDescription>}
                <FormMessage />
              </div>
            </div>
          </FormItem>
        );
      }}
    />
  );
}
