import { z } from 'zod';

export const talkFormSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string()
      .min(2, t('talk.validation.nameRequired'))
      .max(50, t('talk.validation.nameTooLong')),
    email: z.string()
      .email(t('talk.validation.emailInvalid')),
    message: z.string()
      .min(10, t('talk.validation.messageTooShort'))
      .max(5000, t('talk.validation.messageTooLong')),
  });

export type TalkFormValues = z.infer<ReturnType<typeof talkFormSchema>>;

export default {
  talkFormSchema,
};
