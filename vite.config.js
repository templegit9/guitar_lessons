import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    plugins: [
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['guitar-icon.svg', 'guitar-icon-192.png', 'guitar-icon-512.png'],
            manifest: {
                name: 'GuitarMaster - Interactive Guitar Lessons',
                short_name: 'GuitarMaster',
                description: 'Learn guitar from beginner to expert with interactive lessons',
                theme_color: '#1a1a2e',
                background_color: '#0f0f1a',
                display: 'standalone',
                scope: '/',
                start_url: '/',
                icons: [
                    {
                        src: 'guitar-icon-192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'guitar-icon-512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}']
            }
        })
    ]
})
