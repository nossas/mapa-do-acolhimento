import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://mautic-nossas.staging.bonde.org/triagem-psicologico-2',
    supportFile: false
  }
})

