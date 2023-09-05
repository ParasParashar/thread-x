import * as z from 'zod'
export const CommunityValidation=z.object({
    communityName:z.string().nonempty().min(3,{message:'Minimum three chracters needs'}),
    communityBio:z.string().min(3,{message:'Minimum three chracters needs'}),
    userId:z.string()
})