import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { User } from 'src/components/models'

const storeName = 'user'

export const useUserStore = defineStore('user', () => {
  const id = useLocalStorage(`${storeName}-id`, '')
  const name = useLocalStorage(`${storeName}-name`, '')
  const email = useLocalStorage(`${storeName}-email`, '')

  const setUser = (user: User) => {
    id.value = user.id
    name.value = user.name
    email.value = user.email
  }

  const reset = () => {
    id.value = ''
    name.value = ''
    email.value = ''
  }

  return {
    id,
    name,
    email,
    setUser,
    reset
  }
})
