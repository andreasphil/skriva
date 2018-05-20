import { Controller } from 'stimulus'

export default class extends Controller {
  static targets = ['note', 'saveButton', 'input', 'submitButton']

  save() {
    const noteContent = this.noteTarget.innerHTML
    const shadowNoteInput = this.inputTarget
    const shadowSubmitButton = this.submitButtonTarget

    // Copy content from contenteditable field to form and submit
    shadowNoteInput.value = noteContent
    shadowSubmitButton.click()
  }

  onNoteInput(e) {
    // Activate the button to save the note when it has changed
    this.setSaveButtonState('unsavedChanges')
  }

  onSend(e) {
    // Indicate that the note is being saved
    this.setSaveButtonState('saving')
  }

  onSuccess(e) {
    // Indicate that the note was successfully saved
    this.setSaveButtonState('success')

    // Go back to default state
    setTimeout(() =>
    {
      this.setSaveButtonState('saved')
    }, 1000)
  }

  onError(e) {
    // Indicate that the saving failed
    this.setSaveButtonState('error')
  }

  setSaveButtonState(state) {
    const allClasses = ['disabled', 'loading', 'btn-success', 'btn-error']

    // TODO: i18n -> Use strings from Rails
    const states = {
      unsavedChanges: {
        classes: ['test'],
        message: 'Save'
      },
      saving: {
        classes: ['loading'],
        message: 'Saving ...'
      },
      success: {
        classes: ['disabled', 'btn-success'],
        message: 'Saved'
      },
      saved: {
        classes: ['disabled'],
        message: 'Saved'
      },
      error: {
        classes: ['btn-error'],
        message: 'Try again'
       }
    }

    const saveButton = this.saveButtonTarget
    saveButton.classList.remove(...allClasses)
    saveButton.classList.add(...states[state].classes)
    saveButton.innerHTML = states[state].message
  }
}
