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
            /*if (!slide.classList.contains("active"))
                console.log(slide);*/
            slide.classList.add("visible");
        }))
    }

    #getSlideFromLink(element) {
        if(element.classList.contains("slide"))
            return element;
        return this.#getSlideFromLink(element.parentElement);
    }
    

}
/*document.querySelectorAll("[slideLink]").forEach(link => {
    link.addEventListener("click", (event) => {
    console.log(event);
    let nextSlideName = event.target.getAttribute("slideLink");
    event.target.classList.remove("active");
    document.querySelector(`.slide[slide='${nextSlideName}']`).classList.add("active");
})});
  */

  /*document.querySelectorAll(".text").forEach(text => text.addEventListener("animationend", (e) => {
    if (!e.target.classList.contains("active"))
      e.target.classList.remove("visible");
  }))
  
  document.querySelectorAll(".text").forEach(text => text.addEventListener("animationstart", (e) => {
    if (e.target.classList.contains("active"))
      e.target.classList.add("visible");
  }))*/

 /* document.querySelectorAll(".slide").forEach(slide => slide.addEventListener("animationend", (e) => {
    
    if (!e.target.classList.contains("active")) {
        e.target.classList.remove("visible");
    }

    console.log(slide.hasAttribute("xvisible"))
    if(slide.hasAttribute("xvisible"))
        .classList.add("active");

  }))
  
  document.querySelectorAll(".slide").forEach(slide => slide.addEventListener("animationstart", (e) => {
    if (e.target.classList.contains("active")) {
        e.target.classList.add("visible");
    }
  }))

  */

new RevealContainer();