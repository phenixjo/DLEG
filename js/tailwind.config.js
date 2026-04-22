tailwind.config = {
    theme: {
        extend: {
            colors: {
                dleg: {
                    blue: 'var(--dleg-blue)',
                    orange: 'var(--dleg-orange)',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            },
            letterSpacing: {
                tighter: '-0.05em',
            }
        }
    }
}
