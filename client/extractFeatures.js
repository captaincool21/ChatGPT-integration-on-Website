const extractMovieFeatures = (text) => {
    const movieFeatures = {
      title: null,
      director: null,
      releaseDate: null,
      genre: null,
      runtime: null
      // Add more movie features as needed
    };
  
    // Extract movie title
    const titleRegex = /Title: (.+)/i;
    const titleMatch = text.match(titleRegex);
    movieFeatures.title = titleMatch ? titleMatch[1] : null;
  
    // Extract director
    const directorRegex = /Director: (.+)/i;
    const directorMatch = text.match(directorRegex);
    movieFeatures.director = directorMatch ? directorMatch[1] : null;
  
    // Extract release date
    const releaseDateRegex = /Release Date: (.+)/i;
    const releaseDateMatch = text.match(releaseDateRegex);
    movieFeatures.releaseDate = releaseDateMatch ? releaseDateMatch[1] : null;
  
    // Extract genre
    const genreRegex = /Genre: (.+)/i;
    const genreMatch = text.match(genreRegex);
    movieFeatures.genre = genreMatch ? genreMatch[1] : null;
  
    // Extract runtime
    const runtimeRegex = /Runtime: (.+)/i;
    const runtimeMatch = text.match(runtimeRegex);
    movieFeatures.runtime = runtimeMatch ? runtimeMatch[1] : null;
  
    // Add more regular expressions and feature extraction as needed
  
    return movieFeatures;
  };
  