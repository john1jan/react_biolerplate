import * as ENV from "./env";
export function log(message) {
  if (ENV.isDev) {
    console.log(message)
  }
}

export function logWithData(message, data) {
  if (ENV.isDev) {
    console.log(message, data)
  }
}


export function error(message, data) {
  if (ENV.isDev) {
    console.error(message, data)
  }
}


export function warn(message, data) {
  if (ENV.isDev) {
    console.warn(message, data)
  }
}
