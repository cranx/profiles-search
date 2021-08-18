<template>
  <div class="search-page">
    <div class="search-page__field">
      <img
        src="~/assets/icons/search.svg"
        alt="search"
        width="24"
        height="24"
      />
      <input
        id="search"
        v-model="query"
        placeholder="Enter at least 2 characters"
        type="text"
        @input="onQueryChange"
      />
    </div>

    <div class="search-page__results">
      <Loader />
    </div>
  </div>
</template>

<script>
import debounce from 'debounce'
import { mapActions, mapState } from 'vuex'

const DEBOUNCE_WAITING_TIME = 200
const MINIMUM_CHARACTERS = 2

export default {
  name: 'SearchPage',

  data() {
    return {
      query: '',
    }
  },

  computed: {
    ...mapState(['foundProfiles']),
  },

  mounted() {
    console.log('loaders', this.$route)
  },

  methods: {
    ...mapActions(['searchProfiles']),

    onQueryChange() {
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
.search-page {
  max-width: 564px;
  max-height: 100vh;
  margin: 0 auto;
  padding: 19px 12px 0;
  background: #fff;
  will-change: auto;

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

      &::placeholder {
        font-size: 18px;
        font-weight: normal;
      }
    }
  }

  &__results {
    padding-top: 20px;
  }

  @media (min-width: $breakpointTablet) {
    $marginTop: 54px;
    $marginBottom: 65px;

    margin-top: $marginTop;
    margin-bottom: $marginBottom;
    max-height: calc(100vh - #{$marginTop} - #{$marginBottom});
  }
}
</style>
