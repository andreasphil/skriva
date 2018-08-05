import { Controller } from 'stimulus'

export default class extends Controller {
  static targets = ['passwordField', 'passwordConfirmationField', 'submitButton']

  /* Events ---------------------------------------------------------------- */

  onPasswordInput(e) {
    const passwordField = this.passwordFieldTarget
    const passwordConfirmationField = this.passwordConfirmationFieldTarget
    const submitButton = this.submitButtonTarget

    // Error if password fields don't match
    if(passwordField.value !== passwordConfirmationField.value) {
      this.setPasswordFieldsState('error')
      this.submitButtonTarget.disabled = true
    }
    else {
      // Reset state if password fields are empty
      if (passwordField.value === '')
        this.setPasswordFieldsState('default')

      // Success if password fields match and are not empty
      else
        this.setPasswordFieldsState('success')

      this.submitButtonTarget.disabled = false
    }
  }

  /* Helpers --------------------------------------------------------------- */

  setPasswordFieldsState(state) {
    const allClasses = ['is-error', 'is-success']

    const states = {
      default: undefined,
      error: 'is-error',
      success: 'is-success'
    }

    this.passwordConfirmationFieldTarget.classList.remove(...allClasses)
    if (states[state]) this.passwordConfirmationFieldTarget.classList.add(states[state])
  }
}
