import { Controller } from 'stimulus'
import { default as Polyglot } from 'node-polyglot'
import { default as MediumEditor } from 'medium-editor'

export default class extends Controller {
  static get targets () {
    return ['note', 'input', 'submitButton', 'statusLabel']
  }

  initialize () {
    this.polyglot = new Polyglot({ phrases: window.locales })

    // Statuses to be displayed to the user
    this.saveStatues = {
      saved: {
        message: this.polyglot.t('notes.edit.saved')
      },
      saving: {
        message: this.polyglot.t('notes.edit.saving')
      },
      savingError: {
        message: this.polyglot.t('notes.edit.saving_error'),
        classes: ['text--error']
      },
      unsavedChanges: {
        message: this.polyglot.t('notes.edit.unsaved_changes')
      }
    }

    // Initialize editor
    this.editor = new MediumEditor(this.noteTarget, {
      toolbar: {
        buttons: ['h1', 'h2', 'bold', 'italic', 'underline', 'orderedlist',
          'unorderedlist', 'pre', 'quote']
      },
      paste: {
        forcePlainText: true
      },
      autoLink: true,
      anchorPreview: false
    })
    this.noteTarget.focus()
  }

  connect () {
    this.isDirty = false
    this.isSaving = false
    this.scheduleRegularSave()
  }

  disconnect () {
    this.save()
    this.clearSchedule()
  }

  onChanged (e) {
    this.isDirty = true
    this.updateStatusLabel(this.saveStatues.unsavedChanges)
    this.scheduleSaveAfterInput()
  }

  onSend (e) {
    this.isSaving = true
    this.updateStatusLabel(this.saveStatues.saving)
  }

  onSuccess (e) {
    this.isSaving = false
    this.isDirty = false
    this.updateStatusLabel(this.saveStatues.saved)
  }

  onError (e) {
    this.isSaving = false
    this.isDirty = true
    this.updateStatusLabel(this.saveStatues.savingError)
  }

  scheduleSaveAfterInput () {
    const debouncePeriod = 500
    clearTimeout(this.inputSaveTimer)

    this.inputSaveTimer = setInterval(() => {
      this.save()
      clearTimeout(this.inputSaveTimer)
    }, debouncePeriod)
  }

  scheduleRegularSave () {
    const regularSavePeriod = 5000
    clearInterval(this.regularSaveTimer)

    this.regularSaveTimer = setInterval(() => {
      this.save()
    }, regularSavePeriod)
  }

  clearSchedule () {
    clearInterval(this.inputSaveTimer)
    clearInterval(this.regularSaveTimer)
  }

  save () {
    // Cancel if the note hasn't changed or we're still waiting for another request to complete
    if (!this.isDirty || this.isSaving) {
      return
    }

    const noteContent = this.noteTarget.innerHTML
    const shadowNoteInput = this.inputTarget
    const shadowSubmitButton = this.submitButtonTarget

    // Copy content from contenteditable field to form and submit
    shadowNoteInput.value = noteContent
    shadowSubmitButton.click()
  }

  updateStatusLabel (status) {
    if (!status) {
      return
    }

    const statusLabel = this.statusLabelTarget

    statusLabel.innerHTML = status.message
  }
}
