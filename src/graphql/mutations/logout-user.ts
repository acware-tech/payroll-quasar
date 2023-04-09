import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useToken } from 'src/composables/token'

export const useLogoutUserMutation = () => {
  const { mutate, onDone, onError, loading, error } = useMutation(
    gql`mutation logoutUser { logoutUser }`
  )

  const $q = useQuasar()
  const router = useRouter()
  const { token } = useToken()

  onDone(() => {
    console.log('onDone Logout')
    $q.notify({
      message: 'You have signed out successfully!',
      icon: 'fa-solid fa-lock',
      color: 'positive'
    })

    token.value = null
    router.push({ name: 'Login' })
  })

  onError(() => {
    console.log('onError Logout')
    const gqlError = error?.value?.graphQLErrors[0]
    if (gqlError?.message.length) {
      $q.notify({
        message: gqlError.message,
        icon: 'fa-solid fa-triangle-exclamation',
        color: 'negative'
      })
    }
  })

  return {
    mutate,
    onDone,
    onError,
    loading,
    error
  }
}
