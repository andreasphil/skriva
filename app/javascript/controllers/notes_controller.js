import { Controller } from 'stimulus'

export default class extends Controller
{
  static targets = ['note', 'input', 'submit']

  save()
  {
    const noteContent = this.noteTarget.innerHTML
    const shadowNoteInput = this.inputTarget
    const shadowSubmit = this.submitTarget

    // Copy content from contenteditable field to form and submit
    shadowNoteInput.value = noteContent
    shadowSubmit.click()
  }
}
