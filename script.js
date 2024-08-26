var main = document.querySelector("#main");
var cursor = document.querySelector("#cursor");
var showReel = document.querySelector("#screenshot");
var menu = document.querySelector("#menu");
var action = document.querySelector("#summary-action button,#DandD-heading button");
var featuredFilled = document.querySelector("#featured-filled");
var previewMediaLeft = document.querySelectorAll("#featured-media-container1,#featured-media-container2,#featured-media-container3,#featured-media-container4,#featured-media-container5,#media-container1,#media-container2,#media-container3,#media-container4,#media-container5");
var philosophy = document.querySelector("#philosophy");
var design = document.querySelector("#DandD");
var wrapper = document.querySelector("#wrapper");

const scroll = new LocomotiveScroll({
  el: document.querySelector('.home'),
  smooth: true
});

function showCursor() {
  function updateCursorPosition(e) {
    gsap.to(cursor, {
      x: e.x,
      y: e.y,
      duration: 0.5,
      ease: "back.out(1.7)",
    });
  }
  main.addEventListener("mousemove", updateCursorPosition);
  main.addEventListener("mouseenter", () => {
    gsap.to(cursor, {
      scale: 0.8,
      opacity: 1,
      duration: 0.3,
    });
  });
  main.addEventListener("mouseleave", () => {
    gsap.to(cursor, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
    });
  });
  window.addEventListener("scroll", () => {
    const rect = showReel.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      applyShowReelCursorStyle();
    } else {
      resetCursorStyle();
    }
  });

}
showCursor();

