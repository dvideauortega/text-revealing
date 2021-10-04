class ViewContainer {

    #container = null;
    #views = null;

    #settings = {
        selectors: {
            CONTAINER_SELECTOR: ".view-container",
            VIEW_SELECTOR: ".view[data-view-name]",
            LINK_SELECTOR: "[data-view-link-to]",
            LINK_ATTRIBUTE_NAME: "data-view-link-to"
        }
    }

    #util = {
        getNextViewFromLink: link => {
            const name = link.getAttribute(this.#settings.selectors.LINK_ATTRIBUTE_NAME);
            const selector = `${this.#settings.selectors.VIEW_SELECTOR.slice(0, -1)}='${name}']`;
            return this.#container.querySelector(selector);
        },
    }

    constructor(container) {
        this.#container = container;
        this.#views = this.#container.querySelectorAll(this.#settings.selectors.VIEW_SELECTOR);
        this.#configure();
    }

    #configure() {
        this.#views.forEach(view => {
            this.#setupAnimationStart(view);
            this.#setupAnimationEnd(view);
            this.#setupLinks(view);
        });
    }

    #setupAnimationStart(view) {
        view.addEventListener("animationstart", () => 
            view.classList.contains("active") ? view.classList.add("visible") : null
        );
    }

    #setupAnimationEnd(view) {
        view.addEventListener("animationend", () =>
            !view.classList.contains("active") ? view.classList.remove("visible") : null
        )
    }

    #setupLinks(view) {
        view.querySelectorAll(this.#settings.selectors.LINK_SELECTOR).forEach(link => {
            link.addEventListener("click", () => {
                const nextView = this.#util.getNextViewFromLink(link);
                view.classList.remove("active");
                nextView.classList.add("active");
            })
            
        })
    }

}

new ViewContainer(document.querySelector(".view-container"));