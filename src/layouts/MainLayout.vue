<script lang="ts" setup>
import { ref } from 'vue'
import MenuItems from 'src/components/MenuItems.vue'

const leftDrawerOpen = ref(false)
const showDialog = ref(false)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<template>
  <q-layout view="lhr lpR lFf">
    <q-header
      elevated
      class="bg-primary text-white"
    >
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="fa-solid fa-bars"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      overlay
      behavior="mobile"
    >
      <q-list>
        <q-toolbar>
          <q-btn
            icon="fa-solid fa-gear"
            round
            flat
            size="sm"
          />
        </q-toolbar>

        <q-item class="bg-grey-9">
          <q-item-section>
            Lists
          </q-item-section>
          <q-item-section side>
            <q-btn
              flat
              round
              icon="fa-solid fa-plus"
              size="sm"
            />
          </q-item-section>
        </q-item>

        <MenuItems @signout="showDialog=true" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-dialog v-model="showDialog">
        <q-spinner
          color="primary"
          size="lg"
        />
      </q-dialog>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
