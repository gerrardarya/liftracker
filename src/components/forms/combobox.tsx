import { CheckIcon } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';

export interface ComboboxProps<TValue> {
  items: { id: string; label: string; additional?: string; value: TValue }[];
  onChangeFieldValue?: (value: TValue) => void;
  onClickNewValue?: (value: string) => void;
  selectedItem?: TValue | null;
}

export function Combobox<TValue>({
  items,
  onChangeFieldValue,
  onClickNewValue,
  selectedItem,
}: ComboboxProps<TValue>) {
  const [value, setValue] = useState('');
  const [selectedValue, setSelectedValue] = useState<TValue | null>(selectedItem ?? null);
  return (
    <Command>
      <CommandInput onValueChange={(event) => setValue(event)} value={value} placeholder="検索" />
      <CommandList>
        <CommandEmpty className="p-1 text-left">
          {onClickNewValue ? (
            <Button
              onClick={() => {
                onClickNewValue?.(value);
                setValue('');
              }}
              variant="ghost"
              className="h-8 w-full bg-accent py-2 text-left"
            >
              追加 {value}
            </Button>
          ) : (
            `結果がありません`
          )}
        </CommandEmpty>
        {items.length > 0 && (
          <CommandGroup>
            {items.map((item) => (
              <CommandItem
                key={item.id}
                value={item.label}
                onSelect={() => {
                  onChangeFieldValue?.(item.value);
                  setSelectedValue(item.value);
                }}
              >
                <CheckIcon
                  className={cn(
                    'ml-auto h-4 w-4',
                    selectedValue === item.value ? 'opacity-100' : 'opacity-0',
                  )}
                />
                <div className="flex w-full items-center justify-between">
                  <span>{item.label}</span>
                  <span className="text-xs tracking-widest text-muted-foreground">
                    {item.additional}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
}
