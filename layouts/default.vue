<template>
  <div class="flex flex-col max-w-[192rem] m-auto text-white pb-[2.4rem] mb:pb-mbGap">
    <div
      :class="[{
        'border-b border-solid border-darkGrey pb-[3.2rem] mb:border-none mb:pb-0': isShow
      }]"
    >
      <transition name="fade">
        <div
          v-if="isShow && isMain"
          ref="stickyContainerRef"
          class="sticky top-0 w-full p-gap only-desktop z-0"
        >
          <LogoImg ref="logoRef" />
        </div>
      </transition>

      <HeaderWidget
        class="z-10"
        :is-reversed="!isMain"
      />
    </div>

    <main>
      <slot />
    </main>

    <FooterWidget />
  </div>
</template>

<script setup lang="ts">
import type { VNodeRef } from 'vue'

import { LogoImg } from '@/global/ui'
import { HeaderWidget } from '@/widgets/Header'
import { FooterWidget } from '@/widgets/Footer'

defineOptions({
  name: 'LayoutDefault'
})

const logoRef = ref<VNodeRef | null>(null);
const stickyContainerRef = ref<VNodeRef | null>(null);

const isShow = isShowFullHeader();

function handleScroll() {
  const scrollY = window.scrollY;
  const stickyContainer = stickyContainerRef.value;
  const el = logoRef.value?.$el

  if (!el || !stickyContainer) return

  if (scrollY >= el.clientHeight + 32) {
    el.style.opacity = '0';
    el.style.visibility = 'hidden';

    stickyContainer.style.zIndex = '-1';
  } else {
    el.style.opacity = '';
    el.style.visibility = '';

    stickyContainer.style.zIndex = '';
  }
}

const isMain = isMainPage()

onMounted(() => {
  handleScroll();

  window.addEventListener('scroll', handleScroll)
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
});
</script>
