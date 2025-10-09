import React, { ChangeEventHandler, ComponentPropsWithoutRef } from 'react';
import { FieldPath, PathValue, FieldValues, useFormContext } from 'react-hook-form';

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

export type InvoiceRegistrationNumberFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<
  ComponentPropsWithoutRef<typeof Input>,
  'type' | 'name' | 'value' | 'onChange' | 'onBlur'
> & {
  name: TName;
  label?: string;
  description?: string;
  hasValueChangedFeedback?: boolean;
  onChangeFieldValue?: ChangeEventHandler<HTMLInputElement>;
};

export function InvoiceRegistrationNumberFormField<
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
  onPaste,
  className,
  ...props
}: InvoiceRegistrationNumberFieldProps<TFieldValues, TName>) {
  const ctx = useFormContext<TFieldValues>();
  return (
    <FormField
      name={name}
      control={ctx.control}
      render={({ field: { value, onChange, ...field }, formState, fieldState }) => {
        if (typeof value !== 'string') {
          throw new TypeError('InvoiceRegistrationNumberField value must be a string');
        }
        return (
          <FormItem>
            {label && (
              <FormLabel>
                {label}
                {required && <RequiredLabel className="ml-1" />}
              </FormLabel>
            )}
            <FormControl>
              <div className="flex items-center justify-start">
                <div className="mx-2 text-lg font-bold">T</div>
                <Input
                  type="text"
                  disabled={formState.isSubmitting || disabled}
                  {...props}
                  value={value.replace(/\D/g, '').slice(0, 13)}
                  onChange={(event) => {
                    onChange(`T${event.target.value.replace(/\D/g, '').slice(0, 13)}`);
                    onChangeFieldValue?.(event);
                  }}
                  onPaste={(event) => {
                    event.preventDefault();
                    const clipboardData = event.clipboardData;
                    if (!clipboardData) {
                      return;
                    }
                    const pastedData = clipboardData.getData('text/plain');
                    // FIXME: とりあえず value が string でない場合は警告を表示することとして型アサーションする
                    const value = `T${pastedData.replace(/\D/g, '').slice(0, 13)}` as PathValue<
                      TFieldValues,
                      TName
                    >;
                    ctx.setValue(name, value);
                    onPaste?.(event);
                  }}
                  className={cn(
                    hasValueChangedFeedback && fieldState.isDirty && 'bg-warning',
                    className,
                  )}
                  {...field}
                />
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
