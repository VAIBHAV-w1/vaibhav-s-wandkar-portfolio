/// <reference types="vite/client" />

declare module '*.css'

declare const __SITE_URL__: string

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string
  readonly VITE_FORMSUBMIT_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
