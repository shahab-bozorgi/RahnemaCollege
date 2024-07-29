import { z } from 'zod';

export const GroupDto = z.object({
    id: z.number(),
    name: z.string().min(1)
})

export type GroupDto = z.infer<typeof GroupDto>;
