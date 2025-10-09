import React, { FormEvent, PropsWithChildren } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';

export interface ModalFormProps<T extends FieldValues> extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  form: UseFormReturn<T>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  submitButtonLabel: string;
}

export function ModalForm<T extends FieldValues>({
  isOpen,
  onClose,
  title,
  form,
  handleSubmit,
  children,
  submitButtonLabel,
}: ModalFormProps<T>) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit}>
            {children}
            <div className="flex justify-end gap-4">
              <Button type="submit">{submitButtonLabel}</Button>
              <Button variant="secondary" type="button" onClick={onClose}>
                キャンセル
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
