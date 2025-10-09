import { addYears, format, formatISO, parse, subYears } from 'date-fns';
import { ja } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import React from 'react';
import { DateFormatter, DayPickerSingleProps } from 'react-day-picker';
import { FieldPath, FieldValues, useFormContext } from 'react-hook-form';

import RequiredLabel from '@/components/forms/required-label';
import { Calendar } from '@/components/ui/calendar';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { formatDate } from '@/data-format';
import { cn } from '@/lib/utils';

export type DatePickerFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<DayPickerSingleProps, 'mode' | 'selected' | 'onChange' | 'onSelect'> & {
  name: TName;
  label?: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  hasValueChangedFeedback?: boolean;
  defaultSelection?: string;
  minDate?: Date;
  maxDate?: Date;
  onChangeFieldValue?: (date?: Date) => void;
};

const formatCaption: DateFormatter = (date) => format(date, 'yoMo', { locale: ja });

export function DatePickerFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  placeholder,
  description,
  required,
  disabled,
  hasValueChangedFeedback,
  defaultSelection,
  minDate = subYears(new Date(), 10),
  maxDate = addYears(new Date(), 10),
  onChangeFieldValue,
  className,
  ...props
}: DatePickerFieldProps<TFieldValues, TName>) {
  const ctx = useFormContext<TFieldValues>();

  return (
    <FormField
      name={name}
      control={ctx.control}
      render={({ field: { value: fieldValue, onChange, ...field }, formState, fieldState }) => {
        return (
          <FormItem>
            {label && (
              <FormLabel>
                {label}
                {required && <RequiredLabel className="ml-1" />}
              </FormLabel>
            )}
            <Popover>
              <div className="relative w-full">
                <PopoverTrigger className="w-full">
                  <CalendarIcon className="absolute left-0 top-1/2 mx-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <FormControl>
                    <Input
                      type="text"
                      placeholder={placeholder}
                      value={formatDate(fieldValue, { fallback: fieldValue })}
                      onChange={(event) => {
                        onChange(event.target.value);
                      }}
                      onBlur={(event) => {
                        try {
                          const date = parse(event.target.value, 'yyyy/MM/dd', new Date());
                          onChange(
                            formatISO(new Date(date), {
                              representation: 'date',
                            }),
                          );
                          onChangeFieldValue?.(date);
                        } catch (error) {
                          onChange('');
                        }
                      }}
                      disabled={disabled}
                      className={cn(
                        'w-full pl-10',
                        hasValueChangedFeedback && fieldState.isDirty && 'bg-warning',
                        className,
                      )}
                    />
                  </FormControl>
                </PopoverTrigger>
              </div>

              <PopoverContent
                onOpenAutoFocus={(event) => {
                  event.preventDefault();
                }}
                className="w-auto p-0"
                align="start"
              >
                <div className="flex items-center justify-between px-3 py-2"></div>
                <Calendar
                  mode="single"
                  disabled={
                    !formState.isSubmitting && disabled
                      ? disabled
                      : (date) => formState.isSubmitting || date > maxDate || date < minDate
                  }
                  locale={ja}
                  formatters={{ formatCaption }}
                  {...props}
                  selected={fieldValue}
                  onSelect={(day, selectDay, activeModifier, event) => {
                    if (day) {
                      onChange(formatISO(day, { representation: 'date' }));
                      onChangeFieldValue?.(day);
                    } else {
                      onChange('');
                    }
                  }}
                />
              </PopoverContent>
            </Popover>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
