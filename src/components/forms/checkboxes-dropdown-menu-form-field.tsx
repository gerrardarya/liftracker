import { CheckedState } from '@radix-ui/react-checkbox';
import { ComponentPropsWithoutRef } from 'react';
import { FieldPath, FieldValues, useFormContext } from 'react-hook-form';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export type CheckBoxItem<TValue> = { label: string; value: TValue };

export type GetItemValueCallback<TValue> = (item: CheckBoxItem<TValue>, index: number) => string;

export type CheckboxesDropdownFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TValue extends any = string,
> = Omit<
  ComponentPropsWithoutRef<typeof DropdownMenuCheckboxItem>,
  'name' | 'value' | 'checked' | 'onChange' | 'onBlur' | 'onCheckedChange' | 'className'
> &
  Pick<ComponentPropsWithoutRef<typeof Input>, 'className'> & {
    name: TName;
    label?: string;
    description?: string;
    items: CheckBoxItem<TValue>[];
    onChangeFieldValue?: (value: TValue, checked: CheckedState) => void;
  };

export function CheckboxesDropdownMenuFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TValue extends any = string,
>({
  name,
  label,
  description,
  disabled,
  items,
  className,
  ...props
}: CheckboxesDropdownFormFieldProps<TFieldValues, TName, TValue>) {
  const ctx = useFormContext<TFieldValues>();
  return (
    <FormField
      name={name}
      control={ctx.control}
      render={({ field, fieldState, formState }) => {
        return (
          <FormItem>
            {label && <Label className={fieldState.error && 'text-destructive'}>{label}</Label>}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Input
                  name={name}
                  value={items
                    .filter((item) => field.value?.includes(item.value))
                    .map((item) => item.label)
                    .join(', ')}
                  disabled={formState.isSubmitting || disabled}
                  className={className}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>{label}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-96 overflow-auto">
                  {items.map((item, index) => (
                    <CheckboxesDropdownMenuItemFormField
                      name={name}
                      key={`${item.value}` || index}
                      disabled={formState.isSubmitting || disabled}
                      {...props}
                      index={index}
                      item={item}
                    >
                      {item.label}
                    </CheckboxesDropdownMenuItemFormField>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

export type CheckboxesDropdownMenuItemFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TValue extends any = string,
> = Omit<
  ComponentPropsWithoutRef<typeof DropdownMenuCheckboxItem>,
  'checked' | 'onChange' | 'onBlur' | 'onCheckedChange'
> & {
  name: TName;
  index: number;
  item: CheckBoxItem<TValue>;
  getItemValue?: GetItemValueCallback<TValue>;
  onChangeFieldValue?: (value: TValue, checked: CheckedState) => void;
};

export function CheckboxesDropdownMenuItemFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TValue extends any = string,
>({
  name,
  disabled,
  onChangeFieldValue,
  children,
  index,
  item,
  getItemValue,
  onSelect,
  ...props
}: CheckboxesDropdownMenuItemFormFieldProps<TFieldValues, TName, TValue>) {
  const ctx = useFormContext<TFieldValues>();
  const checkboxItemValue = getItemValue?.(item, index) ?? `${item.value}`;
  return (
    <FormField
      name={name}
      control={ctx.control}
      render={({ field: { value, ...field }, formState }) => (
        <FormItem>
          <FormControl>
            <DropdownMenuCheckboxItem
              disabled={formState.isSubmitting || disabled}
              {...props}
              checked={value?.includes(checkboxItemValue)}
              onCheckedChange={(checked) => {
                checked
                  ? field.onChange([...value, checkboxItemValue])
                  : field.onChange(value?.filter((v: any) => v !== checkboxItemValue));
                onChangeFieldValue?.(item.value, checked);
              }}
              onSelect={(event) => event.preventDefault()}
              {...field}
            >
              {children}
            </DropdownMenuCheckboxItem>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
