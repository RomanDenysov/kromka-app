'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { LoadingButton } from '~/components/loading-button';
import { buttonVariants } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { Form, FormControl, FormField } from '~/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '~/components/ui/input-otp';
import { toast } from '~/hooks/use-toast';
import { cn } from '~/lib/utils/cn';
import { api } from '~/trpc/react';

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits long'),
});

type OtpValues = z.infer<typeof otpSchema>;

export function GetPermissionDialog() {
  const router = useRouter();
  const form = useForm<OtpValues>({
    defaultValues: {
      otp: '',
    },
    resolver: zodResolver(otpSchema),
  });

  const getPermissionMutation = api.auth.getPermission.useMutation({
    onSuccess: () => {
      toast({
        title: 'Permission granted',
        description: 'You can now access the admin dashboard',
      });
      router.push('/admin');
      router.refresh();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const onSubmit = async (values: OtpValues) => {
    await getPermissionMutation.mutateAsync({ otp: values.otp });
  };

  return (
    <Dialog open>
      <DialogContent closeButton={false}>
        <DialogHeader>
          <DialogTitle>Get Permission</DialogTitle>
          <DialogDescription>
            Please enter the OTP code sent to your email to get access to this
            page.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            id="get-permission-form"
            name="get-permission-form"
            className="flex w-full flex-col items-center justify-center space-y-10"
          >
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormControl>
                  <InputOTP maxLength={6} className="w-full" {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
              )}
            />
            {form.formState.errors.root && (
              <p className="text-red-500">
                {form.formState.errors.root.message}
              </p>
            )}

            <DialogFooter className="w-full gap-2">
              <Link
                href="/profile"
                className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}
              >
                Cancel
              </Link>
              <LoadingButton
                isLoading={getPermissionMutation.isPending}
                className="w-full"
                form="get-permission-form"
                type="submit"
              >
                Submit
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
