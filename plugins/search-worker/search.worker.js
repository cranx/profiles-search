import profiles from '~/data/users.json'
import { MINIMUM_CHARACTERS } from '~/utils/constants'

self.addEventListener('message', (event) => {
  const { action, query } = event.data

  if (action === 'search' && query?.length >= MINIMUM_CHARACTERS) {
    const foundProfilesIds = []

    profiles.forEach((user, id) => {
      if (user.name.includes(query)) {
        foundProfilesIds.push(id)
        return
      }

      if (user.title.includes(query)) {
        foundProfilesIds.push(id)
        return
      }

      if (user.email.includes(query)) {
        foundProfilesIds.push(id)
        return
      }

      if (user.address.includes(query)) {
        foundProfilesIds.push(id)
      }
    })

    postMessage({ action: 'results', results: foundProfilesIds })
  }
})
