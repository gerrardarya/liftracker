import { SelectProps } from '@radix-ui/react-select';
import React from 'react';
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from '@/components/ui/select';
import { colorNames, swatchColorPoint } from '@/constants';
import { cn } from '@/lib/utils';
import { makeBackgroundColorClassesFromName } from '@/utilities';

export interface ColorSwatchFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<SelectProps, 'name' | 'value'> {
  name: TName;
  label?: string;
  description?: string;
  selectLabel?: string;
  onChangeFieldValue?: (value: string) => void;
}

interface ColorSwatchProps extends SelectProps {
  selectLabel?: string;
}

export function ColorSwatch({ selectLabel, ...props }: ColorSwatchProps) {
  return (
    <Select {...props}>
      <SelectTrigger className="px-2 py-1">
        <div
          className={cn(
            'text-2xl rounded-full w-4 h-4',
            props.defaultValue && `bg-${props.defaultValue}-${swatchColorPoint}`,
          )}
        ></div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="px-0 text-center">{selectLabel}</SelectLabel>
          {colorNames.map((colorName) => (
            <SelectItem
              key={colorName}
              value={colorName}
              className={cn(
                ...makeBackgroundColorClassesFromName(colorName),
                'my-1 h-8 rounded-none text-primary-foreground hover:text-primary-foreground focus:text-primary-foreground',
              )}
            ></SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export function ColorSwatchFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  description,
  required,
  disabled,
  selectLabel,
  onChangeFieldValue,
  ...props
}: ColorSwatchFormFieldProps<TFieldValues, TName>) {
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
            <FormControl>
              <ColorSwatch
                name={name}
                disabled={formState.isSubmitting || disabled}
                {...props}
                defaultValue={field.value}
                selectLabel={selectLabel}
                onValueChange={(value) => {
                  field.onChange(value);
                  onChangeFieldValue?.(value);
                }}
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
