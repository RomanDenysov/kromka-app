const isDevelopment = process.env.NODE_ENV !== 'production'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type Args = any[]

export const log = isDevelopment
  ? {
      debug: (...args: Args) => console.debug(...args),
      info: (...args: Args) => console.info(...args),
      warn: (...args: Args) => console.warn(...args),
      error: (...args: Args) => console.error(...args),
      log: (...args: Args) => log.info(...args),
    }
  : Object.create(null)
