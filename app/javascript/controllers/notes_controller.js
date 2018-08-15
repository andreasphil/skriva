import { Controller } from 'stimulus'
import { default as Polyglot } from 'node-polyglot'
import { default as MediumEditor } from 'medium-editor'

export default class extends Controller {
  static targets = ['note', 'saveButton', 'input', 'submitButton']

  /* Hooks ----------------------------------------------------------------- */

  connect() {
    this.polyglot = new Polyglot({ phrases: window.locales })
    this.editor = new MediumEditor(this.noteTarget, {
      toolbar: {
        buttons: ['bold', 'italic', 'underline', 'orderedlist', 'unorderedlist', 'pre', 'quote']
      },
      paste: {
        forcePlainText: true
      },
      autoLink: true,
      anchorPreview: false
    })
  }

  /* Events ---------------------------------------------------------------- */

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
    // Indicate thet the note was saved successfully
    this.setSaveButtonState('saved')
  }

  onError(e) {
    // Indicate that the saving failed
    this.setSaveButtonState('error')
  }

  /* Helpers --------------------------------------------------------------- */

  setSaveButtonState(state) {
    const allClasses = ['btn-primary', 'disabled', 'loading', 'btn-error']

    const states = {
      unsavedChanges: {
        classes: ['btn-primary'],
        message: this.polyglot.t('notes.edit.save')
      },
      saving: {
        classes: ['btn-primary', 'loading'],
        message: this.polyglot.t('notes.edit.saving')
      },
      saved: {
        classes: ['disabled'],
        message: this.polyglot.t('notes.edit.saved')
      },
      error: {
        classes: ['btn-error'],
        message: this.polyglot.t('notes.edit.saving_error')
       }
    }

    // Reset button state and apply new state classes
    const saveButton = this.saveButtonTarget
    saveButton.classList.remove(...allClasses)
    saveButton.classList.add(...states[state].classes)
    saveButton.innerHTML = states[state].message
  }
}
