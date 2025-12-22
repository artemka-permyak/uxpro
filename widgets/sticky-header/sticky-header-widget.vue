<template>
  <header>
    <HeaderWidget
      ref="headerMenuWidget"
      class="border-t border-solid border-dark-grey"
      @open:modal-burger="handleOpenModalBurger"
    />

    <transition name="fade">
      <div
        v-if="isShowStickyTopHeader"
        class="fixed top-0 left-0 right-0 z-20"
      >
        <HeaderWidget
          class="max-w-[192rem] mx-auto shadow-xl"
          @open:modal-burger="handleOpenModalBurger"
        />
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { HeaderWidget } from '~/widgets/header'

defineOptions({
  name: 'StickyHeaderWidget'
})

const emit = defineEmits<{
  (event: 'open:modal-burger'): void
}>()

const isShowStickyTopHeader = ref(false)
const observer = ref<IntersectionObserver | null>(null)
const headerMenuWidget = ref<Element | null>(null)

onMounted(() => {
  observer.value = new IntersectionObserver(entries => {
    const entry = entries[0]

    isShowStickyTopHeader.value = !entry?.isIntersecting && entry.boundingClientRect.bottom < 0;
  }, {
    threshold: 0
  })

  if (headerMenuWidget.value) {
    observer.value.observe(headerMenuWidget.value.$el)
  }
})

function handleOpenModalBurger() {
  emit('open:modal-burger');
}
</script>
