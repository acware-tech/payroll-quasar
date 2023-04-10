import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { useQuasar } from 'quasar'
import { ref, computed } from 'vue'

const query = gql`
  mutation loginUser (
    $email: String!
    $password: String!
    $deviceId: String!
  ) {
    loginUser (
      email: $email
      password: $password
      deviceId: $deviceId
    ) {
      token
      user {
        id
        name
        email
      }
    }
  }
`

const variables = ref({
  email: '',
  password: ''
})

export const useLoginUserMutation = () => {
  const { mutate, onDone, onError, loading, error } = useMutation(
    query,
    () => ({
      variables: {
        email: variables.value.email,
        password: variables.value.password,
        deviceId: 'web'
      }
    })
  )

  const validationErrors = computed(() => ({
    email: error?.value?.graphQLErrors[0]?.extensions?.validation?.email[0] ?? '',
    password: error?.value?.graphQLErrors[0]?.extensions?.validation?.password[0] ?? ''
  }))

  const $q = useQuasar()

  onError(() => {
    const gqlError = error?.value?.graphQLErrors[0]
    if ((gqlError?.extensions?.reason ?? null) === 'credentials' && gqlError?.message.length) {
      $q.notify({
        message: gqlError.message,
        icon: 'fa-solid fa-key',
        color: 'negative'
      })
    }
  })

  return {
    mutate,
    onDone,
    onError,
    loading,
    error,
    variables,
    validationErrors
  }
}
