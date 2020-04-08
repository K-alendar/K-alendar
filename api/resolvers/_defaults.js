const defaults = {
  ArtistImages(values) {
    return {
      icon: "https://i.imgur.com/iv0EMG3",
      banner: "https://i.imgur.com/43musa7",
      cardTall: "https://i.imgur.com/9eEYAcO",
      cardFlat: "https://i.imgur.com/BjYHkMi"
    };
  }
};

// Aliases for associations
defaults.Artist__images = values => defaults.ArtistImages(values)

module.exports = defaults;
