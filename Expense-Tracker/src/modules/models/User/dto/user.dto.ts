import { z } from 'zod';

export const UserDto = z.object({
    id: z.number(),
    username: z.string().min(1),
    password: z.number().min(6)
})

export type UserDto = z.infer<typeof UserDto>;
