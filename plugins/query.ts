import { persistQueryClient } from '@tanstack/query-persist-client-core'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { deserialize, serialize } from 'use-wagmi'

export default defineNuxtPlugin((nuxt) => {
  nuxt.vueApp.use(VueQueryPlugin, {
    queryClientConfig: {
      defaultOptions: {
        queries: {
          gcTime: 1_000 * 60 * 60 * 24, // 24 hours
          networkMode: 'offlineFirst',
          refetchOnWindowFocus: false,
          retry: 0,
        },
        mutations: { networkMode: 'offlineFirst' },
      },
    },
    clientPersister: (queryClient) => {
      return persistQueryClient({
        queryClient,
        persister: createSyncStoragePersister({
          key: 'vite-vue.cache',
          serialize,
          storage: window.localStorage,
          deserialize,
        }),
      })
    },
  })
})
