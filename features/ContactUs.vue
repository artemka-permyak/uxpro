<template>
  <ArrowFilledLink
    :label="LABELS.title"
    :to="{
      name: 'contact-us'
    }"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { ArrowFilledLink } from '~/global/ui'

defineOptions({
  name: 'ContactUsFeature'
})

const LABELS = {
  title: 'Оставить заявку',
}
</script>

