import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import AppError from "../../errors/AppError";
import { httpStatus } from "../../config/httpStatus";

type StringValue = any;

export const createToken = (
    jwtPayload: { useremail: string; role: string },
    secret: string,
    expiresIn: number | StringValue | undefined,
) => {
    if (!secret) throw new Error("JWT secret is required");

    const signOptions: SignOptions = {
        expiresIn: expiresIn, // Ensure this matches the correct type
    };

    return jwt.sign(jwtPayload, secret, {
        expiresIn,
    });
};

export const verifyToken = (token: string, secret: string) => {
    try {
        return jwt.verify(token, secret) as JwtPayload;
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    } catch (error) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
    }
};
