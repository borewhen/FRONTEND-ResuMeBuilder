import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
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
  				'20': '#F5F3EF',
  				'40': '#E5E0D5',
  				'60': '#D1CAB9',
  				'80': '#C0AC8F',
  				'100': '#877459',
  				blk: '#171717'
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
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
