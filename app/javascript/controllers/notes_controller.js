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
    this.setSaveButtonState('saved')
  }

  onError(e) {
    // Indicate that the saving failed
    this.setSaveButtonState('error')
  }

  setSaveButtonState(state) {
    const allClasses = ['btn-primary', 'disabled', 'loading', 'btn-error']

    // TODO: i18n -> Use strings from Rails
    const states = {
      unsavedChanges: {
        classes: ['btn-primary'],
        message: 'Save'
      },
      saving: {
        classes: ['btn-primary', 'loading'],
        message: 'Saving'
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
