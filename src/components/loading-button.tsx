import { Loader2 } from 'lucide-react';
import { Button, type ButtonProps } from './ui/button';
import { cn } from '~/lib/utils/cn';

type Props = {
  isLoading?: boolean;
} & ButtonProps;

const LoadingButton = ({ children, className, isLoading, ...props }: Props) => {
  return (
    <Button
      {...props}
      disabled={isLoading || props.disabled}
      className={cn(className)}
    >
      {isLoading && <Loader2 size={20} className="mr-2 animate-spin" />}
      {children}
    </Button>
  );
};

export { LoadingButton };
