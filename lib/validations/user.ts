import * as z from 'zod'
export const UserValidation=z.object({
    profile_photo:z.string().url().nonempty(),
    name:z.string().min(3,{message:'Name should not be less than 3 chracter.'}).max(30),
    userName:z.string().min(3).max(30),
    bio:z.string().min(3).max(1000)
})