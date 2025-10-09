import React, { ChangeEventHandler, ComponentPropsWithoutRef, useCallback } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { FieldPath, FieldValues, PathValue, useFormContext } from 'react-hook-form';

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

export type MultipleFileDropzoneFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<
  ComponentPropsWithoutRef<typeof Input>,
  'type' | 'name' | 'value' | 'multiple' | 'onChange' | 'onBlur'
> & {
  name: TName;
  label?: string;
  description?: string;
  hasValueChangedFeedback?: boolean;
  onChangeFieldValue?: ChangeEventHandler<HTMLInputElement>;
};

export function MultipleFileDropzoneFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  description,
  required,
  readOnly,
  disabled,
  placeholder,
  hasValueChangedFeedback,
  onChangeFieldValue,
  className,
  ...props
}: MultipleFileDropzoneFormFieldProps<TFieldValues, TName>) {
  const ctx = useFormContext<TFieldValues>();
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      ctx.setValue(name, acceptedFiles as PathValue<TFieldValues, TName>, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    },
    [ctx, name],
  );
  const onFileDialogCancel = useCallback(() => {
    ctx.reset();
  }, [ctx]);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    onFileDialogCancel,
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  return (
    <FormField
      name={name}
      control={ctx.control}
      render={() => {
        return (
          <FormItem>
            {label && (
              <FormLabel>
                {label}
                {required && <RequiredLabel className="ml-1" />}
              </FormLabel>
            )}
            <FormControl>
              <div>
                <div
                  {...getRootProps()}
                  className="flex h-20 items-center justify-center border-2 border-dotted hover:cursor-pointer"
                >
                  <input {...getInputProps()} accept={props.accept} />
                  <div className="text-xs">ドラッグ&ドロップ、またはファイルを選択</div>
                </div>
                {files.length > 0 && (
                  <aside className="text-xs">
                    <h4>選択中のファイル {files.length} 件</h4>
                    <ul className="max-h-40 overflow-auto">{files}</ul>
                  </aside>
                )}
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
