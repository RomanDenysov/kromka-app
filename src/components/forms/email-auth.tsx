'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MailIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { log } from '~/lib/utils/log'
import { LoadingButton } from '../loading-button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

const emailAuthFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
})

type EmailAuthFormValues = z.infer<typeof emailAuthFormSchema>

const EmailAuthForm = () => {
  const form = useForm<EmailAuthFormValues>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(emailAuthFormSchema),
  })

  const onSubmit = async (data: EmailAuthFormValues) => {
    await log.info(`Email auth form submitted: ${data}`)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-y-1">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder="Email" className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton type="submit" className="w-full" isLoading={form.formState.isSubmitting}>
          <MailIcon size={20} /> Odeslat
        </LoadingButton>
      </form>
    </Form>
  )
}

export { EmailAuthForm }
