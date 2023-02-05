/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
		screens: {
			sm: "480px",
			md: "760px",
			lg: "1040px",
			xl: "1440px"
		},
		colors: {
			white: "#ffffff",
			gray: {
				100: "#101010",
				200: "#202020",
				300: "#303030",
				400: "#404040",
				500: "#505050"
			},
			positive: "#90ee90",
			negative: "#ff6666"
		}
	},
	plugins: [],
};
