import { http, UseWagmiPlugin, createConfig } from 'use-wagmi';
import { baseSepolia } from 'use-wagmi/chains';
import { coinbaseWallet } from 'use-wagmi/connectors';

export default defineNuxtPlugin((nuxt) => {
  const config = createConfig({
    chains: [baseSepolia],
    connectors: [
      coinbaseWallet({
        appName: 'My App',
        appChainIds: [baseSepolia.id],
        // reloadOnDisconnect: true,
        // jsonRpcUrl: 'https://base-sepolia.g.alchemy.com/v2/3IIiWDVRt1fTSk9jAFa64d_Vk4TD2ovB',
      }),
    ],
    transports: {
      [baseSepolia.id]: http(),
    },
    // multiInjectedProviderDiscovery: true,
  });

  nuxt.vueApp.use(UseWagmiPlugin, { config });
});