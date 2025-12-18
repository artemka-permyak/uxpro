<template>
  <div class="flex flex-col gap-[12.8rem] max-xl-plus:gap-size-20">
    <div class="flex flex-col">
      <ProjectPageHeader
        :project="project"
      />

      <div
        v-for="media in project?.media"
        :key="media.src"
        class="w-full p-size-8 max-xl-plus:px-0 max-xl-plus:py-size-6"
      >
        <NuxtImg
          v-if="getFileType(media.src) === 'image'"
          :src="media.src"
          alt="Главное изображение"
          format="webp"
          class="w-full object-cover"
        />

        <VideoUi
          v-else
          :src="media.src"
          :poster="media.poster"
        />
      </div>
    </div>

    <div
      v-for="block in blocks"
      :key="block.blockId"
      class="px-size-8 max-xl-plus:px-0"
    >
      <div
        v-if="['splitBlock', 'splitBlockDivided'].includes(block.type)"
        class="flex flex-col gap-[16rem] max-xl-plus:gap-size-20"
      >
        <SplitBlock right-width="48%">
          <template #left>
            <h2 class="text-h2 max-xl-plus:px-size-6 only-desktop">
              {{ getSplitBlockTitle(getSplitBlockIndex(block)) }}
            </h2>

            <h1 class="text-h1 max-xl-plus:px-size-6 only-mobile">
              {{ getSplitBlockTitle(getSplitBlockIndex(block)) }}
            </h1>
          </template>

          <template #right>
            <div class="flex flex-col gap-size-16 max-xl-plus:gap-size-8 max-xl-plus:px-size-6">
              <div class="flex flex-col gap-size-6">
                <h2 class="text-h2 only-desktop">
                  {{ block.title }}
                </h2>

                <h1 class="text-h1 only-mobile">
                  {{ block.title }}
                </h1>

                <div
                  v-if="block.description?.length"
                  class="flex flex-col gap-size-8"
                >
                  <p
                    v-for="(description, descriptionIndex) in block.description"
                    :key="`description-${descriptionIndex}`"
                    v-html="description"
                  />
                </div>

                <div
                  v-if="block.dedicatedDescription?.length"
                  class="flex flex-col gap-size-8"
                >
                  <p
                    v-for="(description, descriptionIndex) in block.dedicatedDescription"
                    :key="`dedicated-description-${descriptionIndex}`"
                    class="text-grey"
                  >
                    {{ description }}
                  </p>
                </div>
              </div>

              <template v-if="block.content?.length">
                <div
                  v-if="block.type === 'splitBlockDivided'"
                  class="flex flex-col border-t border-t-solid border-t-dark-grey"
                >
                  <div
                    v-for="(itemContent, itemContentIndex) in block.content"
                    :key="`divided-content-item-${itemContentIndex}`"
                    class="flex flex-col gap-size-6 border-b border-b-solid border-b-dark-grey py-size-8"
                  >
                    <h3 class="text-h3 only-desktop">
                      {{ itemContent.title }}
                    </h3>

                    <h4 class="text-h4 only-mobile">
                      {{ itemContent.title }}
                    </h4>

                    <p v-if="itemContent.description">
                      {{ itemContent.description }}
                    </p>
                    <p
                      v-else
                      class="text-grey"
                    >
                      {{ itemContent.dedicatedDescription }}
                    </p>
                  </div>
                </div>

                <div
                  v-if="block.type === 'splitBlock'"
                  class="flex flex-col gap-[12.8rem] max-xl-plus:gap-[6.4rem]"
                >
                  <div
                    v-for="(itemContent, itemContentIndex) in block.content"
                    :key="`content-item-${itemContentIndex}`"
                    class="flex flex-col gap-size-6"
                  >
                    <h1
                      v-if="itemContent.title"
                      class="text-h1"
                    >
                      {{ itemContent.title }}
                    </h1>

                    <p v-if="itemContent.smallTitle">
                      {{ itemContent.smallTitle }}
                    </p>

                    <div
                      v-if="itemContent.dedicatedDescription"
                      class="flex flex-col gap-size-6 text-grey"
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
                        class="only-mobile w-max text-white border-b border-b-solid border-b-white"
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
                        class="flex flex-col gap-size-6 w-full grow"
                      >
                        <h1
                          v-if="statisticsItem.title"
                          class="text-[12.8rem] leading-[12.8rem] max-xl-plus:text-[6.4rem] max-xl-plus:leading-[7rem]"
                        >
                          {{ statisticsItem.title }}
                        </h1>

                        <p
                          v-if="statisticsItem.description"
                          class="text-grey"
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
          :class="['grid gap-size-8 only-desktop', {
            // 'flex flex-col': !block.media_position || ['one-to-one'].includes(block.media_position),
            // 'grid grid-cols-2': ['one-to-two', 'horizontal-two-to-one', 'one-to-two-to-one', 'two-to-two'].includes(block.media_position),
          }]"
        >
          <div
            v-for="(media, mediaIndex) in block.media"
            :key="`media-${mediaIndex}`"
            :style="media.style"
          >
            <div
              v-if="media.row"
              class="grid gap-size-8"
              :style="{
                gridTemplateColumns: `repeat(${media.cols}, 1fr)`,
              }"
            >
              <template
                v-for="(mediaMedia, mediaMediaIndex) in media.media"
                :key="`media-media-${mediaMediaIndex}`"
              >
                <NuxtImgWithDescription
                  v-if="getFileType(mediaMedia.src) === 'image'"
                  :key="`${block.title}-image-media-${mediaIndex}`"
                  :src="mediaMedia.src"
                  :alt="`${block.title} Изображение`"
                  format="webp"
                  loading="lazy"
                  class="object-cover"
                  :description="mediaMedia.description"
                />
                <!--                :class="[{-->
                <!--                  'col-span-2': block.media_position === 'one-to-two' && mediaIndex % 3 === 0,-->
                <!--                  'row-span-2': block.media_position === 'horizontal-two-to-one' && mediaIndex === 1,-->
                <!--                }]"-->

                <VideoUi
                  v-else
                  :key="`${block.title}-video-media-${mediaIndex}`"
                  :src="mediaMedia.src"
                  :poster="mediaMedia.poster"
                />
                <!--                :class="[{-->
                <!--                  'col-span-2': block.media_position === 'one-to-two' && mediaIndex % 3 === 0,-->
                <!--                  'row-span-2': block.media_position === 'horizontal-two-to-one' && mediaIndex === 1,-->
                <!--                }]"-->
              </template>
            </div>

            <template v-else>
              <NuxtImgWithDescription
                v-if="getFileType(media.src) === 'image'"
                :key="`${block.title}-image-media-${mediaIndex}`"
                :src="media.src"
                :alt="`${block.title} Изображение`"
                format="webp"
                loading="lazy"
                class="object-cover"
                :description="media.description"
              />
              <!--                :class="[{-->
              <!--                  'col-span-2': block.media_position === 'one-to-two' && mediaIndex % 3 === 0,-->
              <!--                  'row-span-2': block.media_position === 'horizontal-two-to-one' && mediaIndex === 1,-->
              <!--                }]"-->

              <VideoUi
                v-else
                :key="`${block.title}-video-media-${mediaIndex}`"
                :src="media.src"
                :poster="media.poster"
              />
              <!--                :class="[{-->
              <!--                  'col-span-2': block.media_position === 'one-to-two' && mediaIndex % 3 === 0,-->
              <!--                  'row-span-2': block.media_position === 'horizontal-two-to-one' && mediaIndex === 1,-->
              <!--                }]"-->
            </template>
          </div>
        </div>

        <div
          v-if="block.media?.length"
          class="flex flex-col gap-size-6 only-mobile"
        >
          <div
            v-for="(media, mediaIndex) in block.media.flatMap(item => item.row ? item.media : item)"
            :style="media.style"
          >
            <NuxtImgWithDescription
              v-if="getFileType(media.src) === 'image'"
              :key="`${block.title}-image-media-mobile-${mediaIndex}`"
              :src="media.src"
              :alt="`${block.title} Изображение`"
              format="webp"
              loading="lazy"
              class="object-cover"
              :description="media.description"
            />

            <VideoUi
              v-else
              :key="`${block.title}-video-media-${mediaIndex}`"
              :src="media.src"
              :poster="media.poster"
            />
          </div>
        </div>
      </div>

      <div
        v-if="block.type === 'centeredBlock' && block.content?.length"
        class="flex flex-col gap-[15.2rem] max-xl-plus:gap-size-8"
      >
        <div class="w-[89.6rem] mx-auto flex flex-col gap-[9.6rem] max-xl-plus:w-full max-xl-plus:gap-[4.8rem] max-xl-plus:px-size-6">
          <h2 class="text-h2">
            {{ block.title }}
          </h2>

          <div
            v-for="(itemContent, itemContentIndex) in block.content"
            :key="`centered-block-content-item-${itemContentIndex}`"
            class="flex flex-col gap-[6.4rem] max-xl-plus:gap-[3.2rem]"
          >
            <div class="flex flex-col gap-size-6">
              <h2 class="text-h2">
                {{ itemContentIndex + 1 }}. {{ itemContent.title }}
              </h2>

              <p class="text-grey">
                {{ itemContent.description }}
              </p>
            </div>
            <div class="flex gap-size-6 max-xl-plus:overflow-x-auto max-xl-plus:snap-x">
              <NuxtImg
                v-for="(image, imageIndex) in itemContent.images"
                ref="centeredBlockImages"
                :key="`centered-block-content-item-image-${imageIndex}`"
                :src="image"
                :alt="`${block.title} ${itemContent.title} Контент Изображение`"
                :class="`h-auto flex-1 max-xl-plus:snap-center`"
                :style="{
                  width: `calc(100% / ${itemContent.images.length})`,
                }"
                format="webp"
                loading="lazy"
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
        class="flex flex-col gap-[12.8rem] max-xl-plus:gap-[6.4rem] max-xl-plus:px-size-6"
      >
        <div class="flex justify-between gap-size-6 max-xl-plus:flex-col">
          <div class="flex items-center self-baseline gap-[1.6rem] max-xl-plus:flex-col max-xl-plus:items-start max-xl-plus:gap-size-6">
            <h2 class="text-h2 only-desktop">
              {{ getSplitBlockTitle(getSplitBlockIndex(block)) }}
            </h2>

            <h2 class="text-h2 only-desktop">
              Отзыв клиента
            </h2>

            <h1 class="text-h1 only-mobile">
              {{ getSplitBlockTitle(getSplitBlockIndex(block)) }}
            </h1>

            <h1 class="text-h1 only-mobile">
              Отзыв клиента
            </h1>
          </div>

          <div class="only-desktop text-h1 w-[121.1rem] flex flex-col gap-[6.4rem] max-xl-plus:t1">
            <p
              v-for="(itemReview, itemReviewIndex) in block.review"
              :key="`review-item-${itemReviewIndex}`"
            >
              {{ itemReview }}
            </p>
          </div>

          <div class="only-mobile w-full flex flex-col gap-size-6">
            <p
              v-for="(itemReview, itemReviewIndex) in block.review"
              :key="`review-item-mobile-${itemReviewIndex}`"
            >
              {{ itemReview }}
            </p>
          </div>
        </div>

        <div class="w-full flex gap-[1.6rem] max-xl-plus:h-auto max-xl-plus:flex-col">
          <div
            v-for="index in 3"
            :key="`review-photo-${index}`"
            :class="['w-full only-desktop', {
              'aspect-square': block.reviewerPhoto,
            }]"
            :style="{
              display: index === 2 && !block.reviewerPhoto ? 'none' : '',
              minWidth: index === 1 && !block.reviewerPhoto ? '60.8rem' : '',
              width: index === 1 && !block.reviewerPhoto ? '60.8rem' : '',
            }"
          >
            <ReviewQuotes
              v-if="index === 1"
              width="608"
              height="608"
              class="w-full h-full"
            />

            <NuxtImg
              v-if="index === 2 && block.reviewerPhoto"
              :src="block.reviewerPhoto"
              alt="Клиент"
              class="w-full h-full object-cover"
              format="webp"
              loading="lazy"
            />

            <div
              v-if="index === 3"
              class="w-full h-full flex flex-col justify-end gap-[1rem] bg-dark-grey p-size-8 max-xl-plus:aspect-square"
            >
              <h2 class="text-h2">
                {{ block.reviewerName }}
              </h2>

              <p>
                {{ block.reviewerJobTitle }}
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
              v-if="index === 2 && block.reviewerPhoto"
              :src="block.reviewerPhoto"
              alt="Клиент"
              class="w-full h-full object-cover"
              format="webp"
              loading="lazy"
            />

            <div
              v-if="index === 3"
              class="w-full h-full flex flex-col justify-end gap-[1rem] bg-dark-grey p-size-8 max-xl-plus:aspect-square"
            >
              <h2 class="text-h2">
                {{ block.reviewerName }}
              </h2>

              <p>
                {{ block.reviewerJobTitle }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <SplitBlock v-if="block.type === 'author'">
        <template #right>
          <div class="flex flex-col gap-[6.4rem] max-xl-plus:gap-size-6 max-xl-plus:px-size-6">
            <h2 class="text-h2 only-desktop">
              {{ block.title }}
            </h2>

            <h1 class="text-h1 only-mobile">
              {{ block.title }}
            </h1>

            <div class="flex flex-col gap-[6.4rem]">
              <div class="flex flex-col border-t border-t-solid border-t-dark-grey">
                <div
                  v-for="(author, authorIndex) in block.content"
                  :key="`author-${authorIndex}`"
                  class="flex justify-between py-size-8 border-b border-b-solid border-b-dark-grey max-xl-plus:flex-col max-xl-plus:gap-size-6"
                >
                  <p class="only-desktop">
                    {{ author.name }}
                  </p>

                  <h2 class="text-h2 only-mobile">
                    {{ author.name }}
                  </h2>

                  <p class="only-desktop">
                    {{ author.job_title }}
                  </p>

                  <p class="only-mobile text-grey">
                    {{ author.job_title }}
                  </p>
                </div>
              </div>

              <ContactUsFeature class="self-start" />
            </div>
          </div>
        </template>
      </SplitBlock>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getSplitBlockTitle, SplitBlock } from '@/global/ui'
