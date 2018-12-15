import { Controller } from 'stimulus'

export default class extends Controller {
  static get targets () {
    return ['passwordField', 'passwordConfirmationField', 'submitButton']
  }

  onPasswordInput (e) {
    const passwordField = this.passwordFieldTarget
    const passwordConfirmationField = this.passwordConfirmationFieldTarget
    const submitButton = this.submitButtonTarget

    // Error if password fields don't match
    if (passwordField.value !== passwordConfirmationField.value) {
      this.setPasswordFieldsState('error')
      submitButton.disabled = true
    } else {
      if (passwordField.value === '') {
        // Reset state if password fields are empty
        this.setPasswordFieldsState('default')
      } else {
        // Success if password fields match and are not empty
        this.setPasswordFieldsState('success')
      }

      submitButton.disabled = false
    }
  }

  setPasswordFieldsState (state) {
    const allClasses = ['form__input--error', 'form__input--success']

    const states = {
      default: undefined,
      error: 'form__input--error',
      success: 'form__input--success'
    }

    this.passwordConfirmationFieldTarget.classList.remove(...allClasses)
    if (states[state]) this.passwordConfirmationFieldTarget.classList.add(states[state])
  }
}
