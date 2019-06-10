class Tooltip extends HTMLElement {
    constructor() {
        super();
        this._tooltipVisible = false; 
        this._tooltipText = '';
        this._toolTipIcon;
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .tooltip-container {
                    background-color: var(--color-primary);
                    color: white;
                    position: absolute;
                    z-index: 2;
                    left: 50%;
                    transform: translateX(-50%);
                    padding: 0.5rem;
                    border-radius: 3px;
                    box-shadow: 1px 1px 6px rgba(0,0,0,0.3);
                    font-weight: normal;
                }

                .tooltip-icon {
                    position: relative;
                    background-color: tomato;
                    border-radius: 50%;
                    padding: 0.2rem;
                }

                .highlight {
                    background-color: red;
                }

                ::slotted(.highlight) {
                    border-bottom: 1px solid red;
                }

                :host {
                    background-color: #f3efef;
                    margin-right: 0.2rem;
                }
                
                :host(.tooltip-important) {
                    background: var(--color-important, #ccc);
                }

                :host-context(p) {
                    font-weight: bold;
                }
            </style>
            <slot></slot>
            <span class="tooltip-icon"> (?)</span>
        `;
    }

    connectedCallback() {
        if (this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text');
        }

        this._toolTipIcon = this.shadowRoot.querySelector('.tooltip-icon');
        this._toolTipIcon.addEventListener('mouseenter', this._showTooltip.bind(this))
        this._toolTipIcon.addEventListener('mouseleave', this._hideToolTip.bind(this))
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;

        if (name === 'text') {
            this._tooltipText = newValue;
        }
    }

    static get observedAttributes() {
        return ['text'];
    }

    disconnectedCallback() {
        this._toolTipIcon.removeEventListener('mouseenter', this._showTooltip);
        this._toolTipIcon.removeEventListener('mouseleave', this._hideToolTip);
    }

    _render() {
        let tooltipContainer = this.shadowRoot.querySelector('.tooltip-container');
        if (this._tooltipVisible) {
            tooltipContainer = document.createElement('div');
            tooltipContainer.classList.add('tooltip-container')
            tooltipContainer.textContent = this._tooltipText;
            this._toolTipIcon.appendChild(tooltipContainer);
        } else if (tooltipContainer) {
            this._toolTipIcon.removeChild(tooltipContainer);
        }
    }

    _showTooltip() {
        this._tooltipVisible = true;
        this._render();
    }

    _hideToolTip() {
        this._tooltipVisible = false;
        this._render();
    }
}

customElements.define('classic-tooltip', Tooltip);