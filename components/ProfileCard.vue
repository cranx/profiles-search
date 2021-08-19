<template>
  <article class="profile-card" :class="{ 'is-suitable': isSuitable }">
    <div class="profile-card__image">
      <picture v-if="shouldLoadImage" v-show="isImageLoaded">
        <source :srcset="`${avatarX1}, ${profile.avatar} 2x`" />
        <img :src="avatarX1" :alt="profile.name" @load="onImageLoaded" />
      </picture>
      <Loader v-if="!isImageLoaded" />
    </div>
    <div class="profile-card__main">
      <address>
        <div class="profile-card__top">
          <h3 class="profile-card__name">{{ profile.name }}</h3>
          <a class="profile-card__email" :href="`mailto:${profile.email}`">{{
            profile.email
          }}</a>
        </div>
        <div class="profile-card__title">
          {{ profile.title }}
        </div>
        <div class="profile-card__address">
          {{ profile.address }}
        </div>
      </address>

      <div class="profile-card__bottom">
        <button class="profile-card__button" @click="onButtonClick">
          {{ buttonText }}
        </button>
      </div>
    </div>
  </article>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'ProfileCard',

  props: {
    profile: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      isImageLoaded: false,
      shouldLoadImage: false,
    }
  },

  computed: {
    ...mapGetters(['getProfileSuitability']),

    isSuitable() {
      return this.$store.getters.getProfileSuitability(this.profile.id)
    },

    avatarX1() {
      // todo: set it in source json
      return this.profile.avatar?.replace('size=300x300', 'size=150x150')
    },

    buttonText() {
      return this.isSuitable ? 'Skip selection' : 'Mark as suitable'
    },
  },

  watch: {
    'profile.avatar': {
      handler() {
        const IMAGE_LOADING_DELAY = 300

        this.isImageLoaded = false
        this.shouldLoadImage = false

        clearTimeout(this.timeoutId)
        this.timeoutId = setTimeout(() => {
          this.shouldLoadImage = true
        }, IMAGE_LOADING_DELAY)
      },

      immediate: true,
    },
  },

  beforeMount() {
    this.timeoutId = null
  },

  beforeDestroy() {
    clearTimeout(this.timeoutId)
  },

  methods: {
    ...mapMutations(['toggleProfileSuitability']),

    onImageLoaded() {
      this.isImageLoaded = true
    },

    onButtonClick() {
      this.toggleProfileSuitability(this.profile.id)
    },
  },
}
</script>

<style lang="scss">
.profile-card {
  position: relative;
  min-height: 136px;
  background: #fafafa;
  display: flex;
  transition: background-color 0.2s ease-in-out;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.24);
  border-radius: 3px;
  overflow: hidden;

  &__image {
    min-width: 134px;
    max-width: 134px;
    min-height: 136px;
    display: flex;
    align-items: center;
    background: rgba(0, 0, 0, 0.25);

    picture {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: flex-end;
    }

    img {
      width: 100%;
    }

    .loader {
      margin-top: 22px;
    }
  }

  &__main {
    padding: 10px 0 18px 0;
    flex-grow: 1;

    > address {
      font-style: normal;
      margin-left: 26px;
      margin-right: 9px;
    }
  }

  &__name {
    margin: 0 8px 0 0;
    padding: 0;
    font-weight: normal;
    font-size: 24px;
    line-height: 32px;
  }

  &__title {
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
    color: rgba(0, 0, 0, 0.543846);
  }

  &__top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  &__email {
    margin-bottom: 4px;
    font-size: 14px;
    line-height: 16px;
    color: rgba(0, 0, 0, 0.54);
  }

  &__address {
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 2px;
    color: rgba(0, 0, 0, 0.543846);
  }

  &__bottom {
    padding-top: 14px;
    border-top: 1px solid rgba(0, 0, 0, 0.12);
  }

  &__button {
    margin-left: 32px;
    margin-right: 9px;
    width: 140px;
    border: none;
    padding: 0;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    text-transform: uppercase;
    text-align: center;
    color: #009688;
    background: transparent;
    cursor: pointer;
    outline: none;
    opacity: 1;
    transition: opacity 0.2s ease-in-out;

    &:hover {
      opacity: 0.7;
    }
  }

  &:hover {
    background: #f0f0f0;
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    pointer-events: none;
    border: 1px solid #4765ff;
    border-radius: inherit;
    transition: opacity 0.2s ease-in-out;
    opacity: 0;
  }

  &.is-suitable::before {
    opacity: 1;
  }
}
</style>
