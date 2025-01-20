// tailwind.config.js
import { Config } from 'tailwindcss'
import {heroui} from "@heroui/react";

export default {
    content: [
        // ...
        // make sure it's pointing to the ROOT node_module
        "./src/**/*.{js,ts,jsx,tsx}",
        "./src/**/*.{html,js}",
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    darkMode: "class",
    plugins: [heroui()],
} satisfies Config;