<template>
  <div class="flex">
    <Link :href="`tel:${PHONE}`">
      {{ PHONE }},
    </Link>

    <Link :href="`mailto:${EMAIL}`">
      {{ EMAIL }}
    </Link>
  </div>
</template>

<script setup lang="ts">
import { EMAIL, PHONE } from '@/global/const'
import { Link } from '~/global/ui'

defineOptions({
  name: 'EmailAndPhone'
})

const props = defineProps<{
  isSmallGap?: boolean
}>()
</script>
