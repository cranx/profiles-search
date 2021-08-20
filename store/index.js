import Vue from 'vue'
let profilesMap = null

export const state = () => {
  return {
    suitableProfilesMap: {},
    foundProfilesIds: null,
  }
}

export const actions = {
  async fetchProfiles() {
    if (profilesMap) {
      return
    }

    try {
      const { data } = await this.$axios.get('/data/users.json')

      profilesMap = data.reduce((result, profile, id) => {
        profile.id = id
        result[id] = profile
        return result
      }, {})

      const worker = this.$worker.get()
      worker.postMessage({ action: 'data', payload: data })

      return true
    } catch (e) {
      // handle error
    }
  },

  searchProfiles({ commit }, query) {
    if (!profilesMap) {
      return
    }
    // const start = Date.now()
    const worker = this.$worker.get()

    commit('clearFoundProfiles')

    worker.addEventListener(
      'message',
      ({ data }) => {
        if (data.action === 'results') {
          commit('setFoundProfilesIds', data.results)
          // console.log('search', Date.now() - start, query)
        }
      },
      { once: true }
    )
    worker.postMessage({ action: 'search', payload: query })
  },
}

export const getters = {
  getProfileSuitability({ suitableProfilesMap }) {
    return (id) => !!suitableProfilesMap[id]
  },

  foundProfiles({ foundProfilesIds }) {
    return foundProfilesIds?.map((id) => {
      return profilesMap[id]
    })
  },
}

export const mutations = {
  toggleProfileSuitability(state, id) {
    if (!state.suitableProfilesMap[id]) {
      Vue.set(state.suitableProfilesMap, id, true)
    } else {
      Vue.set(state.suitableProfilesMap, id, null)
      delete state.suitableProfilesMap[id]
    }
  },

  clearFoundProfiles(state) {
    state.foundProfilesIds = null
  },

  setFoundProfilesIds(state, payload = null) {
    state.foundProfilesIds = payload
  },
}
