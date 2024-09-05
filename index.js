async function fetchData() {
    try {
        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();
        const pokemonSprite = data.sprites.front_default;
        const imgElement = document.getElementById("pokemonSprite");
        const messageElement = document.getElementById("message");

        // Display the fetched Pokemon sprite and hide error message
        imgElement.src = pokemonSprite;
        imgElement.style.display = "block";
        messageElement.style.display = "none";
    } catch (error) {
        console.error(error);

        // Show error message with sad emoji and hide the image
        const imgElement = document.getElementById("pokemonSprite");
        const messageElement = document.getElementById("message");
        
        imgElement.style.display = "none"; // Hide the image
        messageElement.style.display = "block"; // Show the error message
        messageElement.textContent = "😔 No Pokémon found, enter a valid Pokémon name.";
    }
}
