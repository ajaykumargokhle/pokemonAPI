async function fetchData() {
    try {
        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();

        // Get Pokémon data: image, types, and stats
        const pokemonSprite = data.sprites.front_default;
        const pokemonTypes = data.types.map(typeInfo => typeInfo.type.name).join(", ");
        const pokemonStats = data.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(", ");

        // Update the image element
        const imgElement = document.getElementById("pokemonSprite");
        imgElement.src = pokemonSprite;
        imgElement.style.display = "block";

        // Update the type and stats information
        const typeElement = document.getElementById("pokemonType");
        const statsElement = document.getElementById("pokemonStats");
        
        typeElement.textContent = `Type: ${pokemonTypes}`;
        statsElement.textContent = `Stats: ${pokemonStats}`;

        // Hide the error message
        const messageElement = document.getElementById("message");
        messageElement.style.display = "none";

    } catch (error) {
        console.error(error);

        // Show error message with sad emoji and hide the image, type, and stats
        const imgElement = document.getElementById("pokemonSprite");
        const messageElement = document.getElementById("message");
        const typeElement = document.getElementById("pokemonType");
        const statsElement = document.getElementById("pokemonStats");

        imgElement.style.display = "none";  // Hide the image
        typeElement.textContent = "";       // Clear the type information
        statsElement.textContent = "";      // Clear the stats information
        
        messageElement.style.display = "block"; // Show the error message
        messageElement.textContent = "😔 No Pokémon found, enter a valid Pokémon name.";
    }
}
