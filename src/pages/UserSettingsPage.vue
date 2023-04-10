<script setup lang="ts">
import { useUserQuery } from 'src/graphql/queries/user'

const { tokens } = useUserQuery()
</script>

<template>
  <q-page
    padding
  >
    <pre>{{ tokens }}</pre>
  </q-page>
</template>
