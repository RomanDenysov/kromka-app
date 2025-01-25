import type { Control } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { capitalize } from '~/lib/utils/capitalize';
import type { CreateProductInput } from '../types';

const PRODUCT_STATUSES = ['draft', 'active', 'discontinued', 'sold'];

export const ProductStatusSelect = ({
  control,
}: { control: Control<CreateProductInput> }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Status</CardTitle>
        <CardDescription>Select a status for your product</CardDescription>
      </CardHeader>
      <CardContent>
        <FormField
          control={control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue className="capitalize" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="min-w-[var(--radix-select-trigger-width)]">
                    {PRODUCT_STATUSES.map((status) => (
                      <SelectItem
                        key={status}
                        value={status}
                        className="capitalize"
                      >
                        {capitalize(status)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};
