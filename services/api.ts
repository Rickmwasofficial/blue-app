export const TMDB_CONFIG = {
    BASE_URL : "https://api.themoviedb.org/3",
    API_KEY: process.env.EXPO_PUBLIC_TMBD_ACCESS || '',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMBD_ACCESS || ''}`
    } 
}

export const fetchMovies = async({ query }: { query: string }) => {
    const endPoint = query ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await fetch(endPoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers
    });

    if (!response.ok) {
        throw new Error(`Failed to Fetch Movies: ${response.statusText}. Please check your API key or network connection.`);
    }

    const data = await response.json();
    return data.results;
}

export const fetchMovieDetails = async (id: string): Promise<MovieDetails> => {
    try {
        const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${id}?api_key=${TMDB_CONFIG.API_KEY}`, {
            method: 'GET',
            headers: TMDB_CONFIG.headers
        })
        if (!response.ok) {
            throw new Error(`Failed to Fetch Movie Details: ${response.statusText}. Please check your API key or network connection.`);
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getMovieTrailer = async (id: string): Promise<Trail[]> => {
    try {
        const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${id}/videos?api_key=${TMDB_CONFIG.API_KEY}`, {
            method: 'GET',
            headers: TMDB_CONFIG.headers
        })
        if (!response.ok) {
            throw new Error(`Failed to Fetch Movie Trailer: ${response.statusText}. Please check your API key or network connection.`);
        }
        const data = await response.json()
        const youtubeTrailers = data.results.filter(
            (item: { site: string; type: string }) => item.site === "YouTube" && item.type === "Trailer"
        );
        console.log("Trailer: ", youtubeTrailers)
        return youtubeTrailers
    } catch (error) {
        console.log(error)
        throw error
    }
}

// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';


