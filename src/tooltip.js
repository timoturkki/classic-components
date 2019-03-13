class Tooltip extends HTMLElement {
    constructor() {
        super();
        this._tooltipContainer;
        this._tooltipText = '';
        this._toolTipIcon;
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .tooltip-container {
                    background-color: black;
                    color: white;
                    position: absolute;
                    z-index: 2;
                    left: 50%;
                    transform: translateX(-50%);
                }
                .tooltip-icon {
                    position: relative;
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

    _showTooltip() {
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.classList.add('tooltip-container')
        this._tooltipContainer.textContent = this._tooltipText;
        this._toolTipIcon.appendChild(this._tooltipContainer);
    }

    _hideToolTip() {
        this._toolTipIcon.removeChild(this._tooltipContainer)
    }
}

customElements.define('classic-tooltip', Tooltip);