const gallery = document.getElementById("gallery");

const categories = ["nature", "city", "animals"];

// Create 100 Images
for(let i = 1; i <= 100; i++){

    const category = categories[i % 3];

    const item = document.createElement("div");
    item.classList.add("gallery-item", category);

    const img = document.createElement("img");
    img.src = `https://picsum.photos/600/400?random=${i}`;
    img.alt = `Image ${i}`;

    const overlay = document.createElement("div");
    overlay.classList.add("overlay");

    overlay.innerHTML = `
        <h3>Image ${i}</h3>
        <p>Click to View</p>
    `;

    item.appendChild(img);
    item.appendChild(overlay);

    gallery.appendChild(item);
}

/* -------------------------
   LIGHTBOX
-------------------------- */

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let images = document.querySelectorAll(".gallery-item img");
let currentIndex = 0;

// Open Lightbox
images.forEach((img,index)=>{

    img.addEventListener("click",()=>{

        currentIndex = index;

        lightboxImg.src = img.src;

        const counter = document.getElementById("counter");

        if(counter){
            counter.innerText =
            `${currentIndex + 1} / ${images.length}`;
        }

        lightbox.classList.add("show");
    });

});

// Next Button
if(nextBtn){

    nextBtn.addEventListener("click",()=>{

        currentIndex++;

        if(currentIndex >= images.length){
            currentIndex = 0;
        }

        lightboxImg.src = images[currentIndex].src;

        const counter = document.getElementById("counter");

        if(counter){
            counter.innerText =
            `${currentIndex + 1} / ${images.length}`;
        }

    });

}

// Previous Button
if(prevBtn){

    prevBtn.addEventListener("click",()=>{

        currentIndex--;

        if(currentIndex < 0){
            currentIndex = images.length - 1;
        }

        lightboxImg.src = images[currentIndex].src;

        const counter = document.getElementById("counter");

        if(counter){
            counter.innerText =
            `${currentIndex + 1} / ${images.length}`;
        }

    });

}

// Close Button
if(closeBtn){

    closeBtn.addEventListener("click",()=>{

        lightbox.classList.remove("show");

    });

}

// Close when clicking outside image
lightbox.addEventListener("click",(e)=>{

    if(e.target === lightbox){
        lightbox.classList.remove("show");
    }

});

/* -------------------------
   FILTER BUTTONS
-------------------------- */

const buttons = document.querySelectorAll(".filters button");

buttons.forEach(button=>{

    button.addEventListener("click",()=>{

        buttons.forEach(btn=>{
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter = button.dataset.filter;

        const items =
        document.querySelectorAll(".gallery-item");

        items.forEach(item=>{

            if(
                filter === "all" ||
                item.classList.contains(filter)
            ){
                item.style.display = "block";
            }
            else{
                item.style.display = "none";
            }

        });

    });

});

/* -------------------------
   KEYBOARD SUPPORT
-------------------------- */

document.addEventListener("keydown",(e)=>{

    if(!lightbox.classList.contains("show")){
        return;
    }

    if(e.key === "ArrowRight"){
        nextBtn.click();
    }

    if(e.key === "ArrowLeft"){
        prevBtn.click();
    }

    if(e.key === "Escape"){
        lightbox.classList.remove("show");
    }

});
