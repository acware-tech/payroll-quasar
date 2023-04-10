import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { computed } from 'vue'

const query = gql`
  query tokens {
    tokens {
      id
      name
      abilities
      lastUsedAt
      createdAt
    }
  }
`

interface Token {
  id: string;
  name: string;
  abilities: string[];
  lastUsedAt: string;
  createdAt: string;
}

export const useUserQuery = () => {
  const { result, onError, onResult, loading, variables } = useQuery(
    query
  )

  const tokens = computed<Token[]>(() => result.value?.tokens ?? [])

  return {
    result,
    tokens,
    onError,
    onResult,
    loading,
    variables
  }
}