import { ProjectPageHeader } from '@/widgets/project-page'
import ReviewQuotes from '@/global/assets/svg/review-quotes.svg'
import ContactUsFeature from '@/features/contact-us-feature.vue'
import { getFileType } from '@/global/lib'
import VideoUi from '~/global/ui/video.vue'
import { NuxtImgWithDescription } from '~/features'

defineOptions({
  name: 'ProjectPage',
})

definePageMeta({
  middleware: 'project-id-redirect',
})

const route = useRoute();

const showedSplitBlocksContentSmallTitleIds = ref<string[]>([]);

const centeredBlockImages = ref();

const project = await queryCollection('projects')
  .where('slug', '=', route.params.slug)
  .first()

const blocks = await queryCollection('projectsBlocks')
  .where('projectId', '=', project.projectId)
  .all()

function getSplitBlockIndex(block: object) {
  const splitBlocks = blocks.filter(block => ['splitBlock', 'splitBlockDivided', 'review'].includes(block.type))

  const index = splitBlocks.findIndex(splitBlock => splitBlock.id === block.id)

  if (index === -1) {
    return `0`
  } else {
    return `${index + 1 < 10 ? 0 : ''}${index + 1}`
  }
}

function showSplitBlockContentSmallTitle(id: string) {
  showedSplitBlocksContentSmallTitleIds.value.push(id);
}
</script>
