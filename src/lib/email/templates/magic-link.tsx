import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

const MagicLinkEmail = ({ url }: { url: string }) => {
  return (
    <Html>
      <Head />
      <Preview>Click the link to sign in to your account</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-[#eaeaea] border-solid p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src="/icons/kromka_mail_receipt.png"
                alt="Kromka Logo"
                width={48}
                height={48}
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 p-0 text-center font-bold text-black text-xl">
              Sign in to your account
            </Heading>
            <Text className="text-center text-black text-sm leading-[24px]">
              Click the link to sign in to your account
            </Text>
            <Text className="text-center text-sm">
              <Link href={url} className="text-blue-600 no-underline">
                Sign in
              </Link>
            </Text>
            <Text className="mt-[32px] text-center text-sm text-zinc-500 leading-[24px]">
              If you didn't request this, please ignore this email.
            </Text>
          </Container>
          <Section className="mt-[40px] border-gray-200 border-t border-solid pt-4">
            <Text className="text-center text-sm">
              Please do not reply to this email.
            </Text>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
};

export { MagicLinkEmail };
