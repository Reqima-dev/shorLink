async function generateShortLink() {
  const longUrl = document.getElementById("longUrl").value;
  const apiUrl =
    "https://tinyurl.com/api-create.php?url=" + encodeURIComponent(longUrl);

  try {
    const response = await fetch(apiUrl);
    const shortUrl = await response.text();
    if (shortUrl) {
      document.getElementById("shortUrl").innerText = shortUrl;
    } else {
      throw new Error("Erreur");
    }
  } catch (error) {
    console.log("Erreur", error);
    document.getElementById("shortUrl").innerText =
      "Impossible de générer le lien";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const copyBtn = document.querySelector(".copyBtn");
  const shortUrl = document.getElementById("shortUrl");

  copyBtn.addEventListener("click", () => {
    // Copier le texte de shortUrl dans le presse-papiers
    const textToCopy = shortUrl.textContent;
    navigator.clipboard.writeText(textToCopy).then(
      () => {
        // Changer le texte du bouton pour "Copié"
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = "Copié";

        // Appliquer une couleur verte au texte copié
        shortUrl.style.color = "green";
        copyBtn.style.color = "green";

        // Restaurer le texte original après 2 secondes
        setTimeout(() => {
          copyBtn.innerHTML = originalText;
          shortUrl.style.color = "";
          copyBtn.style.color = ""; // Réinitialiser la couleur
        }, 2000);
      },
      (err) => {
        console.error("Une erreur est survenue lors de la copie :", err);
      }
    );
  });
});
