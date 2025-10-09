import { CheckedState } from '@radix-ui/react-checkbox';
import React, { ComponentPropsWithoutRef } from 'react';
import { FieldPath, FieldValues, useFormContext } from 'react-hook-form';

import RequiredLabel from '@/components/forms/required-label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';

export type CheckBoxItem<TValue> = { label: string; value: TValue };

export type GetItemValueCallback<TValue> = (item: CheckBoxItem<TValue>, index: number) => string;

export type CheckboxesListFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TValue extends any = string,
> = Omit<ComponentPropsWithoutRef<typeof Checkbox>, 'name' | 'value' | 'onChange' | 'onBlur'> & {
  name: TName;
  label?: string;
  description?: string;
  items: CheckBoxItem<TValue>[];
  getItemValue?: GetItemValueCallback<TValue>;
  onChangeFieldValue?: (value: TValue, checked: CheckedState) => void;
};

export function CheckboxesListFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TValue extends any = string,
>({
  name,
  label,
  description,
  required,
  disabled,
  onChangeFieldValue,
  items,
  getItemValue,
  ...props
}: CheckboxesListFormFieldProps<TFieldValues, TName, TValue>) {
  const ctx = useFormContext<TFieldValues>();
  return (
    <FormField
      name={name}
      control={ctx.control}
      render={({ field: { value, ...field }, fieldState, formState }) => {
        return (
          <FormItem>
            {label && (
              <Label className={fieldState.error && 'text-destructive'}>
                {label}
                {required && <RequiredLabel className="ml-1" />}
              </Label>
            )}
            {items.map((item, index) => {
              const checkboxItemValue = getItemValue?.(item, index) ?? `${item.value}`;
              return (
                <FormField
                  key={checkboxItemValue}
                  name={name}
                  control={ctx.control}
                  render={() => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          disabled={formState.isSubmitting || disabled}
                          {...props}
                          checked={value?.includes(checkboxItemValue)}
                          onCheckedChange={(checked) => {
                            checked
                              ? field.onChange([...value, checkboxItemValue])
                              : field.onChange(value?.filter((v: any) => v !== checkboxItemValue));
                            onChangeFieldValue?.(item.value, checked);
                          }}
                          {...field}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">{item.label}</FormLabel>
                    </FormItem>
                  )}
                ></FormField>
              );
            })}
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
