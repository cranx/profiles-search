import { MINIMUM_CHARACTERS } from '~/utils/constants'
let profiles = null

self.addEventListener('message', ({ data: { action, payload } }) => {
  if (action === 'data' && payload) {
    profiles = payload
  } else if (
    action === 'search' &&
    profiles &&
    payload?.length >= MINIMUM_CHARACTERS
  ) {
    const query = payload.toLowerCase()
    const foundProfilesIds = []

    profiles.forEach((user, id) => {
      if (user.name.toLowerCase().includes(query)) {
        foundProfilesIds.push(id)
        return
      }

      if (user.title.toLowerCase().includes(query)) {
        foundProfilesIds.push(id)
        return
      }

      if (user.email.toLowerCase().includes(query)) {
        foundProfilesIds.push(id)
        return
      }

      if (user.address.toLowerCase().includes(query)) {
        foundProfilesIds.push(id)
      }
    })

    postMessage({ action: 'results', results: foundProfilesIds })
  }
})
