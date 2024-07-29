import { z } from 'zod';

export const ExpenseDto = z.object({
    id: z.number(),
    cost: z.number(),
    paidBy: z.string(), 
    group: z.string()
})

export type ExpenseDto = z.infer<typeof ExpenseDto>;
