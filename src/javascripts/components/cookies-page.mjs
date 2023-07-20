import { getConsentCookie, setConsentCookie } from './cookie-functions.mjs'

class CookiesPage {
  constructor($module) {
    this.$module = $module
  }

  init() {
    this.$cookiePage = this.$module

    if (!this.$cookiePage) {
      return
    }

    this.$cookieForm = this.$cookiePage.querySelector('.js-cookies-page-form')
    this.$cookieFormFieldsets = this.$cookieForm.querySelectorAll(
      '.js-cookies-page-form-fieldset'
    )
    this.$successNotification = this.$cookiePage.querySelector(
      '.js-cookies-page-success'
    )

    this.$cookieFormFieldsets.forEach(($cookieFormFieldset) => {
      this.showUserPreference($cookieFormFieldset, getConsentCookie())
      $cookieFormFieldset.removeAttribute('hidden')
    })

    // Show submit button
    this.$cookieForm
      .querySelector('.js-cookies-form-button')
      .removeAttribute('hidden')

    this.$cookieForm.addEventListener('submit', (event) =>
      this.savePreferences(event)
    )
  }

  /**
   * @param {SubmitEvent} event - Form submit event
   */
  savePreferences(event) {
    // Stop default form submission behaviour
    event.preventDefault()

    const preferences = {}

    this.$cookieFormFieldsets.forEach(($cookieFormFieldset) => {
      const cookieType = this.getCookieType($cookieFormFieldset)
      const $selectedItem = $cookieFormFieldset.querySelector(
        `input[name=${cookieType}]:checked`
      )

      if ($selectedItem instanceof HTMLInputElement) {
        preferences[cookieType] = $selectedItem.value === 'yes'
      }
    })

    // Save preferences to cookie and show success notification
    setConsentCookie(preferences)
    this.showSuccessNotification()
  }

  /**
   * @param {HTMLFieldSetElement} $cookieFormFieldset - Cookie form fieldset
   * @param {import('./cookie-functions.mjs').ConsentPreferences} preferences - Consent preferences
   */
  showUserPreference($cookieFormFieldset, preferences) {
    const cookieType = this.getCookieType($cookieFormFieldset)
    let preference = false

    if (cookieType && preferences && preferences[cookieType] !== undefined) {
      preference = preferences[cookieType]
    }

    const radioValue = preference ? 'yes' : 'no'

    /** @satisfies {HTMLInputElement} */
    const $radio = $cookieFormFieldset.querySelector(
      `input[name=${cookieType}][value=${radioValue}]`
    )
    $radio.checked = true
  }

  showSuccessNotification() {
    this.$successNotification.removeAttribute('hidden')

    // Set tabindex to -1 to make the element focusable with JavaScript.
    // GOV.UK Frontend will remove the tabindex on blur as the component doesn't
    // need to be focusable after the user has read the text.
    if (!this.$successNotification.getAttribute('tabindex')) {
      this.$successNotification.setAttribute('tabindex', '-1')
    }

    this.$successNotification.focus()

    // scroll to the top of the page
    window.scrollTo(0, 0)
  }

  /**
   * @param {HTMLFieldSetElement} $cookieFormFieldset - Cookie form fieldset
   * @returns {string} Cookie type
   */
  getCookieType($cookieFormFieldset) {
    return $cookieFormFieldset.id
  }
}

export default CookiesPage
