class View {

    #domElement = null;
    #isActive = false;
    #activationAnimations = [];
    #deactivationAnimations = [];

    constructor(domElement, activeByDefault = false, ...animations) {
        this.#domElement = domElement;
        this.#configureAnimations();
        if (activeByDefault) this.activate();
    }

    #configureAnimations() {
        this.#domElement.querySelectorAll(".transition-wrapper").forEach(wrapper => {
            const activationKeyframeDefinition = [ { transform: "translateX(-100%)" }, { transform: "translateX(0%)" } ];
            const activationKeyframeOptions = { duration: 500, iterations: 1, fill: "forwards", delay: 100 };
            const activationKeyframeEffect = new KeyframeEffect(wrapper, activationKeyframeDefinition, activationKeyframeOptions);
            const deactivationKeyframeDefinition = [ { transform: "translateX(0%)" }, { transform: "translateX(100%)" } ];
            const deactivationKeyframeOptions = { duration: 500, iterations: 1, fill: "forwards", delay: 100 };
            const deactivationKeyframeEffect = new KeyframeEffect(wrapper, deactivationKeyframeDefinition, deactivationKeyframeOptions);
            const activationAnimation = new Animation(activationKeyframeEffect);
            const deactivationAnimation = new Animation(deactivationKeyframeEffect);
            activationAnimation.onfinish = () => console.log("Activation animation finished");
            //deactivationAnimation.onfinish = () => console.log("Deactivation animation finished");
            deactivationAnimation.onfinish = () => this.#domElement.classList.remove("visible");
            activationAnimation.persist();
            this.#activationAnimations.push(activationAnimation);
            this.#deactivationAnimations.push(deactivationAnimation);
        })
    }

    activate() {
        this.#isActive = true;
        this.#deactivationAnimations.forEach(animation => animation.cancel());
        this.#domElement.classList.add("visible");
        this.#activationAnimations.forEach(animation => animation.play());
    }

    deactivate() {
        this.#isActive = false;
        this.#activationAnimations.forEach(animation => animation.cancel());
        this.#deactivationAnimations.forEach(animation => animation.play());
    }

    get isActive() {
        return this.#isActive;
    }

}

const domElement = document.querySelector(".view[data-view-name='one']");
const view = new View(domElement, true);
view.activate();
document.querySelector(".testbtn").addEventListener("click", () => {
    console.log(view.isActive);
    if (view.isActive)
        view.deactivate();
    else
        view.activate();
})