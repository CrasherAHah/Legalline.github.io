const form = document.getElementById("questionForm");
const modal = document.getElementById("modal");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  modal.classList.add("show");
});

function closeModal() {
  modal.classList.remove("show");
}