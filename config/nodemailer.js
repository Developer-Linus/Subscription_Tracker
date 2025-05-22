import { GMAIL_APP_PASSWORD, GMAIL_USER } from "./env.js";

import nodemailer from "nodemailer";

// create reusable transporter object using the default SMTP transport
export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: GMAIL_USER, 
        pass: GMAIL_APP_PASSWORD,
    },
});
