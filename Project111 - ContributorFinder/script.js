async function fetchContributors() {
  const contributorsContainer = document.getElementById("contributors");
  const errorMessage = document.getElementById("error-message");
  
  const repoOwner = document.getElementById("repoOwner").value;
  const repoName = document.getElementById("repoName").value;

  // Clear previous data and error message
  contributorsContainer.innerHTML = "";
  errorMessage.style.display = "none";

  if (!repoOwner || !repoName) {
    errorMessage.textContent = "Please enter both repository owner and name.";
    errorMessage.style.display = "block";
    return;
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${repoOwner}/${repoName}/contributors?per_page=100`
    );

    if (!response.ok) throw new Error("Failed to fetch contributors");

    const contributors = await response.json();

    if (contributors.length === 0) {
      errorMessage.textContent = "No contributors found.";
      errorMessage.style.display = "block";
      return;
    }

    contributors.forEach((contributor) => {
      const card = document.createElement("div");
      card.className = "contributor-card";

      const img = document.createElement("img");
      img.src = contributor.avatar_url;
      img.alt = contributor.login;

      const name = document.createElement("h3");
      name.textContent = contributor.login;

      const githubLink = document.createElement("a");
      githubLink.href = contributor.html_url;
      githubLink.target = "_blank";
      githubLink.textContent = "GitHub Profile";

      card.appendChild(img);
      card.appendChild(name);
      card.appendChild(githubLink);

      contributorsContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching contributors:", error);
    errorMessage.textContent = "Failed to load contributors. Please try again.";
    errorMessage.style.display = "block";
  }
}
