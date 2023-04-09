<script setup lang="ts">
import { useUserStore } from 'src/stores/user'
import { ref, computed } from 'vue'
import { useToken } from 'src/composables/token'
import { useRouter } from 'vue-router'
import { useLoginUserMutation } from 'src/graphql/mutations/login-user'

const showPassword = ref(false)
const router = useRouter()
const { setUser } = useUserStore()
const { setToken, clearToken } = useToken()

const {
  mutate: loginUser,
  onDone,
  onError,
  loading,
  variables,
  validationErrors
} = useLoginUserMutation()

const formIncomplete = computed(() => variables.value.email.length === 0 || variables.value.password.length === 0)
const passwordInputType = computed(() => showPassword.value ? 'text' : 'password')
const emailError = computed(() => validationErrors.value.email)
const passwordError = computed(() => validationErrors.value.password)

onDone(({ data }) => {
  setToken(data.loginUser.token)
  setUser(data.loginUser.user)
  router.push({ name: 'Home' })
})

onError(() => clearToken())
</script>

<template>
  <q-layout view="lhr lpR lFf">
    <q-page-container>
      <q-page class="column flex-center">
        <div class="text-h5 q-mb-md text-center">
          Sign In
        </div>
        <q-card
          class="q-pa-md signin"
          flat
          bordered
        >
          <q-form
            @submit.prevent.stop="loginUser()"
          >
            <q-card-section class="signin-form">
              <q-input
                v-model="variables.email"
                label="Email"
                :error="emailError.length > 0"
                :error-message="emailError"
              />
              <q-input
                v-model="variables.password"
                label="Password"
                :type="passwordInputType"
                :error="passwordError.length > 0"
                :error-message="passwordError"
              >
                <template #append>
                  <q-btn
                    :icon="'fa-solid ' + (showPassword ? 'fa-eye-slash' : 'fa-eye')"
                    class="cursor-pointer q-pa-none"
                    flat
                    round
                    size="sm"
                    @click="showPassword = !showPassword"
                  />
                </template>
              </q-input>
              <q-btn
                type="submit"
                color="secondary"
                label="Sign in"
                class="q-mt-md full-width"
                :loading="loading"
                :disable="loading || formIncomplete"
              />
            </q-card-section>
          </q-form>
        </q-card>

        <q-card
          class="q-pa-md q-mt-md signin flex flex-center"
          flat
          bordered
        >
          <q-card-section class="q-pa-none">
            New here?
            <router-link
              to="/login"
              class="text-blue"
            >
              Create an account.
            </router-link>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.signin {
  max-width: 350px;
  width: 100%;
}
</style>
