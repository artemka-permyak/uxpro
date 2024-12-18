import { ref } from 'vue';
import type { AsyncDataRequestStatus } from '#app'

export default function useFetchStatus(status: Ref<AsyncDataRequestStatus, AsyncDataRequestStatus>) {
  return ref({
    isPending: status.value === 'pending',
    isIdle: status.value === 'idle',
    isSuccess: status.value === 'success',
    isError: status.value === 'error',
  }).value
}
