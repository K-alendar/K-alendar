const defaults = {
  ArtistImages(values) {
    return {
      icon: "https://imgur.com/iv0EMG3",
      banner: "https://imgur.com/43musa7",
      cardTall: "https://imgur.com/9eEYAcO",
      cardFlat: "https://imgur.com/BjYHkMi"
    };
  }
};

// Aliases for associations
defaults.Artist__images = values => defaults.ArtistImages(values)

module.exports = defaults;
