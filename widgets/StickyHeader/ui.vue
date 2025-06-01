<template>
  <header>
    <HeaderMenuWidget
      ref="headerMenuWidget"
      class="px-gap border-t border-solid border-darkGrey mb:px-mbGap"
      @open:modal-burger="handleOpenModalBurger"
    />

    <transition name="fade">
      <div
        v-if="isShowStickyTopHeader"
        class="fixed bg-black top-0 left-0 right-0 z-20"
      >
        <HeaderMenuWidget
          class="max-w-[192rem] mx-auto shadow-xl px-gap mb:px-mbGap"
          @open:modal-burger="handleOpenModalBurger"
        />
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import HeaderMenuWidget from '~/widgets/Header/HeaderMenu.vue'

defineOptions({
  name: 'StickyHeader'
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
