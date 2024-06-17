"use server"

import * as z from 'zod';
import { LoginSchema } from "@/schemas";
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '../routes';

export const oauthLogin = async () => {

    try {
        await signIn("google", { redirectTo: DEFAULT_LOGIN_REDIRECT })
    } catch (error) {
        console.log(error);

        throw error
    }
}