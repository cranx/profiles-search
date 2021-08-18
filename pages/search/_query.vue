<template>
  <div class="search-page">
    <label for="search" class="search-page__field">
      <img
        src="~/assets/icons/search.svg"
        alt="search"
        width="24"
        height="24"
      />
      <input
        id="search"
        v-model="query"
        :placeholder="placeholder"
        type="text"
        @input="onQueryChange"
      />
    </label>

    <div class="search-page__results">
      <RecycleScroller
        v-if="foundProfiles && foundProfiles.length"
        v-slot="{ item }"
        :items="foundProfiles"
        :item-size="itemHeight"
        key-field="id"
        class="search-page__virtual-list"
      >
        <ProfileCard :profile="item" />
      </RecycleScroller>

      <Loader v-else-if="isLoading" />

      <div
        v-else-if="foundProfiles && !foundProfiles.length"
        class="search-page__no-results"
      >
        No results
      </div>
    </div>
  </div>
</template>

<script>
import debounce from 'debounce'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { RecycleScroller } from 'vue-virtual-scroller'
import { MINIMUM_CHARACTERS } from '~/utils/constants'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

const DEBOUNCE_WAITING_TIME = 200
const ITEM_HEIGHT = 156

export default {
  name: 'SearchPage',

  components: {
    RecycleScroller,
  },

  data() {
    return {
      query: '',
      placeholder: `Enter at least ${MINIMUM_CHARACTERS} characters`,
      itemHeight: ITEM_HEIGHT,
    }
  },

  computed: {
    ...mapGetters(['foundProfiles']),

    isLoading() {
      return this.query.length >= MINIMUM_CHARACTERS && !this.foundProfiles
    },
  },

  mounted() {
    window.requestAnimationFrame(this.$worker.create)
  },

  beforeDestroy() {
    this.$worker.terminate()
  },

  methods: {
    ...mapActions(['searchProfiles']),
    ...mapMutations(['clearFoundProfiles']),

    onQueryChange() {
      this.clearFoundProfiles()
      this.debouncedSearch()
    },

    debouncedSearch: debounce(function () {
      if (this.query.length >= MINIMUM_CHARACTERS) {
        this.searchProfiles(this.query)
      }
    }, DEBOUNCE_WAITING_TIME),
  },
}
</script>

<style lang="scss">
$searchFieldHeight: 87px;

.search-page {
  max-width: 564px;
  max-height: 100vh;
  margin: 0 auto;
  padding: 19px 12px 0;
  background: #fff;
  will-change: content;
  //overflow: auto;

  &__field {
    height: 48px;
    padding: 12px 10px 7px 16px;
    display: flex;
    align-items: center;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.24);

    > input {
      margin: 0 10px;
      padding: 0;
      flex-grow: 1;
      border: none;
      font-size: 24px;
      line-height: 29px;
      border-radius: 2px;
      outline: none;
      min-width: 200px;

      &::placeholder {
        font-size: 18px;
        font-weight: normal;
      }
    }
  }

  &__virtual-list {
    max-height: calc(100vh - #{$searchFieldHeight});
  }

  &__results {
    padding-top: 20px;
  }

  &__no-results {
    padding-bottom: 20px;
    text-align: center;
    color: #888;
  }

  @media (min-width: $breakpointTablet) {
    $marginTop: 54px;
    $marginBottom: 65px;

    margin-top: $marginTop;
    margin-bottom: $marginBottom;
    max-height: calc(100vh - #{$marginTop} - #{$marginBottom});

    &__virtual-list {
      max-height: calc(
        100vh - #{$marginTop} - #{$marginBottom} - #{$searchFieldHeight}
      );
    }
  }
}
</style>
