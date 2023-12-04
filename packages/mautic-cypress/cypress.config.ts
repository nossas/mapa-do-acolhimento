import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://mautic-nossas.staging.bonde.org',
    supportFile: false
  }
})

