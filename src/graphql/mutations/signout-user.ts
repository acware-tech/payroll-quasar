import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useToken } from 'src/composables/token'

export const useSignoutUserMutation = () => {
  const { mutate, onDone, onError, loading, error } = useMutation(
    gql`mutation signoutUser { signoutUser }`
  )

  const $q = useQuasar()
  const router = useRouter()
  const { token } = useToken()

  onDone(() => {
    $q.notify({
      message: 'Signed out successfully!',
      icon: 'fa-solid fa-right-from-bracket fa-beat-fade',
      color: 'positive'
    })

    token.value = null
    router.push({ name: 'Signin' })
  })

  onError(() => {
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
