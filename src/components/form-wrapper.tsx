import { type ReactNode, memo } from 'react';
import { cn } from '~/lib/utils/cn';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

export const FormWrapper = memo(
  (props: {
    children: ReactNode;
    title: string;
    description: string;
    className?: string;
  }) => {
    const { children, title, description, className } = props;

    return (
      <Card className={cn(className)}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    );
  }
);
