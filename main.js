class RevealContainer {

    constructor() {
        this.#detectLinks();
        this.#attachAnimationListeners();
    }

    #detectLinks() {
        document.querySelectorAll("[slide-link]").forEach(link => {
            link.addEventListener("click", this.#linkEventListener.bind(this));
        })
    }

    #linkEventListener(event) {
        let nextSlideName = event.target.getAttribute("slide-link");
        let nextSlideElem = document.querySelector(`.slide[slide='${nextSlideName}']`);
        let currentSlide = this.#getSlideFromLink(event.target);
        currentSlide.classList.remove("active");
        nextSlideElem.classList.add("active");
    }

    #attachAnimationListeners() {
        document.querySelectorAll(".slide[slide]").forEach(slide => slide.addEventListener("animationend", event => {
            let slide = this.#getSlideFromLink(event.target);
            if (!slide.classList.contains("active"))
                slide.classList.remove("visible");
        }))

        document.querySelectorAll(".slide[slide]").forEach(slide => slide.addEventListener("animationstart", event => {
            let slide = this.#getSlideFromLink(event.target);
            if (slide.classList.contains("active"))
                slide.classList.add("visible");
        }))
    }

    #getSlideFromLink(element) {
        if(element.classList.contains("slide"))
            return element;
        return this.#getSlideFromLink(element.parentElement);
    }
    

}

new RevealContainer();