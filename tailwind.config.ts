
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['var(--font-poppins)'],
				display: ['var(--font-outfit)'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				purple: {
					light: '#9b87f5',
					DEFAULT: '#8B5CF6',
					dark: '#7E69AB',
				},
				teal: {
					light: '#33C3F0',
					DEFAULT: '#06B6D4',
					dark: '#0891B2',
				},
				yellow: {
					light: '#FEF7CD',
					DEFAULT: '#FBBF24',
					dark: '#F59E0B',
				},
				pink: {
					light: '#FFDEE2',
					DEFAULT: '#D946EF',
					dark: '#C026D3',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' }
				},
				'bounce-light': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				},
				'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'flip': {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
        'flip-back': {
          '0%': { transform: 'rotateY(180deg)' },
          '100%': { transform: 'rotateY(0deg)' },
        },
        'scale-up': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-slow': 'pulse-slow 3s infinite ease-in-out',
				'bounce-light': 'bounce-light 2s infinite ease-in-out',
				'float': 'float 3s infinite ease-in-out',
				'flip': 'flip 0.6s ease-out forwards',
				'flip-back': 'flip-back 0.6s ease-out forwards',
				'scale-up': 'scale-up 0.3s ease-out forwards',
				'slide-up': 'slide-up 0.5s ease-out forwards',
			},
			boxShadow: {
        'neon-purple': '0 0 5px theme("colors.purple.light"), 0 0 20px rgba(155, 135, 245, 0.3)',
        'neon-teal': '0 0 5px theme("colors.teal.light"), 0 0 20px rgba(51, 195, 240, 0.3)',
        'glass': '0 8px 32px rgba(31, 38, 135, 0.15)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
      },
			backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-candy': 'linear-gradient(113.5deg, #7B61FF 0%, #D146BF 40%, #F18557 100%)',
        'gradient-blue': 'linear-gradient(90deg, hsla(221, 45%, 73%, 1) 0%, hsla(220, 78%, 29%, 1) 100%)',
        'gradient-purple': 'linear-gradient(90deg, hsla(277, 75%, 84%, 1) 0%, hsla(297, 50%, 51%, 1) 100%)',
      },
      backdropFilter: {
        'glass': 'blur(16px) saturate(180%)',
      }
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
