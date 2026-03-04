import { z } from 'zod';

export const talkFormSchema = z.object({
  name: z.string().min(2, 'Name is required').max(50, 'Name is too long'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(500, 'Message is too long'),
});

export type TalkFormValues = z.infer<typeof talkFormSchema>;

export default {
  talkFormSchema,
};
