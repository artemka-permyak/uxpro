<template>
  <component
    :is="iconComponent"
    v-bind="$attrs"
    :class="['inline-block', sizeClass]"
    :style="typeof size === 'number' ? {
      width: `${size}px`,
      height: `${size}px`,
    } : undefined"
    role="img"
  />
</template>

<script setup lang="ts">
defineOptions({
  name: 'Icon',
})

const icons = import.meta.glob('@/global/assets/svg/*.svg', { eager: true })

const props = defineProps<{
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number
}>()

const iconComponent = computed(() => {
  const path = `/global/assets/svg/${props.name}.svg`

  return icons[path]?.default || null
})

const sizeClass = computed(() => {
  const map = {
    xs: 'w-size-3 h-size-3',
    sm: 'w-size-4 h-size-4',
    md: 'w-size-5 h-size-5',
    lg: 'w-size-6 h-size-6',
    xl: 'w-size-7 h-size-7',
    '2xl': 'w-size-8 h-size-8',
  }

  return map[props.size || 'md']
})
</script>
