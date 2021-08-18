import profiles from '~/data/users.json'

let profilesMap = {}
let isPrevSearchingCompleted = true

export const state = () => {
  if (process.client) {
    // console.time('mapping')
    profilesMap = profiles.reduce((result, profile, id) => {
      profile.id = id
      result[id] = profile
      return result
    }, {})
    // console.timeEnd('mapping')
  }

  return {
    suitableProfilesMap: {},
    foundProfilesIds: null,
  }
}

export const actions = {
  searchProfiles({ commit }, query) {
    const ts = Date.now()

    commit('clearFoundProfiles')

    if (!isPrevSearchingCompleted) {
      this.$worker.terminate()
    }

    isPrevSearchingCompleted = false

    const worker = this.$worker.get()
    worker.addEventListener(
      'message',
      ({ data }) => {
        if (data.action === 'results') {
          isPrevSearchingCompleted = true
          commit('setFoundProfilesIds', data.results)
          console.log('search', Date.now() - ts, query)
        }
      },
      { once: true }
    )
    worker.postMessage({ action: 'search', query })
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
  toggleProfileSuitability({ suitableProfilesMap }, { id }) {
    if (!suitableProfilesMap[id]) {
      suitableProfilesMap[id] = true
    } else {
      delete suitableProfilesMap[id]
    }
  },

  clearFoundProfiles(state) {
    state.foundProfilesIds = null
  },

  setFoundProfilesIds(state, payload = null) {
    state.foundProfilesIds = payload
  },
}
