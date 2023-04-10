import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const query = gql`
  query tokens {
    tokens {
      id
    }
  }
`

export const useLogoutUserMutation = () => {
  const { result, onError, onResult, loading } = useQuery(
    query
  )

  return {
    result,
    onError,
    onResult,
    loading
  }
}
