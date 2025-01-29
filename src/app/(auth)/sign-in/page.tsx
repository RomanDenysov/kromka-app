import { useTranslations } from 'next-intl';
import { signInWithProvider } from '~/actions/auth';
import { EmailAuthForm } from '~/components/forms/email-auth';
import { Icons } from '~/components/icons';
import { LoadingButton } from '~/components/loading-button';
import { Typography } from '~/components/typography';
import { Container } from '~/components/ui/container';

export default function Page() {
  const t = useTranslations('auth');

  return (
    <Container className="grid place-items-center">
      <section className="flex w-full max-w-md flex-col gap-8 px-2 md:px-10">
        <div className="flex flex-col gap-2 text-center">
          <Typography variant="h3" className="font-bold">
            {t('signIn')}
          </Typography>
          <Typography variant="large" className="text-primary/75">
            {t('signInTo')}
          </Typography>
        </div>
        <div className="flex flex-col gap-3">
          <EmailAuthForm />
          <div className="flex items-center justify-between gap-3">
            <div className="h-0.5 w-full bg-border" />
            <Typography variant="small" className="text-muted-foreground">
              {t('or')}
            </Typography>
            <div className="h-0.5 w-full bg-border" />
          </div>
          <form
            action={async () => {
              'use server';
              await signInWithProvider('google');
            }}
            name="sign-in-with-providers"
            id="sign-in-with-providers"
            className="w-full max-w-md"
          >
            <LoadingButton
              type="submit"
              variant="outline"
              form="sign-in-with-providers"
              className="w-full"
            >
              <Icons.google />
              {t('signInWith')} Google
            </LoadingButton>
          </form>
        </div>
      </section>
    </Container>
  );
}
