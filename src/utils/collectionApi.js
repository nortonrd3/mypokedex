// fake database
let fakeDatabase = {
  collection: [],
  likedIds: new Set(),
};

// Get all Pokemon in user's collection
export const getCollection = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        collection: [...fakeDatabase.collection],
        likedIds: Array.from(fakeDatabase.likedIds),
      });
    }, 300);
  });
};

// Add Pokemon to collection
export const addToCollection = (pokemon) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Check if already in collection
      const exists = fakeDatabase.collection.some((p) => p.id === pokemon.id);

      if (exists) {
        reject({ message: "Pokemon already in collection" });
        return;
      }

      // Add _id field to simulate MongoDB document
      const savedPokemon = {
        ...pokemon,
        _id: "pokemon-" + pokemon.id + "-" + Date.now(),
        isLiked: fakeDatabase.likedIds.has(pokemon.id),
        addedAt: new Date().toISOString(),
      };

      fakeDatabase.collection.push(savedPokemon);

      resolve(savedPokemon);
    }, 400);
  });
};

// Remove Pokemon from collection
export const removeFromCollection = (pokemonId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = fakeDatabase.collection.findIndex(
        (p) => p.id === pokemonId
      );

      if (index === -1) {
        reject({ message: "Pokemon not found in collection" });
        return;
      }

      const removed = fakeDatabase.collection.splice(index, 1)[0];

      resolve({
        message: "Pokemon removed from collection",
        pokemon: removed,
      });
    }, 300);
  });
};

// Toggle like status for a Pokemon
export const toggleLike = (pokemonId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (fakeDatabase.likedIds.has(pokemonId)) {
        fakeDatabase.likedIds.delete(pokemonId);
      } else {
        fakeDatabase.likedIds.add(pokemonId);
      }

      // Update collection if Pokemon is in it
      const pokemonInCollection = fakeDatabase.collection.find(
        (p) => p.id === pokemonId
      );

      if (pokemonInCollection) {
        pokemonInCollection.isLiked = fakeDatabase.likedIds.has(pokemonId);
      }

      resolve({
        pokemonId,
        isLiked: fakeDatabase.likedIds.has(pokemonId),
        likedIds: Array.from(fakeDatabase.likedIds),
      });
    }, 250);
  });
};

// Get all liked Pokemon IDs
export const getLikedIds = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Array.from(fakeDatabase.likedIds));
    }, 200);
  });
};

// Clear all collection data (useful for sign out)
export const clearCollection = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      fakeDatabase.collection = [];
      fakeDatabase.likedIds = new Set();

      resolve({ message: "Collection cleared" });
    }, 200);
  });
};

// Seed some initial data (optional, for testing)
export const seedCollection = (pokemon) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      fakeDatabase.collection = pokemon.map((p) => ({
        ...p,
        _id: "pokemon-" + p.id + "-" + Date.now(),
        isLiked: false,
        addedAt: new Date().toISOString(),
      }));

      resolve({
        message: "Collection seeded",
        count: fakeDatabase.collection.length,
      });
    }, 300);
  });
};
