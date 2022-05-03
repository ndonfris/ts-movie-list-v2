const MORE_INFO_HEADERS = {
    'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com',
    'X-RapidAPI-Key': 'b7a1750641mshd4e6ef3df5d8fe4p1cb598jsn335a11e3b912'
};

const STREAMING_INFO_HEADERS = {
  "X-RapidAPI-Host":
    "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
  "X-RapidAPI-Key": "b7a1750641mshd4e6ef3df5d8fe4p1cb598jsn335a11e3b912",
};

const SEARCH_MOVIE = {
    'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com',
    'X-RapidAPI-Key': 'b7a1750641mshd4e6ef3df5d8fe4p1cb598jsn335a11e3b912'
};

const SEARCH_ACTOR = {
  "X-RapidAPI-Host": "data-imdb1.p.rapidapi.com",
  "X-RapidAPI-Key": "b7a1750641mshd4e6ef3df5d8fe4p1cb598jsn335a11e3b912",
};

export const apiKeys = {
  searchMovie: SEARCH_MOVIE,
  searchActor: SEARCH_ACTOR,
  moreInfo: MORE_INFO_HEADERS,
  streamingInfo: STREAMING_INFO_HEADERS,
};

export const apiUrls = {
    searchMovie: 'https://movie-database-alternative.p.rapidapi.com/',
    moreInfo: 'https://movie-database-alternative.p.rapidapi.com/',
    searchActor: 'https://data-imdb1.p.rapidapi.com/',
    streamingInfo: 'https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/',
}

