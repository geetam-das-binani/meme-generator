const draggableImages = document.querySelectorAll(".draggable");
const dropZone = document.querySelectorAll(".drop-zone");
const inputFile = document.getElementById("imageUpload");
const imageContainer = document.getElementById("imagesContainer");
const addCategory = document.getElementById("addCategory");
const categoryName = document.getElementById("categoryName");
const categoryColor = document.getElementById("categoryColor");
draggableImages.forEach((el) => {
  el.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text", e.target.id);
  });
});

dropZone.forEach((zone) => {
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();
    zone.classList.add("bg-gray-400");
  });

  zone.addEventListener("dragleave", (e) => {
    e.preventDefault();
    zone.classList.remove("bg-gray-400");
  });

  zone.addEventListener("drop", (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text");
    const draggable = document.getElementById(id);
    zone.appendChild(draggable);
    zone.classList.remove("bg-gray-400");
  });
});

// uploaded images drag and drop
imageContainer.addEventListener("dragstart", (e) => {
  if (e.target.classList.contains("draggable")) {
    e.dataTransfer.setData("text", e.target.id);
  }
});
inputFile.addEventListener("change", (e) => {
  const files = e.target.files;

  imageContainer.innerHTML = "";
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const imageType = file.type;
    if (imageType.startsWith("image")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = document.createElement("img");
        image.classList.add("draggable");
        image.id = "uploadedImage" + i;
        image.alt = "Uploaded Image";
        image.src = e.target.result;
        image.style.width = "200px";
        imageContainer.appendChild(image);
      };
      reader.readAsDataURL(file);
    }
  }
});

// custom category

addCategory.addEventListener("click", () => {
  if (!categoryName.value.trim().length) {
    alert("Enter Category Name");
    return;
  }
  const categoryContainer = document.getElementById("categories");
  const newCategory = document.createElement("div");
  newCategory.classList.add(
    "drop-zone",
    "category",
    "flex",
    "flex-row",
    "space-x-3",
    "overflow-auto"
  );
  newCategory.style.backgroundColor = categoryColor.value;
  newCategory.style.color = "white";
  newCategory.innerHTML = `<h2 class="text-xl font-bold p-2">${categoryName.value}</h2>`;
  newCategory.id=categoryName.value
  newCategory.addEventListener("dragover", (e) => {
    e.preventDefault();
    newCategory.classList.add("bg-gray-400");

  })

  newCategory.addEventListener("dragleave", (e) => {
    e.preventDefault();
    newCategory.classList.remove("bg-gray-400");
  })

  newCategory.addEventListener("drop", (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text");
    const draggable = document.getElementById(id);
    newCategory.appendChild(draggable);
    newCategory.classList.remove("bg-gray-400");
  })


  categoryContainer.appendChild(newCategory);
});
