/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EXCHANGE_RATE_API_KEY: string
  readonly VITE_OPEN_EXCHANGE_RATES_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
