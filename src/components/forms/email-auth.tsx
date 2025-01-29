'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2Icon, MailIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { log } from '~/lib/utils/log';
import { authClient } from '~/server/auth/auth.client';
import { LoadingButton } from '../loading-button';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

const emailAuthFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
});

type EmailAuthFormValues = z.infer<typeof emailAuthFormSchema>;

const EmailAuthForm = () => {
  const t = useTranslations('common');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const form = useForm<EmailAuthFormValues>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(emailAuthFormSchema),
  });

  const onSubmit = async (data: EmailAuthFormValues) => {
    await log.info(`Email auth form submitted: ${data}`);
    try {
      await authClient.signIn.magicLink({
        email: data.email,
        callbackURL: '/',
      });
      setIsEmailSent(true);
    } catch (error) {
      log.error(error);
      setIsEmailSent(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {isEmailSent ? (
          <Alert variant="success">
            <CheckCircle2Icon className="mr-2 size-5 stroke-green-600 text-green-600" />
            <AlertTitle className="font-bold">Success</AlertTitle>
            <AlertDescription>
              We have sent you an email to {form.getValues('email')}
            </AlertDescription>
          </Alert>
        ) : (
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-y-1">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Email"
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <LoadingButton
          type="submit"
          className="w-full"
          disabled={isEmailSent}
          isLoading={form.formState.isSubmitting}
        >
          <MailIcon size={20} /> {t('send')}
        </LoadingButton>
      </form>
    </Form>
  );
};

export { EmailAuthForm };
