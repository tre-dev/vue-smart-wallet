<template>
  <div>
    <h2>Account</h2>
    <div class="block">
      account: {{ address }} chainId: {{ chainId }} status: {{ status }}
    </div>

    <button
      v-if="status !== 'disconnected'"
      type="button"
      @click="
        () => {
          disconnect();
          reloadNuxtApp({ path: '/' });
        }
      "
    >
      Disconnect
    </button>
    <button
      v-if="status === 'disconnected'"
      type="button"
      @click="() => connectAsync({ connector, chainId: 85432 })"
    >
      Connect
    </button>

    <button
      v-if="status === 'connected'"
      type="button"
      @click="
        () => signTypedData({ domain, message, primaryType: 'Mail', types })
      "
    >
      Sign Typed Data
    </button>

    <div>
      {{signStatus }} - {{ signError }} 
    </div>
  </div>
</template>

<script setup lang="ts">
const { address, chainId, status, connector: accountConnector } = useAccount();
const { disconnect } = useDisconnect();
const { connectors, connectAsync } = useConnect();
const { signTypedData, status: signStatus, error: signError } = useSignTypedData();

const domain = {
  name: "Ether Mail",
  version: "1",
  chainId: 1,
  verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
} as const;

const types = {
  Person: [
    { name: "name", type: "string" },
    { name: "wallet", type: "address" },
  ],
  Mail: [
    { name: "from", type: "Person" },
    { name: "to", type: "Person" },
    { name: "contents", type: "string" },
  ],
} as const;

const message = {
  from: {
    name: "Cow",
    wallet: "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826" as any,
  },
  to: {
    name: "Bob",
    wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB" as any,
  },
  contents: "Hello, Bob!",
};

const connector = computed(
  () =>
    connectors.value.find(
      (connector) => connector.id === "coinbaseWalletSDK"
    ) as any
);

// const accounts = await accountConnector.value?.getAccounts()
</script>
