export class Scrollbar {
    static iniitialize(selector) {
        const container = document.querySelector(selector)
        if (!container) {
            console.error(`Cannot find element ${container}`)
            return
        }

        Object.defineProperty(container, 'data-scrollbar', { value: new Scrollbar(container), configurable: true });
    }

    constructor(contaier) {
        this.target = contaier;
        this.content = contaier.firstElementChild;

        this.bar = document.createElement('div')
        this.bar.className = 'scrollbar-scroller'

        this.barContainer = document.createElement('div')
        this.barContainer.className = 'scrollbar-scroller-wrapper'
        this.barContainer.appendChild(this.bar)

        this.mB = this.moveBar.bind(this);

        this.wrapper = document.createElement('div');
        this.wrapper.setAttribute('class', 'scrollbar-wrapper');

        this.el = document.createElement('div');
        this.el.setAttribute('class', 'scrollbar-content');

        this.wrapper.appendChild(this.el);

        while (this.target.firstChild) {
            this.el.appendChild(this.target.firstChild);
        }
        this.target.appendChild(this.wrapper);

        this.target.appendChild(this.barContainer);

        this.initDrag(this.bar, this);
        this.moveBar();

        window.addEventListener('resize', this.mB);
        this.el.addEventListener('scroll', this.mB);
        this.el.addEventListener('mouseenter', this.mB);

        this.target.classList.add('scrollbar-container');

        var css = window.getComputedStyle(contaier);
        if (css['height'] === '0px' && css['max-height'] !== '0px') {
            container.style.height = css['max-height'];
        }
    }

    initDrag(el, context) {
        const raf = window.requestAnimationFrame || window.setImmediate || ((c) => setTimeout(c, 0));
        let lastPageY;

        el.addEventListener('mousedown', function (e) {
            lastPageY = e.pageY;
            el.classList.add('scrollbar-grabbed');
            document.body.classList.add('scrollbar-grabbed');

            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', stop);

            return false;
        });

        const drag = (e) => {
            var delta = e.pageY - lastPageY;
            lastPageY = e.pageY;

            raf(() => {
                context.el.scrollTop += delta / context.scrollRatio;
            });
        }

        const stop = () => {
            el.classList.remove('scrollbar-grabbed');
            document.body.classList.remove('scrollbar-grabbed');
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', stop);
        }
    }

    moveBar(e) {
        const raf = window.requestAnimationFrame || window.setImmediate || ((c) => setTimeout(c, 0));
        var totalHeight = this.el.scrollHeight,
            ownHeight = this.el.clientHeight

        this.scrollRatio = ownHeight / totalHeight;

        var right = (this.target.clientWidth - this.bar.clientWidth - 4) * -1;

        raf(() => {
            if (this.scrollRatio >= 1) {
                this.bar.classList.add('scrollbar--hidden')
                this.barContainer.classList.add('scrollbar--hidden')
            } else {
                this.bar.classList.remove('scrollbar--hidden')
                this.barContainer.classList.remove('scrollbar--hidden')
                this.barContainer.style.cssText = `height: 100%; right: ${right}px;`
                this.bar.style.cssText = `height:${Math.max(this.scrollRatio * 100, 10)}%; top:${(this.el.scrollTop / totalHeight) * 100}%;`;
            }
        });
    }
}