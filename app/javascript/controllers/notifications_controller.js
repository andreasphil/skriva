import { Controller } from 'stimulus'

export default class extends Controller {
  close (event) {
    event.srcElement.remove()
  }
}
