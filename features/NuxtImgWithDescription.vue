<template>
  <div class="relative">
    <NuxtImg
      v-bind="$attrs"
      class="w-full h-full"
      @load="handleLoad"
    />

    <template v-if="props.description && isLoadImage">
      <div
        class="absolute inset-0"
        style="background: linear-gradient(179.93deg, rgba(255, 255, 255, 0) 65.26%, rgba(0, 0, 0, 0.5538) 99.94%);"
      />

      <div class="absolute left-[1.6rem] bottom-[1.6rem] mb:bottom-[.8rem]">
        <div class="only-desktop text-[2.4rem] leading-[2.7rem]">
          {{ props.description }}
        </div>

        <div class="only-mobile t1sb">
          {{ props.description }}
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  description?: string
}>()

const isLoadImage = ref(false)

function handleLoad() {
  isLoadImage.value = true
}
</script>
