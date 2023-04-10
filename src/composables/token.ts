import { computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'

const token = useLocalStorage<string|null>('auth-token', '')

export const useToken = () => {
  // token is cleared after a signin attempt with invalid token
  const isAuthenticated = computed(() => (token.value?.length ?? 0) > 0)

  const clearToken = () => {
    token.value = null
  }

  const setToken = (_token: string) => {
    token.value = _token
  }

  return {
    token,
    isAuthenticated,
    setToken,
    clearToken
  }
}
