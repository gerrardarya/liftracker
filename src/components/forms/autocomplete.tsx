import { Command as CommandPrimitive } from 'cmdk';
import { CheckIcon, Search } from 'lucide-react';
import React, {
  ComponentProps,
  ComponentPropsWithoutRef,
  ForwardedRef,
  forwardRef,
  type KeyboardEvent,
  useCallback,
  useState,
} from 'react';

import { CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';

export interface AutocompleteItem<TValue> {
  id: string;
  label: string;
  additional?: string;
  value: TValue;
}

export type GetSelectedItemCallback<TValue> = (
  item: AutocompleteItem<TValue>,
  value: string,
  index: number,
) => boolean;

export type GetItemPropsCallback<TValue> = (
  item: AutocompleteItem<TValue>,
  value: string,
  index: number,
) => ComponentProps<typeof CommandItem> | null;

export type AutocompleteProps<TValue extends any> = Omit<
  ComponentPropsWithoutRef<typeof CommandPrimitive.Input>,
  'onSelect'
> & {
  value?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  emptyMessage?: string;
  items: AutocompleteItem<TValue>[];
  getSelectedItem?: GetSelectedItemCallback<TValue>;
  getItemProps?: GetItemPropsCallback<TValue>;
  onChange?: (value: string) => void;
  onSelect?: (value: AutocompleteItem<TValue> | null) => void;
};

function AutocompleteInner<TValue extends any>(
  {
    value,
    items,
    getItemProps,
    getSelectedItem,
    emptyMessage,
    onChange,
    onSelect,
    onBlur,
    onFocus,
    className,
    ...props
  }: AutocompleteProps<TValue>,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const [isOpen, setIsOpen] = useState(false);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>, value?: string) => {
      // Keep the options displayed when the user is typing
      if (!isOpen) {
        setIsOpen(true);
      }

      // This is not a default behaviour of the <input /> field
      if (event.key === 'Enter' && value) {
        const optionToSelect = items.find((item) => item.label === value) ?? null;
        onSelect?.(optionToSelect);
      }

      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    },
    [isOpen, items, onSelect],
  );

  const handleSelectItem = useCallback(
    (item: AutocompleteItem<TValue>) => {
      onChange?.(item.label);
      onSelect?.(item);
      setIsOpen(false);
    },
    [onChange, onSelect],
  );
  const isItemListOpen = isOpen && items.length > 0;
  return (
    <CommandPrimitive
      filter={(_, search, keywords) => {
        if (!keywords) {
          return 0;
        }

        return keywords.some((keyword) => keyword.toLowerCase().includes(search.toLowerCase()))
          ? 1
          : 0;
      }}
      className="size-full rounded-md bg-popover text-popover-foreground"
      onKeyDown={(event) => handleKeyDown(event, value)}
    >
      <div
        className={cn(
          'flex h-10 items-center border-input px-3 py-2 text-sm',
          isItemListOpen ? 'border rounded-t-md' : 'border rounded-md ',
          className,
        )}
        cmdk-input-wrapper=""
      >
        <Search className="mr-2 size-4 shrink-0 opacity-50" />
        <CommandPrimitive.Input
          ref={ref}
          value={value}
          onValueChange={onChange}
          {...props}
          onBlur={(event) => {
            setIsOpen(() => false);
            onBlur?.(event);
          }}
          onFocus={(event) => {
            setIsOpen(() => true);
          }}
          className="flex w-full bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
      <div className="relative">
        <div
          className={cn(
            'absolute top-0 z-50 w-full rounded-b-md border-input bg-popover text-popover-foreground shadow-md',
            isItemListOpen && 'border-x border-b',
          )}
        >
          <CommandList>
            {isItemListOpen && (
              <>
                <CommandEmpty>{emptyMessage ?? '結果がありません'}</CommandEmpty>
                <CommandGroup>
                  {items.map((item, index) => {
                    const isSelected = getSelectedItem?.(item, value ?? '', index) ?? false;
                    const { className, onMouseDown, keywords, onSelect, ...itemProps } =
                      getItemProps?.(item, value ?? '', index) ?? {};
                    return (
                      <CommandItem
                        key={item.id}
                        value={item.id}
                        keywords={[item.label, ...(keywords ?? [])]}
                        onMouseDown={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          onMouseDown?.(event);
                        }}
                        onSelect={(value) => {
                          handleSelectItem(item);
                          onSelect?.(value);
                        }}
                        className={cn(['flex w-full items-center gap-2', className])}
                        {...itemProps}
                      >
                        {isSelected ? <CheckIcon className="w-4" /> : <div></div>}
                        <div className="flex w-full items-center justify-between">
                          <span>{item.label}</span>
                          <span className="text-xs tracking-widest text-muted-foreground">
                            {item.additional}
                          </span>
                        </div>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </div>
      </div>
    </CommandPrimitive>
  );
}

const Autocomplete = forwardRef(AutocompleteInner) as <TValue>(
  props: AutocompleteProps<TValue> & {
    ref?: ForwardedRef<typeof CommandPrimitive.Input>;
  },
) => ReturnType<typeof AutocompleteInner>;
// Autocomplete.displayName = 'Autocomplete';

export { Autocomplete };
