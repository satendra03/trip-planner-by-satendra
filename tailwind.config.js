/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
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
  		screens: {
  			'custom-370': '370px',
  			'custom-435': '435px',
  			'custom-500': '500px',
  			'custom-600': '600px'
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
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
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
  			},
  			marquee: {
  				from: {
  					transform: 'translateX(0)'
  				},
  				to: {
  					transform: 'translateX(calc(-100% - var(--gap)))'
  				}
  			},
  			'marquee-vertical': {
  				from: {
  					transform: 'translateY(0)'
  				},
  				to: {
  					transform: 'translateY(calc(-100% - var(--gap)))'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			marquee: 'marquee var(--duration) infinite linear',
  			'marquee-vertical': 'marquee-vertical var(--duration) linear infinite'
  		},
  		fontFamily: {
  			SatoshiLight: [
  				'Satoshi-Light',
  				'sans-serif'
  			],
  			SatoshiLightItalic: [
  				'Satoshi-LightItalic',
  				'sans-serif'
  			],
  			SatoshiRegular: [
  				'Satoshi-Regular',
  				'sans-serif'
  			],
  			SatoshiItalic: [
  				'Satoshi-Italic',
  				'sans-serif'
  			],
  			SatoshiMedium: [
  				'Satoshi-Medium',
  				'sans-serif'
  			],
  			SatoshiMediumItalic: [
  				'Satoshi-MediumItalic',
  				'sans-serif'
  			],
  			SatoshiBold: [
  				'Satoshi-Bold',
  				'sans-serif'
  			],
  			SatoshiBoldItalic: [
  				'Satoshi-BoldItalic',
  				'sans-serif'
  			],
  			SatoshiBlack: [
  				'Satoshi-Black',
  				'sans-serif'
  			],
  			SatoshiBlackItalic: [
  				'Satoshi-BlackItalic',
  				'sans-serif'
  			],
  			SatoshiVariable: [
  				'Satoshi-Variable',
  				'sans-serif'
  			],
  			SatoshiVariableItalic: [
  				'Satoshi-VariableItalic',
  				'sans-serif'
  			]
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}