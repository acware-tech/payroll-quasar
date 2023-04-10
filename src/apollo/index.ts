import type { ApolloClientOptions } from '@apollo/client/core'
import { createHttpLink, InMemoryCache, from } from '@apollo/client/core'
// import type { BootFileParams } from '@quasar/app-vite'
import { setContext } from '@apollo/client/link/context'

import { useToken } from 'src/composables/token'

const authorizationLink = setContext((_, { headers }) => {
  const { token } = useToken()
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token.value}` : ''
    }
  }
})

const httpLink = createHttpLink({
  uri: process.env.VUE_APP_GRAPHQL_URI || 'http://gpayroll-api.acware.tech/graphql'
})

export /* async */ function getClientOptions (
  // /* {app, router, ...} */ options?: Partial<BootFileParams<any>>
) {
  return <ApolloClientOptions<unknown>>Object.assign(
    // General options.
    <ApolloClientOptions<unknown>>{
      cache: new InMemoryCache(),
      link: from([
        authorizationLink,
        httpLink
      ])
    },

    // Specific Quasar mode options.
    process.env.MODE === 'spa'
      ? {
          //
        }
      : {},
    process.env.MODE === 'ssr'
      ? {
          //
        }
      : {},
    process.env.MODE === 'pwa'
      ? {
          //
        }
      : {},
    process.env.MODE === 'bex'
      ? {
          //
        }
      : {},
    process.env.MODE === 'cordova'
      ? {
          //
        }
      : {},
    process.env.MODE === 'capacitor'
      ? {
          //
        }
      : {},
    process.env.MODE === 'electron'
      ? {
          //
        }
      : {},

    // dev/prod options.
    process.env.DEV
      ? {
          //
        }
      : {},
    process.env.PROD
      ? {
          //
        }
      : {},

    // For ssr mode, when on server.
    process.env.MODE === 'ssr' && process.env.SERVER
      ? {
          ssrMode: true
        }
      : {},
    // For ssr mode, when on client.
    process.env.MODE === 'ssr' && process.env.CLIENT
      ? {
          ssrForceFetchDelay: 100
        }
      : {}
  )
}
