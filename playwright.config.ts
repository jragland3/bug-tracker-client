import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30 * 1000,
  expect: {
    timeout: 10000, // max wait for expect()
  },
  fullyParallel: true,
  retries: 1,
  reporter: [
    ['list'],
    [
      'html',
      { outputFolder: 'playwright-report' }
    ],
    [
      'junit',
      { outputFile: 'results.xml' }
    ]
  ],  
  use: {
    headless: process.env.CI === 'true',
    baseURL: process.env.APP_URL || 'http://localhost:5173',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  webServer: [
    {
      command: 'bun run dev', // Frontend start script
      port: 5173,
      reuseExistingServer: !process.env.CI,
      env: {
        ...process.env,
        VITE_API_URL: process.env.VITE_API_URL || 'http://localhost:3000/v1/trpc',
        DATABASE_URL: process.env.DATABASE_URL || 'file:./test.db',
      },
    }
  ] 
});