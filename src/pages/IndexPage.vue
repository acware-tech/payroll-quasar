<template>
  <q-page
    padding
  >
    <q-btn-group
      push
      class="q-mb-md"
    >
      <q-btn
        v-for="component in components"
        :key="component.name"
        color="primary"
        glossy
        class="text-capitalize"
        push
        :label="component.name"
        :icon="component.icon"
        @click="showComponent(component)"
      />
    </q-btn-group>

    <q-card
      v-show="components[0].show"
      style="max-width: 380px;"
    >
      <q-img src="https://picsum.photos/300/200" />
      <q-separator inset />
      <q-card-section>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt rem ratione amet distinctio sapiente fuga, dignissimos dolorum. Rerum ducimus magnam assumenda explicabo qui, deleniti quasi magni amet at dignissimos. Quae?
      </q-card-section>
    </q-card>

    <q-toolbar
      v-show="components[1].show"
      class="bg-primary q-pt-3"
    >
      <q-toolbar-title>
        Quasar App
      </q-toolbar-title>
      <q-btn
        icon="fa-solid fa-gear"
        round
        flat
        size="sm"
      />
    </q-toolbar>

    <q-dialog
      v-model="components[2].show"
    >
      <q-card>
        <q-toolbar class="bg-red">
          <q-toolbar-title>
            More Info...
          </q-toolbar-title>
          <q-btn
            v-close-popup
            flat
            round
            icon="fa-solid fa-xmark"
          />
        </q-toolbar>
        <q-card-section>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero in rerum ab. Est alias nemo id eos, omnis quaerat, minima quisquam commodi illum, molestias assumenda eum iste laborum fugiat temporibus.
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-img
      v-show="components[3].show"
      src="https://picsum.photos/1980/1080"
    />

    <div
      v-show="components[4].show"
      class="flex flex-center"
    >
      <q-rating
        v-model="rating"
        color="secondary"
        size="xl"
        icon="mdi-star-outline"
        icon-selected="mdi-star"
      />
    </div>

    <q-banner
      v-show="components[5].show"
      class="bg-primary text-grey-1"
      rounded
      inline-actions
    >
      <template #avatar>
        <q-icon
          name="mdi-alert"
          size="xs"
        />
      </template>
      Are you sure?
      <template #action>
        <q-btn
          flat
          class="text-capitalize"
          label="More Info..."
        />
      </template>
    </q-banner>

    <q-bar
      v-show="components[6].show"
      dense
    >
      <q-btn
        icon="mdi-circle"
        round
        flat
        size="xs"
        color="red"
      />
      <q-btn
        icon="mdi-circle"
        round
        flat
        size="xs"
        color="yellow"
      />
      <q-btn
        icon="mdi-circle"
        round
        flat
        size="xs"
        color="green"
      />
      <div class="col text-center text-weight-bold">
        Title
      </div>
      <q-btn
        icon="mdi-close"
        flat
        round
      />
      <q-space />
    </q-bar>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
interface Component {
  id: number,
  name: string;
  show: boolean;
  icon?: string;
}
const components = ref<Component[]>([
  {
    id: 0,
    name: 'QCard',
    show: false
  },
  {
    id: 1,
    name: 'QToolbar',
    show: false
  },
  {
    id: 2,
    name: 'QDialog',
    show: false
  },
  {
    id: 3,
    name: 'QImage',
    show: false
  },
  {
    id: 4,
    name: 'QRating',
    show: false
  },
  {
    id: 5,
    name: 'QBanner',
    show: false
  },
  {
    id: 6,
    name: 'QBar',
    show: false
  }
])

const showComponent = (component: Component) => {
  if (component.name === 'QDialog') {
    component.show = true
    return
  }

  component.show = !component.show
}

const rating = ref(3)
</script>
