<template>
  <div class="flex flex-col gap-[12.8rem] mb:gap-[8rem]">
    <div class="flex flex-col">
      <ProjectPageHeader
        :project="project"
      />

      <NuxtImg
        :src="project?.app_image"
        format="webp"
        preload
        alt="Главное изображение"
        class="w-full p-gap object-cover mb:px-0 mb:py-mbGap"
      />
    </div>

    <div
      v-for="block in blocks"
      :key="block.id"
      class="px-gap mb:px-0"
    >
      <div
        v-if="['splitBlock', 'splitBlockDivided'].includes(block.type)"
        class="flex flex-col gap-[16rem] mb:gap-[8rem]"
      >
        <SplitBlock right-width="48%">
          <template #left>
            <h1 class="h1 mb:px-mbGap">
              {{ getSplitBlockTitle(getSplitBlockIndex(block)) }}
            </h1>
          </template>

          <template #right>
            <div class="flex flex-col gap-[12.8rem] mb:gap-gap mb:px-mbGap">
              <div class="flex flex-col gap-[2.4rem]">
                <h1 class="h1">
                  {{ block.title }}
                </h1>

                <div
                  v-if="block.description?.length"
                  class="flex flex-col gap-gap"
                >
                  <p
                    v-for="(description, descriptionIndex) in block.description"
                    :key="`description-${descriptionIndex}`"
                    class="t1sb"
                    v-html="description"
                  />
                </div>

                <div
                  v-if="block.dedicated_description?.length"
                  class="flex flex-col gap-gap"
                >
                  <p
                    v-for="(description, descriptionIndex) in block.dedicated_description"
                    :key="`dedicated-description-${descriptionIndex}`"
                    class="t1sb text-grey"
                  >
                    {{ description }}
                  </p>
                </div>
              </div>

              <template v-if="block.content?.length">
                <div
                  v-if="block.type === 'splitBlockDivided'"
                  class="flex flex-col border-t border-t-solid border-t-darkGrey"
                >
                  <div
                    v-for="(itemContent, itemContentIndex) in block.content"
                    :key="`divided-content-item-${itemContentIndex}`"
                    class="flex flex-col gap-[2.4rem] border-b border-b-solid border-b-darkGrey py-gap"
                  >
                    <h2 class="h2">
                      {{ itemContent.title }}
                    </h2>

                    <p
                      v-if="itemContent.description"
                      class="t1"
                    >
                      {{ itemContent.description }}
                    </p>
                    <p
                      v-else
                      class="t1 text-grey"
                    >
                      {{ itemContent.dedicatedDescription }}
                    </p>
                  </div>
                </div>

                <div
                  v-if="block.type === 'splitBlock'"
                  class="flex flex-col gap-[12.8rem] mb:gap-[6.4rem]"
                >
                  <div
                    v-for="(itemContent, itemContentIndex) in block.content"
                    :key="`content-item-${itemContentIndex}`"
                    class="flex flex-col gap-[2.4rem]"
                  >
                    <h1
                      v-if="itemContent.title"
                      class="h1"
                    >
                      {{ itemContent.title }}
                    </h1>

                    <p
                      v-if="itemContent.smallTitle"
                      class="t1sb"
                    >
                      {{ itemContent.smallTitle }}
                    </p>

                    <div
                      v-if="itemContent.dedicatedDescription"
                      class="t1 flex flex-col gap-[2.4rem] text-grey"
                    >
                      <p
                        v-for="(description, descriptionIndex) in itemContent.dedicatedDescription"
                        :key="`split-block-description-${descriptionIndex}`"
                        class="only-desktop"
                      >
                        {{ description }}
                      </p>

                      <p
                        v-for="(description, descriptionIndex) in itemContent.dedicatedDescription.slice(0, 1)"
                        :key="`split-block-description-mobile-${descriptionIndex}`"
                        class="only-mobile"
                      >
                        {{ description }}
                      </p>

                      <template v-if="showedSplitBlocksContentSmallTitleIds.includes(block.id)">
                        <p
                          v-for="(description, descriptionIndex) in itemContent.dedicatedDescription.slice(1)"
                          :key="`split-block-description-mobile-${descriptionIndex + 1}`"
                          class="only-mobile"
                        >
                          {{ description }}
                        </p>
                      </template>

                      <div
                        v-if="itemContent.dedicatedDescription.length - 1 > 0 && !showedSplitBlocksContentSmallTitleIds.includes(block.id)"
                        class="only-mobile t1sb w-max text-white border-b border-b-solid border-b-white"
                        @click="showSplitBlockContentSmallTitle(block.id)"
                      >
                        Еще {{ itemContent.dedicatedDescription.length - 1 }}
                      </div>
                    </div>

                    <div
                      v-if="itemContent.statistics"
                      class="grid grid-cols-2 gap-[6.4rem]"
                    >
                      <div
                        v-for="(statisticsItem, statisticsItemIndex) in itemContent.statistics"
                        :key="`split-block-statistics-item-${statisticsItemIndex}`"
                        class="flex flex-col gap-mbGap w-full grow"
                      >
                        <h1
                          v-if="statisticsItem.title"
                          class="text-[12.8rem] leading-[12.8rem] mb:text-[6.4rem] mb:leading-[7rem]"
                        >
                          {{ statisticsItem.title }}
                        </h1>

                        <p
                          v-if="statisticsItem.description"
                          class="t1sb text-grey"
                        >
                          {{ statisticsItem.description }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </template>
        </SplitBlock>

        <div
          v-if="block.media?.length"
          :class="['gap-gap only-desktop', {
            'flex flex-col': !block.media_position || ['one-to-one'].includes(block.media_position),
            'grid grid-cols-2': ['one-to-two', 'horizontal-two-to-one', 'one-to-two-to-one', 'two-to-two'].includes(block.media_position),
          }]"
        >
          <template v-for="(media, mediaIndex) in block.media">
            <NuxtImgWithDescription
              v-if="getFileType(media.src) === 'image'"
              :key="`${block.title}-image-media-${mediaIndex}`"
              :src="media.src"
              :alt="`${block.title} Изображение`"
              format="webp"
              loading="lazy"
              :description="media.description"
              :class="[{
                'col-span-2': block.media_position === 'one-to-two' && mediaIndex % 3 === 0,
                'row-span-2': block.media_position === 'horizontal-two-to-one' && mediaIndex === 1,
              }]"
            />
            <VideoUi
              v-else
              :key="`${block.title}-video-media-${mediaIndex}`"
              :src="media.src"
              :poster="media.poster"
              :class="[{
                'col-span-2': block.media_position === 'one-to-two' && mediaIndex % 3 === 0,
                'row-span-2': block.media_position === 'horizontal-two-to-one' && mediaIndex === 1,
              }]"
            />
          </template>
        </div>

        <div
          v-if="block.media?.length"
          class="flex flex-col gap-mbGap only-mobile"
        >
          <template v-for="(media, mediaIndex) in block.media">
            <NuxtImgWithDescription
              v-if="getFileType(media.src) === 'image'"
              :key="`${block.title}-image-media-mobile-${mediaIndex}`"
              :src="media.src"
              :alt="`${block.title} Изображение`"
              format="webp"
              loading="lazy"
              :description="media.description"
            />
            <VideoUi
              v-else
              :key="`${block.title}-video-media-${mediaIndex}`"
              :src="media.src"
              :poster="media.poster"
            />
          </template>
        </div>
      </div>

      <div
        v-if="block.type === 'centeredBlock' && block.content?.length"
        class="flex flex-col gap-[15.2rem] mb:gap-gap"
      >
        <div class="w-[89.6rem] mx-auto flex flex-col gap-[9.6rem] mb:w-full mb:gap-[4.8rem] mb:px-mbGap">
          <h1 class="h1">
            {{ block.title }}
          </h1>

          <div
            v-for="(itemContent, itemContentIndex) in block.content"
            :key="`centered-block-content-item-${itemContentIndex}`"
            class="flex flex-col gap-[6.4rem] mb:gap-[3.2rem]"
          >
            <div class="flex flex-col gap-[2.4rem]">
              <h2 class="h2">
                {{ itemContentIndex + 1 }}. {{ itemContent.title }}
              </h2>

              <p class="t1 text-grey">
                {{ itemContent.description }}
              </p>
            </div>
            <div class="flex gap-[2.4rem] mb:overflow-x-auto mb:snap-x">
              <NuxtImg
                v-for="(image, imageIndex) in itemContent.images"
                ref="centeredBlockImages"
                :key="`centered-block-content-item-image-${imageIndex}`"
                :src="image"
                :alt="`${block.title} ${itemContent.title} Контент Изображение`"
                :class="`h-auto flex-1 mb:snap-center`"
                :style="{
                  width: `calc(100% / ${itemContent.images.length})`,
                }"
                format="webp"
                loading="lazy"
                @load="getCenteredBlockImageDimensions(block, itemContentIndex, imageIndex)"
              />
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-[6.4rem]">
          <NuxtImg
            v-for="(media, mediaIndex) in block.media"
            :key="`centered-block-media-${mediaIndex}`"
            :src="media.src"
            :alt="`${block.title} Изображение`"
            format="webp"
            loading="lazy"
          />
        </div>
      </div>

      <div
        v-if="block.type === 'review'"
        class="flex flex-col gap-[12.8rem] mb:gap-[6.4rem] mb:px-mbGap"
      >
        <div class="flex justify-between gap-mbGap mb:flex-col">
          <div class="flex flex-col justify-between gap-[2.4rem]">
            <h1 class="h1">
              {{ getSplitBlockTitle(getSplitBlockIndex(block)) }}
            </h1>

            <h1 class="h1">
              Отзыв клиента
            </h1>
          </div>

          <div class="only-desktop h1 w-[121.1rem] flex flex-col gap-[6.4rem]">
            <p
              v-for="(itemReview, itemReviewIndex) in block.review"
              :key="`review-item-${itemReviewIndex}`"
            >
              {{ itemReview }}
            </p>
          </div>

          <div class="only-mobile t1sb w-full flex flex-col gap-mbGap">
            <p
              v-for="(itemReview, itemReviewIndex) in block.review"
              :key="`review-item-mobile-${itemReviewIndex}`"
            >
              {{ itemReview }}
            </p>
          </div>
        </div>

        <div class="w-full flex gap-[1.6rem] mb:h-auto mb:flex-col">
          <div
            v-for="index in 3"
            :key="`review-photo-${index}`"
            :class="['w-full only-desktop', {
              'aspect-square': block.reviewer_photo,
            }]"
            :style="{
              display: index === 2 && !block.reviewer_photo ? 'none' : '',
              minWidth: index === 1 && !block.reviewer_photo ? '60.8rem' : '',
              width: index === 1 && !block.reviewer_photo ? '60.8rem' : '',
            }"
          >
            <ReviewQuotes
              v-if="index === 1"
              width="608"
              height="608"
              class="w-full h-full"
            />

            <NuxtImg
              v-if="index === 2 && block.reviewer_photo"
              :src="block.reviewer_photo"
              alt="Клиент"
              class="w-full h-full object-cover"
              format="webp"
              loading="lazy"
            />

            <div
              v-if="index === 3"
              class="w-full h-full flex flex-col justify-end gap-[1rem] bg-darkGrey p-gap mb:aspect-square"
            >
              <h2 class="h2">
                {{ block.reviewer_name }}
              </h2>

              <p class="t1sb">
                {{ block.reviewer_job_title }}
              </p>
            </div>
          </div>

          <div
            v-for="index in 3"
            :key="`mobile-review-photo-${index}`"
            class="w-full only-mobile"
          >
            <ReviewQuotes
              v-if="index === 1"
              class="w-full h-full"
            />

            <NuxtImg
              v-if="index === 2 && block.reviewer_photo"
              :src="block.reviewer_photo"
              alt="Клиент"
              class="w-full h-full object-cover"
              format="webp"
              loading="lazy"
            />

            <div
              v-if="index === 3"
              class="w-full h-full flex flex-col justify-end gap-[1rem] bg-darkGrey p-gap mb:aspect-square"
            >
              <h2 class="h2">
                {{ block.reviewer_name }}
              </h2>

              <p class="t1sb">
                {{ block.reviewer_job_title }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <SplitBlock v-if="block.type === 'author'">
        <template #right>
          <div class="flex flex-col gap-[6.4rem] mb:gap-mbGap mb:px-mbGap">
            <h1 class="h1">
              {{ block.title }}
            </h1>

            <div class="flex flex-col border-t border-t-solid border-t-darkGrey">
              <div
                v-for="(author, authorIndex) in block.content"
                :key="`author-${authorIndex}`"
                class="flex justify-between py-gap border-b border-b-solid border-b-darkGrey mb:flex-col mb:gap-mbGap"
              >
                <h3 class="h3">
                  {{ author.name }}
                </h3>

                <h3 class="h3 only-desktop">
                  {{ author.job_title }}
                </h3>

                <p class="t1sb only-mobile text-grey">
                  {{ author.job_title }}
                </p>
              </div>
            </div>
          </div>
        </template>
      </SplitBlock>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getSplitBlockTitle, SplitBlock } from '@/global/ui'
