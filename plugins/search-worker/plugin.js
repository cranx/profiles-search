/* eslint-disable-next-line import/default */
import SearchWorker from './search.worker.js'

export default (context, inject) => {
  let worker = null

  inject('worker', {
    create() {
      worker = new SearchWorker()
      return worker
    },

    get() {
      if (worker) {
        return worker
      }

      return this.create()
    },

    terminate() {
      worker?.terminate()
      worker = null
    },
  })
}
