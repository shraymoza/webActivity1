import dotenv from 'dotenv';
dotenv.config();

const whitelist = [
    'https://web-activity1.netlify.app',         // Netlify (prod)
    'http://localhost:3000',          // React/Vite dev
];

export const corsOptions = {
    origin: (origin, cb) => {
        // allow tools like curl / Postman which send no Origin
        if (!origin) return cb(null, true);
        if (whitelist.indexOf(origin) !== -1) {
            return cb(null, true);
        }
        return cb(new Error('Not allowed by CORS'));
    },
    credentials: true,        // → cookies / Auth headers
    optionsSuccessStatus: 200 // → legacy browsers (IE11)
};