import { ProjectPageHeader } from '@/widgets/ProjectPage'
import ReviewQuotes from '@/public/svgs/reviewQuotes.svg'
import ContactUsFeature from '@/features/ContactUs.vue'
import { getFileType } from '@/global/lib'
import VideoUi from '@/global/ui/Video.vue'
import NuxtImgWithDescription from '@/features/NuxtImgWithDescription.vue'

defineOptions({
  name: 'ProjectPage',
})

const route = useRoute();

const showedSplitBlocksContentSmallTitleIds = ref<string[]>([]);

const centeredBlockImages = ref();

const { data: projectData } = useAsyncData('projects', async () => {
  return await $fetch(`/api/projects/${route.params.id}`)
})

const project = computed(() => {
  return projectData?.value?.data;
})

const { data: blocksData } = useAsyncData('blocks', async () => {
  return await $fetch(`/api/projects/${route.params.id}/blocks`)
})

const blocks = computed(() => {
  return [...blocksData?.value?.data || []].sort((a, b) => a.order - b.order);
})

function getSplitBlockIndex(block: object) {
  const splitBlocks = blocks.value.filter(block => ['splitBlock', 'splitBlockDivided', 'review'].includes(block.type))

  const index = splitBlocks.findIndex(splitBlock => splitBlock.id === block.id)

  if (index === -1) {
    return `0`
  } else {
    return `0${index + 1}`
  }
}

function showSplitBlockContentSmallTitle(id: string) {
  showedSplitBlocksContentSmallTitleIds.value.push(id);
}

function getCenteredBlockImageDimensions(block: object, itemContentIndex: number, imageIndex: number) {
  let sum = 0;

  for (let i = itemContentIndex - 1; i >= 0; i--) {
    const prevLength = block.content[i].images.length;

    sum += prevLength
  }

  const img = centeredBlockImages.value[sum + imageIndex].$el;
  const width = img.naturalWidth;
  const height = img.naturalHeight;
  console.log(`Ширина: ${width}, Высота: ${height}`);
}

</script>
