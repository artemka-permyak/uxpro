<template>
  <div class="w-full">
    <div ref="emblaRef" class="overflow-hidden">
      <div class="flex touch-pan-y">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import emblaCarouselVue from 'embla-carousel-vue'

defineOptions({
  name: 'Slider'
})

const props = defineProps<{
  options?: any,
  plugins?: any
}>()

const {
  options,
  plugins,
} = toRefs(props)

// 🔥 Инициализируем Embla с внешними опциями
const [emblaRef, emblaApi] = emblaCarouselVue(
  options.value,
  plugins.value,
)

defineExpose({ emblaApi })
</script>
