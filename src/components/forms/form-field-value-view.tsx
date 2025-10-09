import { ReactNode } from 'react';
import {
  FieldPath,
  FieldValues,
  FormState,
  useFormContext,
  UseFormGetFieldState,
  useWatch,
} from 'react-hook-form';

export type FormFieldValueRender<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = ({
  value,
  name,
  formState,
  fieldState,
}: {
  value: TFieldValues[TName];
  name: TName;
  formState: FormState<TFieldValues>;
  fieldState: ReturnType<UseFormGetFieldState<TFieldValues>>;
}) => ReactNode;

export type FormFieldValueViewProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  render?: FormFieldValueRender<TFieldValues, TName>;
};

export function FormFieldValueView<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, render = ({ value }) => `${value}` }: FormFieldValueViewProps<TFieldValues, TName>) {
  const ctx = useFormContext<TFieldValues>();
  const value = useWatch({ name, control: ctx.control });
  return render({
    value,
    name,
    formState: ctx.formState,
    fieldState: ctx.getFieldState(name),
  });
}
