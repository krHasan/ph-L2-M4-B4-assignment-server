import { z } from "zod";

const loginValidationSchema = z.object({
    body: z.object({
        email: z.string({ required_error: "Email is required" }),
        password: z.string({ required_error: "Password is required" }),
    }),
});

const refreshTokenValidationSchema = z.object({
    cookies: z.object({
        refreshToken: z.string({
            required_error: "Refresh token is required",
        }),
    }),
});

const changePasswordValidationSchema = z.object({
    body: z.object({
        oldPassword: z.string({ required_error: "old password is required" }),
        newPassword: z.string({ required_error: "Password is required" }),
    }),
});

const forgetPasswordValidationSchema = z.object({
    body: z.object({
        email: z.string({
            required_error: "User email is required",
        }),
    }),
});

const resetPasswordValidationSchema = z.object({
    body: z.object({
        email: z.string({
            required_error: "User id is required",
        }),
        newPassword: z.string({
            required_error: "New Password is required",
        }),
    }),
});

export const AuthValidations = {
    loginValidationSchema,
    refreshTokenValidationSchema,
    changePasswordValidationSchema,
    forgetPasswordValidationSchema,
    resetPasswordValidationSchema,
};
