/* =====================================================
   PÁGINA 1 — HOME
   Lógica del botón Play → ir a Proyectos
   ===================================================== */

const playButton = document.getElementById("playButton");

playButton.addEventListener("click", () => {
    window.location.href = "proyectos.html";
});
