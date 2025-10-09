import { XIcon } from 'lucide-react';
import React, { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import { FieldPath, FieldValues, useFormContext } from 'react-hook-form';

import { IconButtonWithTooltip } from '@/components/forms/icon-button-with-tooltip';
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export type SelectItem<TValue> = { label: string; value: TValue };

export type GetItemValueCallback<TValue> = (item: SelectItem<TValue>, index: number) => string;

export type SelectFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TValue extends any = string,
> = Omit<PropsWithChildren<ComponentPropsWithoutRef<typeof Select>>, 'name' | 'value'> &
  Pick<ComponentPropsWithoutRef<typeof SelectTrigger>, 'className'> & {
    name: TName;
    label?: string;
    description?: string;
    placeholder?: string;
    items: SelectItem<TValue>[];
    getItemValue?: GetItemValueCallback<TValue>;
    clearable?: boolean;
    hasValueChangedFeedback?: boolean;
    onChangeFieldValue?: (value: string) => void;
  };

export function SelectFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TValue extends any = string,
>({
  name,
  label,
  description,
  required,
  disabled,
  clearable,
  hasValueChangedFeedback,
  getItemValue,
  onChangeFieldValue,
  placeholder,
  items,
  className,
  ...props
}: SelectFormFieldProps<TFieldValues, TName, TValue>) {
  const ctx = useFormContext<TFieldValues>();
  return (
    <FormField
      name={name}
      control={ctx.control}
      render={({ field: { onChange, ref: _, ...field }, formState, fieldState }) => {
        return (
          <FormItem>
            {label && (
              <FormLabel>
                {label}
                {required && <RequiredLabel className="ml-1" />}
              </FormLabel>
            )}
            <div className="flex w-full items-center">
              <Select
                disabled={formState.isSubmitting || disabled}
                {...props}
                onValueChange={(value) => {
                  onChange(value);
                  onChangeFieldValue?.(value);
                }}
                {...field}
              >
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      hasValueChangedFeedback && fieldState.isDirty && 'bg-warning',
                      className,
                    )}
                  >
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {items.map((item, index) => {
                    const selectItemValue = getItemValue?.(item, index) ?? `${item.value}`;
                    return (
                      <SelectItem key={selectItemValue} value={selectItemValue}>
                        {item.label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {clearable && (
                <IconButtonWithTooltip
                  variant="ghost"
                  tooltipContent="クリア"
                  disabled={!field.value}
                  onClick={() => {
                    onChange('');
                    onChangeFieldValue?.('');
                  }}
                >
                  <XIcon className="size-4" />
                </IconButtonWithTooltip>
              )}
            </div>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
