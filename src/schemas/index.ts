import { z } from 'zod';

export const techStackSchema = z.object({
  name: z.string().min(2, 'Technology name must be at least 2 characters.'),
  category: z.string().nonempty('Category is required.'),
  description: z
    .string()
    .min(4, 'Description must be more than 4 characters')
    .max(250, 'Description must be 250 characters or fewer.'),
});

export type TechStackSchema = z.infer<typeof techStackSchema>;
