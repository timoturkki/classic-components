class Modal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.isOpen = false;
        this.shadowRoot.innerHTML = `
            <style>
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background-color: rgba(0,0,0,0.7);
                    z-index: 10;
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.3s ease-out;
                }

                :host([open]) .modal-overlay,
                :host([open]) .modal {
                    opacity: 1;
                    pointer-events: all;
                }

                :host([open]) .modal {
                    top: 15vh;
                }

                .modal {
                    position: fixed;
                    top: 10vh;
                    left: 25%;
                    width: 50%;
                    z-index: 100;
                    background: white;
                    padding: 1.7rem;
                    border-radius: 3px;
                    box-shadow: 1px 1px 6px rgba(0,0,0,0.3);
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    opacity: 0;
                    pointer-events: none;
                    transition: all 0.3s ease-out;
                }

                .modal__header {
                    border-bottom : 1px solid #ccc;
                    padding-bottom: 1rem;
                }

                ::slotted(h2) {
                    margin: 0;
                }

                .modal__actions {
                    border-top: 1px solid #ccc;
                    padding: 1rem;
                    display: flex;
                    justify-content: flex-end;
                }

                .modal__button {
                    margin: 0 0.25;
                }
            </style>
            <div class="modal-overlay"></div>
            <div class="modal">
                <header class="modal__header">
                    <slot name="title"></slot>
                </header>
                <section id="modal__contetnt">
                    <slot name="content"></slot>
                </section>
                <section class="modal__actions">
                    <button class="js-cancel-btn modal__button">Cancel</button>
                    <button class="js-confirm-btn modal__button">Okay</button>
                </section>
            </div>
        `
        const slots = this.shadowRoot.querySelectorAll('slot');
        slots[1].addEventListener('slotchange', event => {
            console.dir(slots[1].assignedNodes())
        });

        const cancelButton = this.shadowRoot.querySelector('.js-cancel-btn');
        const confirmButton = this.shadowRoot.querySelector('.js-confirm-btn');
        const overLay = this.shadowRoot.querySelector('.modal-overlay');

        cancelButton.addEventListener('click', this._cancel.bind(this));
        confirmButton.addEventListener('click', this._confirm.bind(this));
        overLay.addEventListener('click', this._cancel.bind(this));
    }

    open() {
        this.setAttribute('open', '');
        this.isOpen = true;
    }

    hide() {
        this.removeAttribute('open');
        this.isOpen = false;
    }

    _cancel() {
        this.hide();
        const cancelEvent = new Event('cancel');
        this.dispatchEvent(cancelEvent);
    }

    _confirm() {
        this.hide();
        const confirmEvent = new Event('confirm');
        this.dispatchEvent(confirmEvent);
    }
}

customElements.define('classic-modal', Modal);