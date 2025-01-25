import CurrencyInput from 'react-currency-input-field';
import { cn } from '~/lib/utils/cn';

export const PriceInput = ({
  value,
  placeholder,
  onChange,
  disabled,
  className,
}: {
  value: number;
  placeholder?: string;
  onChange: (value: string | undefined) => void;
  disabled?: boolean;
  className?: string;
}) => {
  return (
    <div className="relative">
      <CurrencyInput
        prefix="&euro;"
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className
        )}
        value={value}
        placeholder={placeholder}
        decimalsLimit={2}
        decimalScale={2}
        onValueChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};
