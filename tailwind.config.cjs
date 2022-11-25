/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        container: {
            center: true,
            padding: "1rem",
        },
        fontFamily: {
            sans: ["Inter", "sans-serif"],
        },
        screens: {
            sm: "576px",
            md: "768px",
            lg: "992px",
            xl: "1200px",
            "2xl": "1400px",
        },
        extend: {
            colors: {
                accent: "#F15757",
                "accent-light": "#F15859",
                "accent-soft": "rgb(102,102,255,.05)",
                "gray-light": "#8492a6",
                "blue-dark": "#3333FF",
            },
        },
    },
    plugins: [],
};
