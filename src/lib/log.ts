import { development } from '~/config/constants'

type Options = {
  timestamp?: boolean
  prefix?: string
}

const format = (message: string, options: Options = {}): string => {
  const { prefix, timestamp = true } = options
  const time = timestamp ? `[${new Date().toISOString()}]` : ''
  const prefixStr = prefix ? `[${prefix}]` : ''

  return `${time}${prefixStr}: ${message}`
}

export const log = {
  debug: (message: string, options?: Options) => {
    if (!development) {
      return
    }
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.debug(format(message, options))
  },
  info: (message: string, options?: Options) => {
    if (!development) {
      return
    }
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.info(format(message, options))
  },
  warn: (message: string, options?: Options) => {
    if (!development) {
      return
    }
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.warn(format(message, options))
  },
  error: (message: string, options?: Options) => {
    if (!development) {
      return
    }
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error(format(message, options))
  },
}
