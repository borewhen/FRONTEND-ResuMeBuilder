import type { Config } from "tailwindcss";
import flowbite from 'flowbite-react/tailwind';

export default {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
	flowbite.content(),
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: [
  				'Open Sans',
  				'Arial',
  				'Helvetica',
  				'sans-serif'
  			]
  		},
  		colors: {
  			dip: {
                  /* Original brown color
  				'20': '#F5F3EF',
  				'40': '#E5E0D5',
  				'60': '#D1CAB9',
  				'80': '#C0AC8F',
  				'100': '#877459',
                  */
                  '0' : '#000000',
                '20': '#4a4a48', 
  				'40': '#7a7a77',
  				'60': '#a3a29e',
  				'80': '#d1cfcb', 
  				'100': '#F5F3EF',
  				blk: '#171717',
				purple: '#693895',
				grey: '#A8A8A8',
				lightpurple: '#773FF2',
				greyishwhite: '#F8F9FA'
  			},
  			background: 'var(--background)',
  			foreground: 'var(--foreground)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate"), flowbite.plugin()],
} satisfies Config;
