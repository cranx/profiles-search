import profiles from '~/data/users.json'

const foundProfiles = {
  groupedByFields: {
    name: null,
    title: null,
    email: null,
    address: null,
  },

  total: 0,
}

export const state = () => ({
  suitableProfilesMap: {},
  foundProfiles,
})

export const actions = {
  searchProfiles({ commit }, query) {
    console.time('search')
    const foundProfiles = {
      groupedByFields: {
        name: [],
        title: [],
        email: [],
        address: [],
      },
      total: 0,
    }

    profiles.forEach((user) => {
      if (user.name.includes(query)) {
        foundProfiles.total++
        foundProfiles.groupedByFields.name.push(user)
        return
      }

      if (user.title.includes(query)) {
        foundProfiles.total++
        foundProfiles.groupedByFields.title.push(user)
        return
      }

      if (user.email.includes(query)) {
        foundProfiles.total++
        foundProfiles.groupedByFields.email.push(user)
        return
      }

      if (user.address.includes(query)) {
        foundProfiles.total++
        foundProfiles.groupedByFields.address.push(user)
      }
    })

    commit('setFoundProfiles', foundProfiles)
    console.timeEnd('search')
  },
}

export const getters = {
  getProfileSuitability({ suitableProfilesMap }) {
    return (id) => !!suitableProfilesMap[id]
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
    state.foundProfiles = foundProfiles
  },

  setFoundProfiles(state, payload = null) {
    console.log('setFoundProfiles')
    state.foundProfiles = payload
  },
}
