import ClipboardJS from 'clipboard'

class Copy {
  /**
   * @param {Element} $module - HTML element
   */
  constructor($module) {
    if (
      !($module instanceof HTMLElement) ||
      !document.body.classList.contains('govuk-frontend-supported')
    ) {
      return this
    }

    this.$module = $module

    this.$button = document.createElement('button')
    this.$button.className = 'app-copy-button'
    this.$button.textContent = 'Copy code'

    this.$status = document.createElement('span')
    this.$status.className = 'govuk-visually-hidden'
    this.$status.setAttribute('aria-live', 'assertive')

    this.$module.insertAdjacentElement('beforebegin', this.$status)
    this.$module.insertAdjacentElement('beforebegin', this.$button)
    this.copyAction()
  }

  copyAction() {
    // Copy to clipboard
    try {
      new ClipboardJS(this.$button, {
        target: function (trigger) {
          return trigger.nextElementSibling
        }
      }).on(
        'success',
        function (e) {
          this.$button.textContent = this.$status.textContent = 'Code copied'
          e.clearSelection()
          setTimeout(
            function () {
              this.$button.textContent = 'Copy code'
              this.$status.textContent = ''
            }.bind(this),
            5000
          )
        }.bind(this)
      )
    } catch (err) {
      if (err) {
        console.log(err.message)
      }
    }
  }
}

export default Copy
