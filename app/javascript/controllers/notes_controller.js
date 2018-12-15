import { Controller } from 'stimulus'
import { default as Polyglot } from 'node-polyglot'
import { default as MediumEditor } from 'medium-editor'

export default class extends Controller {
  static get targets () {
    return ['note', 'input', 'submitButton']
  }

  initialize () {
    this.polyglot = new Polyglot({ phrases: window.locales })
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
    this.scheduleSaveAfterInput()
  }

  onSend (e) {
    this.isSaving = true
  }

  onSuccess (e) {
    this.isSaving = false
    this.isDirty = false
  }

  onError (e) {
    this.isSaving = false
    this.isDirty = true
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
}
