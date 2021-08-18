import profiles from '~/data/users.json'
import { MINIMUM_CHARACTERS } from '~/utils/constants'

self.addEventListener('message', ({ data: { action, query } }) => {
  query = query.toLowerCase()

  if (action === 'search' && query?.length >= MINIMUM_CHARACTERS) {
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
