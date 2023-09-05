import * as z from 'zod'
export const ThreadValidation=z.object({
    thread:z.string().nonempty().min(3,{message:'Minimum three chracters needs'}),
    accountId:z.string(),
    images:z.string(),
    community:z.string(),
})
export const CommentValidation=z.object({
    thread:z.string().nonempty().min(3,{message:'Minimum three chracters needs'}),
})