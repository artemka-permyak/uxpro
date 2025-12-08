<template>
  <NuxtLink
    v-if="asButton"
    :to="{
      name: 'contact-us'
    }"
    v-bind="$attrs"
  >
    <ButtonUi>
      {{ label }}
    </ButtonUi>
  </NuxtLink>

  <Link
    v-else
    :to="{
      name: 'contact-us'
    }"
    icon="arrow-right"
    :icon-size="iconSize"
    v-bind="$attrs"
  >
    {{ label }}
  </Link>
</template>

<script setup lang="ts">
import { Link } from '~/global/ui'
import ButtonUi from '~/global/ui/button.vue'

defineOptions({
  name: 'ContactUsFeature'
})

const props = withDefaults(defineProps<{
  label?: string
  asButton?: boolean
  iconSize?: string
}>(), {
  label: 'Оставить заявку',
})

const {
  label,
  asButton,
  iconSize,
} = toRefs(props)
</script>