function showReelAnimation() {
  function applyShowReelCursorStyle() {
    cursor.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="5" height="5" color="#000000" fill="none">
    <path d="M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
    </svg>`;
    cursor.style.backgroundColor = "white";
    gsap.to(cursor, {
      scale: 6,
      duration: 0.5,
      ease: "power3.out",
    });
  }

  function resetCursorStyle() {
    cursor.innerHTML = "";
    cursor.style.backgroundColor = "black";
    gsap.to(cursor, {
      scale: 0.8,
      duration: 0.5,
      ease: "power3.out",
    });
  }
  showReel.addEventListener("mouseenter", applyShowReelCursorStyle);
  showReel.addEventListener("mouseleave", resetCursorStyle);
}

showReelAnimation();

function featuredSection() {
  featuredFilled.addEventListener("mouseenter", function () {
    gsap.to(cursor, {
      duration: 0,
      backgroundColor: "white",
    });
  });
  featuredFilled.addEventListener("mouseleave", function () {
    gsap.to(cursor, {
      backgroundColor: "black",
    });
  });

}
featuredSection();

function previewMediaAnimation() {
  previewMediaLeft.forEach((media) => {
    media.addEventListener("mouseenter", function () {
      var img = this.querySelector("img");
      var video = this.querySelector("video");
      img.style.opacity = "0";
      video.style.opacity = "1";
      video.play();
      cursor.innerHTML = "Explore";
      gsap.to(cursor, {
        scale: 4,
      });
    });
    media.addEventListener("mouseleave", function () {
      var img = this.querySelector("img");
      var video = this.querySelector("video");
      img.style.opacity = "1";
      video.style.opacity = "0";
      video.pause();
      video.currentTime = 0;
      cursor.innerHTML = "";
      gsap.to(cursor, {
        scale: 1,
      });
    });
  });
}
previewMediaAnimation();

function designAndDevelopment() {
  design.addEventListener("mouseenter", function () {
    gsap.to(cursor, {
      backgroundColor: "white",
    });
  });
  design.addEventListener("mouseleave", function () {
    
    gsap.to(cursor, {
      backgroundColor: "black",
    });
  });
}
designAndDevelopment();

function wrapperAnimation() {
  wrapper.addEventListener("mouseenter", function () {
    cursor.innerHTML = "Drag";
    gsap.to(cursor, {
      scale: 4,
    });
  });
  
  wrapper.addEventListener("mouseleave", function () {
    cursor.innerHTML = "";
    gsap.to(cursor, {
      scale: 1,
    });
  });
}
wrapperAnimation();

function designAndDevelopmentDrag() {
  const slider = document.querySelector("#wrapper");
  let isDown = false;
  let startX;
  let scrollLeft;
  
  // Custom cursor behavior on mouse enter and leave for desktop
  slider.addEventListener("mouseenter", () => {
      cursor.innerHTML = "Drag";
      cursor.style.color = "black";
      gsap.to(cursor, { scale: 6 });
  });
  
  slider.addEventListener("mouseleave", () => {
      if (isDown) {
          isDown = false;
      }
      cursor.innerHTML = "";
      gsap.to(cursor, { scale: 1 });
  });
  
  // Drag functionality for desktop (mouse)
  slider.addEventListener("mousedown", (e) => {
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      cursor.innerHTML = "Drag";
      cursor.style.color = "black";
      gsap.to(cursor, { scale: 4 });
  });
  
  slider.addEventListener("mouseup", () => {
      isDown = false;
      cursor.innerHTML = "Drag";
      gsap.to(cursor, { scale: 4 });
  });
  
  const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2; 
      requestAnimationFrame(() => {
          slider.scrollLeft = scrollLeft - walk;
      }); 
      cursor.style.transform = `translate(${e.pageX}px, ${e.pageY}px)`;
  };
  slider.addEventListener("mousemove", handleMouseMove);
  
  // Move the custom cursor with the mouse when not dragging
  document.addEventListener("mousemove", (e) => {
      if (!isDown) {
          cursor.style.transform = `translate(${e.pageX}px, ${e.pageY}px)`;
      }
  });
}
designAndDevelopmentDrag();

function newDaydrag(){
  const slider = document.querySelector("#image-slider");
let isDown = false;
let startX;
let scrollLeft;

// Custom cursor behavior on mouse enter and leave for desktop
slider.addEventListener("mouseenter", () => {
    cursor.innerHTML = "Drag";
    cursor.style.color = "white";
    gsap.to(cursor, { scale: 6 });
});

slider.addEventListener("mouseleave", () => {
    if (isDown) {
        isDown = false;
    }
    cursor.innerHTML = "";
    gsap.to(cursor, { scale: 1 });
});

// Drag functionality for desktop (mouse)
slider.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    cursor.innerHTML = "Drag";
    cursor.style.color = "white";
    gsap.to(cursor, { scale: 4 });
});

slider.addEventListener("mouseup", () => {
    isDown = false;
    cursor.innerHTML = "Drag";
    gsap.to(cursor, { scale: 4 });
});

const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; 
    requestAnimationFrame(() => {
        slider.scrollLeft = scrollLeft - walk;
    }); 
    cursor.style.transform = `translate(${e.pageX}px, ${e.pageY}px)`;
};
slider.addEventListener("mousemove", handleMouseMove);

// Move the custom cursor with the mouse when not dragging
document.addEventListener("mousemove", (e) => {
    if (!isDown) {
        cursor.style.transform = `translate(${e.pageX}px, ${e.pageY}px)`;
    }
});
slider.addEventListener("touchstart", (e) => {
  isDown = true;
  startX = e.touches[0].pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener("touchend", () => {
  isDown = false;
});

slider.addEventListener("touchmove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.touches[0].pageX - slider.offsetLeft;
  const walk = (x - startX) * 2;
  requestAnimationFrame(() => {
      slider.scrollLeft = scrollLeft - walk;
  });
});

}
newDaydrag();

function carousel() {
  let startY;

  function triggerAnimation(direction) {
    if (direction === "down") {
      gsap.to(".follow-us, .marque", {
        transform: 'translateX(-200%)',
        duration: 40,
        repeat: -1,
        ease: "none"
      });
    } else {
      gsap.to(".follow-us, .marque", {
        transform: 'translateX(0%)',
        duration: 40,
        repeat: -1,
        ease: "none"
      });
    }
  }

  // Handle wheel event for desktop
  window.addEventListener("wheel", function(dets) {
    if (dets.deltaY > 0) {
      triggerAnimation("down");
    } else {
      triggerAnimation("up");
    }
  });

  // Handle touch events for mobile
  window.addEventListener("touchstart", function(e) {
    startY = e.touches[0].clientY;
  }, false);

  window.addEventListener("touchmove", function(e) {
    const currentY = e.touches[0].clientY;
    const deltaY = startY - currentY;

    if (deltaY > 0) {
      triggerAnimation("down");
    } else if (deltaY < 0) {
      triggerAnimation("up");
    }
  }, false);

  // Rotate images continuously
  gsap.fromTo(".image-container img", 
    { rotation: 0 },
    {
      rotation: 360,
      transformOrigin: "50% 50%",
      repeat: -1,
      ease: "none",
      duration: 5
    }
  );
}

carousel();


function socialHover(){
  var boxes = document.querySelectorAll(".box")
  boxes.forEach(function(elem){
    elem.addEventListener("mouseenter",function(){
        var att = elem.getAttribute("data-image")
        cursor.style.width = "470px"
        cursor.style.height = "370px"
        cursor.style.borderRadius = "0"
        cursor.style.backgroundImage = `url(${att})`
    })
    elem.addEventListener("mouseleave",function(){
        elem.style.backgroundColor = "transparent"
        cursor.style.width = "20px"
        cursor.style.height = "20px"
        cursor.style.borderRadius = "50%"
        cursor.style.backgroundImage = `none`
    })
})
};
socialHover();



document.addEventListener("DOMContentLoaded", function() {
  const counter3 = document.querySelector('.counter-3');
  for (let i = 0; i <= 2; i++) {
    for(let j=0; j<=10;j++){
      const div = document.createElement('div');
    div.className = 'num';
    div.textContent = j;
    counter3.appendChild(div);
    }
    
  }

  const finalDiv = document.createElement('div');
  finalDiv.className = 'num';
  finalDiv.textContent = "0";
  counter3.appendChild(finalDiv);

  function animate(counter, duration, delay = 0) {
    const numHeight = counter.querySelector('.num').clientHeight; 

    const totalDistance = (counter.querySelectorAll('.num').length - 1) * numHeight;

    gsap.to(counter, {
      y: -totalDistance,
      duration: duration,
      delay: delay,
      ease: 'power2.inOut'
    });
  }

  animate(counter3, 5);
  animate(document.querySelector('.counter-2'), 6);
  animate(document.querySelector('.counter-1'), 2, 4);


  gsap.to(".digit", {
    top: "-150px",
    stagger: { amount: 0.25 },
    delay: 6,
    duration: 1,
    ease: "power4.inOut",
  })
  gsap.from(".loader-1",{
    width: 0,
    duration: 6,
    ease: "power2.inOut",
  })
  gsap.from(".loader-2", {
  width: 0,
  delay: 1.9,
  duration: 2,
  ease: "power2.inOut",
});
gsap.to(".loader", {
 background: "none",
 delay: 6,
  duration: 0.1,
});
gsap.to(".loader-1", {
  rotate:90,
  y: -50,
  delay: 6,
  duration: 0.5
});
gsap.to(".loader-2", {
  x: -75,
  y: 75,
  duration: 0.5,
},"<");

gsap.to(".loader", {
  scale: 40,
  duration: 1,
  delay: 7,
  ease: "power2.inOut",
});

gsap.to(".loader", {
  rotate: 45,
  y:500,
  x:2000,
  duration: 1,
  delay: 7,
  ease: "power2.inOut"
});
gsap.to(".loading-screen", {
  opacity: 0,
  duration: 0.5,
  delay: 7.5,
  ease: "power1.inOut",
  onComplete: function() {
    document.querySelector(".loading-screen").style.display = "none";
  }

});

});

