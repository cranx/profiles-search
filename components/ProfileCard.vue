<template>
  <article class="profile-card" :class="{ 'is-suitable': isSuitable }">
    <div class="profile-card__image">
      <picture v-if="shouldLoadImage" v-show="isImageLoaded">
        <source
          :srcset="`${avatarMobile}, ${avatarX1} 2x`"
          media="(max-width: 768px)"
        />
        <source :srcset="`${avatarX1}, ${profile.avatar} 2x`" />
        <img :src="avatarX1" :alt="profile.name" @load="onImageLoaded" />
      </picture>
      <Loader v-if="!isImageLoaded" is-small />
    </div>
    <div class="profile-card__main">
      <address>
        <div class="profile-card__top">
          <h3
            class="profile-card__name"
            v-html="highlightQuery(profile.name)"
          />
          <a
            class="profile-card__email"
            :href="`mailto:${profile.email}`"
            v-html="highlightQuery(profile.email)"
          />
        </div>
        <div
          class="profile-card__title"
          v-html="highlightQuery(profile.title)"
        />
        <div
          class="profile-card__address"
          v-html="highlightQuery(profile.address)"
        />
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

    query: {
      type: String,
      default: null,
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

    avatarMobile() {
      // todo: set it in source json
      return this.profile.avatar?.replace('size=300x300', 'size=64x64')
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

    highlightQuery(field) {
      if (!this.query?.length) {
        return field
      }

      return field.replaceAll(new RegExp(this.query, 'ig'), `<mark>$&</mark>`)
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
    display: flex;
    align-items: center;
    background: rgba(0, 0, 0, 0.25);
    min-width: 64px;
    max-width: 64px;
    height: 64px;
    border-radius: 3px;
    margin: 12px 0 12px 12px;

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
      margin-top: 25px;
    }
  }

  &__main {
    padding: 10px 0 18px 0;
    flex-grow: 1;
    margin-left: 12px;

    address {
      font-style: normal;
      margin-right: 9px;
    }
  }

  &__name {
    margin: 0 8px 0 0;
    padding: 0;
    font-weight: normal;
    font-size: 20px;
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
    font-size: 11px;
    line-height: 16px;
    color: rgba(0, 0, 0, 0.54);
    text-overflow: ellipsis;
    max-width: 90%;
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

  mark {
    color: inherit;
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

  @media (min-width: $breakpointTablet) {
    .loader {
      margin-top: 22px;
    }

    &__image {
      min-width: 134px;
      max-width: 134px;
      min-height: 136px;
      height: auto;
      margin: 0;
      border-radius: 0;
    }

    &__main {
      margin-left: 12px;

      address {
        margin-left: 26px;
      }
    }

    &__button {
      margin-left: 32px;
    }

    &__email {
      font-size: 14px;
      max-width: 100%;
    }

    &__name {
      font-size: 24px;
    }
  }
}
</style>
