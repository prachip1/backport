

/** @type {import('tailwindcss').Config} */
export default {
	content: [
	  "./index.html",
	  "./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
	  extend: {
		fontFamily: {
		  lato: ["Lato","sans-seerif"]
		}
	  },
	  fontFamily:{
		display:["Quicksand", "sans-serif"],
	  }
	},
	daisyui: {
	  themes: ["cupcake"],
	},
	plugins: [[require("tailwindcss-animate")], [require('daisyui')]],
  }
  
  