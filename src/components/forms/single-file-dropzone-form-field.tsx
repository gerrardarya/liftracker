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

export type SingleFileDropzoneFormFieldProps<
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
  onDropFiles?: (files: FileWithPath[]) => void;
  onDropzoneFileDialogCancel?: () => void;
};

export function SingleFileDropzoneFormField<
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
  onDropFiles,
  onDropzoneFileDialogCancel,
  className,
  ...props
}: SingleFileDropzoneFormFieldProps<TFieldValues, TName>) {
  const ctx = useFormContext<TFieldValues>();
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      ctx.setValue(name, acceptedFiles[0] as PathValue<TFieldValues, TName>, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
      onDropFiles?.(acceptedFiles);
    },
    [ctx, name, onDropFiles],
  );
  const onFileDialogCancel = useCallback(() => {
    ctx.reset();
    onDropzoneFileDialogCancel?.();
  }, [ctx, onDropzoneFileDialogCancel]);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop,
    onFileDialogCancel,
  });
  const files = acceptedFiles.map((file) => (
    <span key={file.name}>
      {file.name} - {file.size} bytes
    </span>
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
              <div
                {...getRootProps()}
                className="flex min-h-10 items-center justify-center border-2 border-dotted p-2 hover:cursor-pointer"
              >
                <input {...getInputProps()} accept={props.accept} />
                {files.length === 0 && (
                  <div className="text-xs">ドラッグ&ドロップ、またはファイルを選択</div>
                )}
                {files.length > 0 && (
                  <div className="w-full text-xs">
                    <h4 className="font-bold">選択中のファイル</h4>
                    <div>{files}</div>
                  </div>
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
