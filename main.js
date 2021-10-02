document.querySelector("button").addEventListener("click", () => {
    document.querySelectorAll(".slide").forEach(slide => {
        slide.classList.toggle("active");
    });
  })
  
  document.querySelectorAll(".text").forEach(text => text.addEventListener("animationend", (e) => {
    if (!e.target.classList.contains("active"))
      e.target.classList.remove("visible");
  }))
  
  document.querySelectorAll(".text").forEach(text => text.addEventListener("animationstart", (e) => {
    if (e.target.classList.contains("active"))
      e.target.classList.add("visible");
  }))