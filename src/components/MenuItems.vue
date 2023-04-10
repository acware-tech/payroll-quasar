<script setup lang="ts">
import { ref } from 'vue'
import { useSignoutUserMutation } from 'src/graphql/mutations/signout-user.js'

export interface MenuItem {
  id: number;
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
  callbackFn?: () => void;
  loading?: boolean;
  route?: string;
}

const { mutate: signoutUser, loading } = useSignoutUserMutation()

const emit = defineEmits<{(event: 'signout'): void}>()

const signout = () => {
  signoutUser()
  emit('signout')
}

const list = ref<MenuItem[]>([
  {
    id: 1,
    title: 'Shopping List',
    caption: '15',
    icon: 'mdi-shopping-outline'
  },
  {
    id: 2,
    title: 'Tokens',
    icon: 'fa-solid fa-key',
    route: 'Tokens',
    loading: loading.value
  },
  {
    id: 100,
    title: 'Sign out',
    icon: 'fa-solid fa-right-from-bracket',
    callbackFn: signout,
    loading: loading.value
  }
])
</script>

<template>
  <q-item
    v-for="item in list"
    :key="item.id"
    clickable
    tag="a"
    target="_blank"
    :to="item.route ? { name: item.route } : ''"
    @click="item.callbackFn"
  >
    <q-item-section
      v-if="item.loading"
    >
      <q-inner-loading :showing="true" />
    </q-item-section>
    <q-item-section
      v-else-if="item.icon"
      avatar
    >
      <q-icon :name="item.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>
        {{ item.title }}
      </q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-item-label>
        {{ item.caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>
