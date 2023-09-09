interface AccountAddToWatchlistResponse {
    status_code: number;
    status_message: string;
}
interface AccountAddToWatchlistParams {
    session_id: string;
}
interface AccountAddToWatchlistBody {
    media_type: "movie" | "tv";
    media_id: number;
    watchlist: boolean;
}

interface AccountGetCreatedListsResponse {
    page: number;
    results: Result[];
    total_pages: number;
    total_results: number;
}
interface Result {
    description: string;
    favorite_count: number;
    id: number;
    item_count: number;
    iso_639_1: string;
    list_type: string;
    name: string;
    poster_path: null;
}
interface AccountGetCreatedListsParams {
    session_id: string;
    page?: number;
    language?: string;
}

interface AccountGetDetailsResponse {
    avatar: AccountGetDetailsAvatar;
    id: number;
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    include_adult: boolean;
    username: string;
}
interface AccountGetDetailsAvatar {
    gravatar: AccountGetDetailsGravatar;
}
interface AccountGetDetailsGravatar {
    hash: string;
}
interface AccountGetDetailsParams {
    session_id: string;
}

interface AccountGetFavoriteMoviesResponse {
    page: number;
    results: AccountGetFavoriteMoviesResult[];
    total_pages: number;
    total_results: number;
}
interface AccountGetFavoriteMoviesResult {
    adult: boolean;
    backdrop_path: null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    release_date: string;
    poster_path: null;
    popularity: number;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
interface AccountGetFavoriteMoviesParams {
    session_id: string;
    language?: string;
    sort_by?: string;
    page?: number;
}

interface AccountGetFavoriteTVShowsResponse {
    page: number;
    results: AccountGetFavoriteTVShowsResult[];
    total_pages: number;
    total_results: number;
}
interface AccountGetFavoriteTVShowsResult {
    backdrop_path: null;
    first_air_date: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_name: string;
    overview: string;
    origin_country: string[];
    poster_path: null;
    popularity: number;
    name: string;
    vote_average: number;
    vote_count: number;
}
interface AccountGetFavoriteTVShowsParams {
    session_id: string;
    language?: string;
    sort_by?: string;
    page?: number;
}

interface AccountGetMovieWatchlistResponse {
    page: number;
    results: AccountGetMovieWatchlistResult[];
    total_pages: number;
    total_results: number;
}
interface AccountGetMovieWatchlistResult {
    adult: boolean;
    backdrop_path: null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    release_date: string;
    poster_path: null;
    popularity: number;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
interface AccountGetMovieWatchlistParams {
    language?: string;
    session_id: string;
    sort_by?: string;
    page?: number;
}

interface AccountGetRatedMoviesResponse {
    page: number;
    results: AccountGetRatedMoviesResult[];
    total_pages: number;
    total_results: number;
}
interface AccountGetRatedMoviesResult {
    adult: boolean;
    backdrop_path: null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    release_date: string;
    poster_path: null;
    popularity: number;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    rating: number;
}
interface AccountGetRatedMoviesParams {
    language?: string;
    session_id: string;
    sort_by?: string;
    page?: number;
}

interface AccountGetRatedTVEpisodesResponse {
    page: number;
    results: AccountGetRatedTVEpisodesResult[];
    total_pages: number;
    total_results: number;
}
interface AccountGetRatedTVEpisodesResult {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: null | string;
    season_number: number;
    show_id: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
    rating: number;
}
interface AccountGetRatedTVEpisodesParams {
    language?: string;
    session_id: string;
    sort_by?: string;
    page?: number;
}

interface AccountGetRatedTVShowsResponse {
    page: number;
    results: AccountGetRatedTVShowsResult[];
    total_pages: number;
    total_results: number;
}
interface AccountGetRatedTVShowsResult {
    backdrop_path: null;
    first_air_date: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_name: string;
    overview: string;
    origin_country: string[];
    poster_path: null;
    popularity: number;
    name: string;
    vote_average: number;
    vote_count: number;
    rating: number;
}
interface AccountGetRatedTVShowsParams {
    language?: string;
    session_id: string;
    sort_by?: string;
    page?: number;
}

interface AccountGetTVShowWatchlistResponse {
    page: number;
    results: AccountGetTVShowWatchlistResult[];
    total_pages: number;
    total_results: number;
}
interface AccountGetTVShowWatchlistResult {
    backdrop_path: null;
    first_air_date: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_name: string;
    overview: string;
    origin_country: string[];
    poster_path: null;
    popularity: number;
    name: string;
    vote_average: number;
    vote_count: number;
}
interface AccountGetTVShowWatchlistParams {
    language?: string;
    session_id: string;
    sort_by?: string;
    page?: number;
}

interface AccountMarkAsFavoriteResponse {
    status_code: number;
    status_message: string;
}
interface AccountMarkAsFavoriteParams {
    session_id: string;
}
interface AccountMarkAsFavoriteBody {
    media_type: "movie" | "tv";
    media_id: number;
    favorite: boolean;
}

interface AuthenticationCreateGuestSessionResponse {
    success: boolean;
    guest_session_id: string;
    expires_at: string;
}
interface AuthenticationCreateRequestTokenResponse {
    success: boolean;
    expires_at: string;
    request_token: string;
}
interface AuthenticationCreateSessionBody {
    request_token: string;
}
interface AuthenticationCreateSessionResponse {
    success: boolean;
    session_id: string;
}
interface AuthenticationCreateSessionWithLoginBody {
    username: string;
    password: string;
    request_token: string;
}
interface AuthenticationCreateSessionWithLoginResponse {
    success: boolean;
    session_id: string;
}
interface AuthenticationCreateSessionFromV4AccessTokenBody {
    access_token: string;
}
interface AuthenticationCreateSessionFromV4AccessTokenResponse {
    success: boolean;
    session_id: string;
}
interface AuthenticationDeleteSessionBody {
    session_id: string;
}
interface AuthenticationDeleteSessionResponse {
    success: boolean;
}

interface CertificationsGetMovieCertificationResponse {
    certifications: Certifications;
}
interface CertificationsGetTVCertificationResponse {
    certifications: Certifications;
}
interface Certifications {
    [key: string]: Certification[];
}
interface Certification {
    certification: string;
    meaning: string;
    order: number;
}

interface ChangesGetMovieChangeListResponse {
    results: ChangesGetMovieChangeListResult[];
    page: number;
    total_pages: number;
    total_results: number;
}
interface ChangesGetMovieChangeListResult {
    id: number;
    adult: boolean;
}
interface ChangesGetMovieChangeListParams {
    start_date?: string;
    end_date?: string;
    page?: number;
}

interface ChangesGetPersonChangeListResponse {
    results: ChangesGetPersonChangeListResult[];
    page: number;
    total_pages: number;
    total_results: number;
}
interface ChangesGetPersonChangeListResult {
    id: number;
    adult: boolean;
}
interface ChangesGetPersonChangeListParams {
    start_date?: string;
    end_date?: string;
    page?: number;
}

interface ChangesGetTVChangeListResponse {
    results: ChangesGetTVChangeListResult[];
    page: number;
    total_pages: number;
    total_results: number;
}
interface ChangesGetTVChangeListResult {
    id: number;
    adult: boolean;
}
interface ChangesGetTVChangeListParams {
    start_date?: string;
    end_date?: string;
    page?: number;
}

interface CollectionsGetDetailsResponse {
    id: number;
    name: string;
    overview: string;
    poster_path: null;
    backdrop_path: string;
    parts: CollectionsGetDetailsPart[];
}
interface CollectionsGetDetailsPart {
    adult: boolean;
    backdrop_path: null;
    id: number;
    title: string;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string;
    media_type: string;
    genre_ids: number[];
    popularity: number;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
interface CollectionsGetDetailsParams {
    language?: string;
}

interface CollectionsGetImagesResponse {
    id: number;
    backdrops: CollectionsGetImagesBackdrop[];
    posters: CollectionsGetImagesBackdrop[];
}
interface CollectionsGetImagesBackdrop {
    aspect_ratio: number;
    file_path: string;
    height: number;
    iso_639_1: null | string;
    vote_average: number;
    vote_count: number;
    width: number;
}
interface CollectionsGetImagesParams {
    language?: string;
}

interface CollectionsGetTranslationsResponse {
    id: number;
    translations: CollectionsGetTranslationsTranslation[];
}
interface CollectionsGetTranslationsTranslation {
    iso_3166_1: string;
    iso_639_1: string;
    name: string;
    english_name: string;
    data: CollectionsGetTranslationsData;
}
interface CollectionsGetTranslationsData {
    title: string;
    overview: string;
    homepage: string;
}
interface CollectionsGetTranslationsParams {
    language?: string;
}

interface CompaniesGetAlternativeNamesResponse {
    id: number;
    results: CompaniesGetAlternativeNamesResult[];
}
interface CompaniesGetAlternativeNamesResult {
    name: string;
    type: string;
}

interface CompaniesGetDetailsResponse {
    description: string;
    headquarters: string;
    homepage: string;
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
    parent_company: null;
}

interface CompaniesGetImagesResponse {
    id: number;
    logos: CompaniesGetImagesLogo[];
}
interface CompaniesGetImagesLogo {
    aspect_ratio: number;
    file_path: string;
    height: number;
    id: string;
    file_type: string;
    vote_average: number;
    vote_count: number;
    width: number;
}

interface ConfigurationGetApiConfigurationResponse {
    images: ConfigurationGetApiConfigurationImages;
    change_keys: string[];
}
interface ConfigurationGetApiConfigurationImages {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: string[];
    logo_sizes: string[];
    poster_sizes: string[];
    profile_sizes: string[];
    still_sizes: string[];
}

type ConfigurationGetCountriesResponse = ConfigurationGetCountriesResult[];
interface ConfigurationGetCountriesResult {
    iso_3166_1: string;
    english_name: string;
}

type ConfigurationGetJobsResponse = ConfigurationGetJobsResult[];
interface ConfigurationGetJobsResult {
    department: string;
    jobs: string[];
}

type ConfigurationGetLanguagesResponse = ConfigurationGetLanguagesResult[];
interface ConfigurationGetLanguagesResult {
    iso_639_1: string;
    english_name: string;
    name: string;
}

type ConfigurationGetPrimaryTranslationsResponse = string[];

type ConfigurationGetTimezonesResponse = ConfigurationGetTimezonesResult[];
interface ConfigurationGetTimezonesResult {
    iso_3166_1: string;
    zones: string[];
}

interface CreditsGetDetailsResponse {
    credit_type: string;
    department: string;
    job: string;
    media: CreditsGetDetailsMedia;
    media_type: string;
    id: string;
    person: CreditsGetDetailsPerson;
}
interface CreditsGetDetailsMedia {
    id: number;
    name: string;
    original_name: string;
    character: string;
    episodes: any[];
    seasons: CreditsGetDetailsSeason[];
}
interface CreditsGetDetailsSeason {
    air_date: string;
    poster_path: string;
    season_number: number;
}
interface CreditsGetDetailsPerson {
    name: string;
    id: number;
}

interface DiscoverMovieDiscoverResponse {
    page: number;
    results: DiscoverMovieDiscoverResult[];
    total_results: number;
    total_pages: number;
}
interface DiscoverMovieDiscoverResult {
    poster_path: null;
    adult: boolean;
    overview: string;
    release_date: string;
    genre_ids: number[];
    id: number;
    original_title: string;
    original_language: string;
    title: string;
    backdrop_path: null;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
}
interface DiscoverMovieDiscoverParams {
    language?: string;
    region?: string;
    sort_by?: string;
    certification_country?: string;
    certification?: string;
    ["certification.lte"]?: string;
    ["certification.gte"]?: string;
    include_adult?: boolean;
    include_video?: boolean;
    page?: number;
    primary_release_year?: number;
    ["primary_release_date.gte"]?: string;
    ["primary_release_date.lte"]?: string;
    ["release_date.gte"]?: string;
    ["release_date.lte"]?: string;
    with_release_type?: number;
    year?: number;
    ["vote_count.gte"]?: number;
    ["vote_count.lte"]?: number;
    ["vote_average.gte"]?: number;
    ["vote_average.lte"]?: number;
    with_cast?: string;
    with_crew?: string;
    with_people?: string;
    with_companies?: string;
    with_genres?: string;
    without_genres?: string;
    with_keywords?: string;
    with_runtime?: string;
    ["with_runtime.gte"]?: number;
    ["with_runtime.lte"]?: number;
    with_original_language?: string;
    with_watch_providers?: string;
    watch_region?: string;
    with_watch_monetization_types?: string;
    without_companies?: string;
}

interface DiscoverTVDiscoverResponse {
    page: number;
    results: DiscoverTVDiscoverResult[];
    total_results: number;
    total_pages: number;
}
interface DiscoverTVDiscoverResult {
    poster_path: string;
    popularity: number;
    id: number;
    backdrop_path: null;
    vote_average: number;
    overview: string;
    first_air_date: string;
    origin_country: string[];
    genre_ids: number[];
    original_language: string;
    vote_count: number;
    name: string;
    original_name: string;
}
interface DiscoverTVDiscoverParams {
    language?: string;
    sort_by?: string;
    ["air_date.gte"]?: string;
    ["air_date.lte"]?: string;
    ["first_air_date.gte"]?: string;
    ["first_air_date.lte"]?: string;
    first_air_date_year?: number;
    page?: number;
    timezone?: string;
    ["vote_average.gte"]?: number;
    ["vote_count.gte"]?: number;
    with_genres?: string;
    with_networks?: string;
    without_genres?: string;
    with_runtime?: string;
    ["with_runtime.gte"]?: number;
    ["with_runtime.lte"]?: number;
    include_null_first_air_dates?: boolean;
    with_original_language?: string;
    without_keywords?: string;
    screened_theatrically?: boolean;
    with_companies?: string;
    with_keywords?: string;
    with_watch_providers?: string;
    watch_region?: string;
    with_watch_monetization_types?: string;
    with_status?: string;
    with_type?: string;
    without_companies?: string;
}

interface FindFindByIdResponse {
    movie_results: FindFindByIdMovieResult[];
    person_results: FindFindByIdPersonResult[];
    tv_results: FindFindByIdTvResult[];
    tv_episode_results: FindFindByIdTvEpisodeResult[];
    tv_season_results: FindFindByIdTvSeasonResult[];
}
interface FindFindByIdMovieResult {
    poster_path: string;
    adult: boolean;
    overview: string;
    release_date: string;
    genre_ids: number[];
    id: number;
    original_title: string;
    original_language: string;
    title: string;
    backdrop_path: string;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
}
interface FindFindByIdPersonResult {
    profile_path: string;
    adult: boolean;
    id: number;
    known_for: FindFindByIdPersonResultKnownForMovie[] | FindFindByIdPersonResultKnownForTV[];
    name: string;
    popularity: number;
}
interface FindFindByIdPersonResultKnownForMovie {
    poster_path: string;
    adult: boolean;
    overview: string;
    release_date: string;
    genre_ids: number[];
    id: number;
    original_title: string;
    original_language: string;
    title: string;
    backdrop_path: string;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
}
interface FindFindByIdPersonResultKnownForTV {
    poster_path: string;
    popularity: number;
    id: number;
    overview: string;
    backdrop_path: string;
    vote_average: number;
    media_type: string;
    first_air_date: string;
    origin_country: string[];
    genre_ids: number[];
    original_language: string;
    vote_count: number;
    name: string;
    original_name: string;
}
interface FindFindByIdTvResult {
    poster_path: string;
    popularity: number;
    id: number;
    backdrop_path: string;
    vote_average: number;
    overview: string;
    first_air_date: string;
    origin_country: string[];
    genre_ids: number[];
    original_language: string;
    vote_count: number;
    name: string;
    original_name: string;
}
type FindFindByIdTvEpisodeResult = unknown;
type FindFindByIdTvSeasonResult = unknown;
interface FindFindByIdParams {
    language?: string;
    external_source: string;
}

interface GenresGetMovieListResponse {
    genres: GenresGetMovieListGenre[];
}
interface GenresGetMovieListGenre {
    id: number;
    name: string;
}
interface GenresGetMovieListParams {
    language?: string;
}

interface GenresGetTVListResponse {
    genres: GenresGetTVListGenre[];
}
interface GenresGetTVListGenre {
    id: number;
    name: string;
}
interface GenresGetTVListParams {
    language?: string;
}

interface GuestSessionsGetRatedMoviesResponse {
    page: number;
    results: GuestSessionsGetRatedMoviesResult[];
    total_pages: number;
    total_results: number;
}
interface GuestSessionsGetRatedMoviesResult {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    release_date: string;
    poster_path: null;
    popularity: number;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    rating: number;
}
interface GuestSessionsGetRatedMoviesParams {
    language?: string;
    sort_by?: string;
    page?: number;
}

interface GuestSessionsGetRatedTVEpisodesResponse {
    page: number;
    results: GuestSessionsGetRatedTVEpisodesResult[];
    total_pages: number;
    total_results: number;
}
interface GuestSessionsGetRatedTVEpisodesResult {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: null | string;
    season_number: number;
    show_id: number;
    still_path: null | string;
    vote_average: number;
    vote_count: number;
    rating: number;
}
interface GuestSessionsGetRatedTVEpisodesParams {
    language?: string;
    sort_by?: string;
    page?: number;
}

interface GuestSessionsGetRatedTVShowsResponse {
    page: number;
    results: GuestSessionsGetRatedTVShowsResult[];
    total_pages: number;
    total_results: number;
}
interface GuestSessionsGetRatedTVShowsResult {
    backdrop_path: string;
    first_air_date: string;
    genre_ids: number[];
    id: number;
    original_language: null;
    original_name: string;
    overview: string;
    origin_country: string[];
    poster_path: string;
    popularity: number;
    name: string;
    vote_average: number;
    vote_count: number;
    rating: number;
}
interface GuestSessionsGetRatedTVShowsParams {
    language?: string;
    sort_by?: string;
    page?: number;
}

interface KeywordsGetDetailsResponse {
    id: number;
    name: string;
}

interface KeywordsGetMoviesResponse {
    id: number;
    page: number;
    results: KeywordsGetMoviesResult[];
    total_pages: number;
    total_results: number;
}
interface KeywordsGetMoviesResult {
    adult: boolean;
    backdrop_path: null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    release_date: string;
    poster_path: string;
    popularity: number;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
interface KeywordsGetMoviesParams {
    language?: string;
    page?: number;
    include_adult?: boolean;
}

interface ListsAddMovieResponse {
    status_code: number;
    status_message: string;
}
interface ListsAddMovieParams {
    session_id: string;
}
interface ListsAddMovieBody {
    media_id: number;
}

interface ListsCheckItemStatusResponse {
    id: string;
    item_present: boolean;
}
interface ListsCheckItemStatusParams {
    movie_id: number;
}

interface ListsClearListResponse {
    status_code: number;
    status_message: string;
}
interface ListsClearListParams {
    session_id: string;
    confirm: boolean;
}

interface ListsCreateListResponse {
    status_message: string;
    success: boolean;
    status_code: number;
    list_id: number;
}
interface ListsCreateListParams {
    session_id: string;
}
interface ListsCreateListBody {
    name?: string;
    description?: string;
    language?: string;
}

interface ListsDeleteListResponse {
    status_code: number;
    status_message: string;
}
interface ListsDeleteListParams {
    session_id: string;
}

interface ListsGetDetailsResponse {
    created_by: string;
    description: string;
    favorite_count: number;
    id: string;
    items: ListsGetDetailsItem[];
    item_count: number;
    iso_639_1: string;
    name: string;
    poster_path: string;
}
interface ListsGetDetailsItem {
    poster_path: string;
    adult: boolean;
    overview: string;
    release_date: string;
    original_title: string;
    genre_ids: number[];
    id: number;
    media_type: string;
    original_language: string;
    title: string;
    backdrop_path: null;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
}
interface ListsGetDetailsParams {
    language?: string;
}

interface ListsRemoveMovieResponse {
    status_code: number;
    status_message: string;
}
interface ListsRemoveMovieParams {
    session_id: string;
}
interface ListsRemoveMovieBody {
    media_id: number;
}

interface MoviesDeleteRatingResponse {
    status_code: number;
    status_message: string;
}
interface MoviesDeleteRatingParams {
    guest_session_id?: string;
    session_id?: string;
}

interface MoviesGetAccountStatesResponse {
    id: number;
    favorite: boolean;
    rated: {
        value: number;
    };
    watchlist: boolean;
}
interface MoviesGetAccountStatesParams {
    session_id: string;
    guest_session_id?: string;
}

interface MoviesGetAlternativeTitlesResponse {
    id: number;
    titles: MoviesGetAlternativeTitlesTitle[];
}
interface MoviesGetAlternativeTitlesTitle {
    iso_3166_1: string;
    title: string;
    type: string;
}
interface MoviesGetAlternativeTitlesParams {
    country?: string;
}

interface MoviesGetChangesResponse {
    changes: MoviesGetChangesChange[];
}
interface MoviesGetChangesChange {
    key: string;
    items: MoviesGetChangesItem[];
}
interface MoviesGetChangesItem {
    id: string;
    action: string;
    time: string;
    iso_639_1: string;
    value: string;
    original_value: string;
}
interface MoviesGetChangesParams {
    start_date?: string;
    end_date?: string;
    page?: number;
}

interface MoviesGetCreditsResponse {
    id: number;
    cast: MoviesGetCreditsCast[];
}
interface MoviesGetCreditsCast {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
}
interface MoviesGetCreditsParams {
    language?: string;
}

interface BelongsToConnection {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
}

type MoviesGetDetailsBaseResponse = {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: BelongsToConnection | null;
    budget: number;
    genres: MoviesGetDetailsGenre[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: null;
    production_companies: MoviesGetDetailsProductionCompany[];
    production_countries: MoviesGetDetailsProductionCountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: MoviesGetDetailsSpokenLanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};
interface MoviesGetDetailsGenre {
    id: number;
    name: string;
}
interface MoviesGetDetailsProductionCompany {
    id: number;
    logo_path: null | string;
    name: string;
    origin_country: string;
}
interface MoviesGetDetailsProductionCountry {
    iso_3166_1: string;
    name: string;
}
interface MoviesGetDetailsSpokenLanguage {
    iso_639_1: string;
    name: string;
}
interface MoviesGetDetailsParams<T extends MoviesAppendToResponse[]> {
    language?: string;
    append_to_response?: T;
}
type MoviesGetDetailsResponse<AppendToResponse extends MoviesAppendToResponse[] | undefined> = MoviesGetDetailsBaseResponse & AppendToResponseType<AppendToResponse>;

interface MoviesGetExternalIdsResponse {
    id: number;
    imdb_id: string;
    facebook_id: string;
    instagram_id: string;
    twitter_id: string;
}

interface MoviesGetImagesResponse {
    id: number;
    backdrops: MoviesGetImagesBackdrop[];
    posters: MoviesGetImagesBackdrop[];
}
interface MoviesGetImagesBackdrop {
    aspect_ratio: number;
    file_path: string;
    height: number;
    iso_639_1: null | string;
    vote_average: number;
    vote_count: number;
    width: number;
}
interface MoviesGetImagesParams {
    language?: string;
    include_image_language?: string;
}

interface MoviesGetKeywordsResponse {
    id: number;
    keywords: MoviesGetKeywordsKeyword[];
}
interface MoviesGetKeywordsKeyword {
    id: number;
    name: string;
}

interface MoviesGetLatestResponse {
    adult: boolean;
    backdrop_path: null;
    belongs_to_collection: BelongsToConnection | null;
    budget: number;
    genres: MoviesGetLatestGenre[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: unknown[];
    production_countries: unknown[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: unknown[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
interface MoviesGetLatestGenre {
    id: number;
    name: string;
}
interface MoviesGetLatestParams {
    language?: string;
}

interface MoviesGetListsResponse {
    id: number;
    page: number;
    results: MoviesGetListsResult[];
    total_pages: number;
    total_results: number;
}
interface MoviesGetListsResult {
    description: string;
    favorite_count: number;
    id: number;
    item_count: number;
    iso_639_1: string;
    list_type: string;
    name: string;
    poster_path: null | string;
}
interface MoviesGetListsParams {
    language?: string;
    page?: number;
}

interface MoviesGetNowPlayingResponse {
    page: number;
    results: MoviesGetNowPlayingResult[];
    dates: MoviesGetNowPlayingDates;
    total_pages: number;
    total_results: number;
}
interface MoviesGetNowPlayingDates {
    maximum: string;
    minimum: string;
}
interface MoviesGetNowPlayingResult {
    poster_path: string;
    adult: boolean;
    overview: string;
    release_date: string;
    genre_ids: number[];
    id: number;
    original_title: string;
    original_language: string;
    title: string;
    backdrop_path: string;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
}
interface MoviesGetNowPlayingParams {
    language?: string;
    page?: number;
    region?: string;
}

interface MoviesGetPopularResponse {
    page: number;
    results: MoviesGetPopularResult[];
    total_results: number;
    total_pages: number;
}
interface MoviesGetPopularResult {
    poster_path: string;
    adult: boolean;
    overview: string;
    release_date: string;
    genre_ids: number[];
    id: number;
    original_title: string;
    original_language: string;
    title: string;
    backdrop_path: string;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
}
interface MoviesGetPopularParams {
    language?: string;
    page?: number;
    region?: string;
}

interface MoviesGetRecommendationsResponse {
    page: number;
    results: MoviesGetRecommendationsResult[];
    total_pages: number;
    total_results: number;
}
interface MoviesGetRecommendationsResult {
    adult: boolean;
    backdrop_path: null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    release_date: string;
    poster_path: null;
    popularity: number;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
interface MoviesGetRecommendationsParams {
    language?: string;
    page?: number;
}

interface MoviesGetReleaseDatesResponse {
    id: number;
    results: MoviesGetReleaseDatesResult[];
}
interface MoviesGetReleaseDatesResult {
    iso_3166_1: string;
    release_dates: MoviesGetReleaseDatesReleaseDate[];
}
interface MoviesGetReleaseDatesReleaseDate {
    certification: string;
    iso_639_1: string;
    release_date: string;
    type: number;
    note?: string;
}

interface MoviesGetReviewsResponse {
    id: number;
    page: number;
    results: MoviesGetReviewsResult[];
    total_pages: number;
    total_results: number;
}
interface MoviesGetReviewsResult {
    author: string;
    author_details: MoviesGetReviewsAuthorDetails;
    content: string;
    created_at: string;
    id: string;
    updated_at: string;
    url: string;
}
interface MoviesGetReviewsAuthorDetails {
    name: string;
    username: string;
    avatar_path: null | string;
    rating: number | null;
}
interface MoviesGetReviewsParams {
    language?: string;
    page?: number;
}

interface MoviesGetSimilarMoviesResponse {
    page: number;
    results: MoviesGetSimilarMoviesResult[];
    total_pages: number;
    total_results: number;
}
interface MoviesGetSimilarMoviesResult {
    adult: boolean;
    backdrop_path: null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    release_date: string;
    poster_path: null;
    popularity: number;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
interface MoviesGetSimilarMoviesParams {
    language?: string;
    page?: number;
}

interface MoviesGetTopRatedResponse {
    page: number;
    results: MoviesGetTopRatedResult[];
    total_results: number;
    total_pages: number;
}
interface MoviesGetTopRatedResult {
    poster_path: string;
    adult: boolean;
    overview: string;
    release_date: string;
    genre_ids: number[];
    id: number;
    original_title: string;
    original_language: string;
    title: string;
    backdrop_path: string;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
}
interface MoviesGetTopRatedParams {
    language?: string;
    page?: number;
    region?: string;
}

interface MoviesGetTranslationsResponse {
    id: number;
    translations: MoviesGetTranslationsTranslation[];
}
interface MoviesGetTranslationsTranslation {
    iso_3166_1: string;
    iso_639_1: string;
    name: string;
    english_name: string;
    data: MoviesGetTranslationsData;
}
interface MoviesGetTranslationsData {
    title: string;
    overview: string;
    homepage: string;
}

interface MoviesGetUpcomingResponse {
    page: number;
    results: MoviesGetUpcomingResult[];
    total_results: number;
    total_pages: number;
}
interface MoviesGetUpcomingResult {
    poster_path: string;
    adult: boolean;
    overview: string;
    release_date: string;
    genre_ids: number[];
    id: number;
    original_title: string;
    original_language: string;
    title: string;
    backdrop_path: string;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
}
interface MoviesGetUpcomingParams {
    language?: string;
    page?: number;
    region?: string;
}

interface MoviesGetVideosResponse {
    id: number;
    results: MoviesGetVideosResult[];
}
interface MoviesGetVideosResult {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
}
interface MoviesGetVideosParams {
    language?: string;
}

interface MoviesGetWatchProvidersResponse {
    id: number;
    results: MoviesGetWatchProvidersResults;
}
interface MoviesGetWatchProvidersResults {
    [key: string]: MoviesGetWatchProvidersAr | MoviesGetWatchProvidersRo;
}
interface MoviesGetWatchProvidersAr {
    link: string;
    flatrate?: MoviesGetWatchProvidersBuy[];
    rent?: MoviesGetWatchProvidersBuy[];
    buy: MoviesGetWatchProvidersBuy[];
}
interface MoviesGetWatchProvidersBuy {
    display_priority: number;
    logo_path: string;
    provider_id: number;
    provider_name: string;
}
interface MoviesGetWatchProvidersRo {
    link: string;
    flatrate: MoviesGetWatchProvidersBuy[];
}

interface MoviesRateMovieResponse {
    status_code: number;
    status_message: string;
}
interface MoviesRateMovieParams {
    guest_session_id?: string;
    session_id?: string;
}
interface MoviesRateMovieBody {
    value: number;
}

interface NetworksGetAlternativeNamesResponse {
    id: number;
    results: NetworksGetAlternativeNamesResult[];
}
interface NetworksGetAlternativeNamesResult {
    name: string;
    type: string;
}

interface NetworksGetDetailsResponse {
    headquarters: string;
    homepage: string;
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

interface NetworksGetImagesResponse {
    id: number;
    logos: NetworksGetImagesLogo[];
}
interface NetworksGetImagesLogo {
    aspect_ratio: number;
    file_path: string;
    height: number;
    id: string;
    file_type: string;
    vote_average: number;
    vote_count: number;
    width: number;
}

interface PeopleGetChangesResponse {
    changes: PeopleGetChangesChange[];
}
interface PeopleGetChangesChange {
    key: string;
    items: PeopleGetChangesItem[];
}
interface PeopleGetChangesItem {
    id: string;
    action: string;
    time: string;
    original_value: PeopleGetChangesOriginalValue;
}
interface PeopleGetChangesOriginalValue {
    profile: PeopleGetChangesProfile;
}
interface PeopleGetChangesProfile {
    file_path: string;
}
interface PeopleGetChangesParams {
    end_date?: string;
    page?: number;
    start_date?: string;
}

interface PeopleGetCombinedCreditsResponse {
    cast: PeopleGetCombinedCreditsCast[];
}
interface PeopleGetCombinedCreditsCast {
    id: number;
    original_language: string;
    episode_count: number;
    overview: string;
    origin_country: string[];
    original_name: string;
    genre_ids: number[];
    name: string;
    media_type: string;
    poster_path: string;
    first_air_date: string;
    vote_average: number;
    vote_count: number;
    character: string;
    backdrop_path: string;
    popularity: number;
    credit_id: string;
}
interface PeopleGetCombinedCreditsParams {
    language?: string;
}

interface PeopleGetDetailsBaseResponse {
    birthday: string;
    known_for_department: string;
    deathday: null;
    id: number;
    name: string;
    also_known_as: string[];
    gender: number;
    biography: string;
    popularity: number;
    place_of_birth: string;
    profile_path: string;
    adult: boolean;
    imdb_id: string;
    homepage: null;
}
interface PeopleGetDetailsParams<T extends PeopleAppendToResponse[]> {
    language?: string;
    append_to_response?: T;
}
type PeopleGetDetailsResponse<AppendToResponse extends PeopleAppendToResponse[] | undefined> = PeopleGetDetailsBaseResponse & AppendToResponseType<AppendToResponse>;

interface PeopleGetExternalIdsResponse {
    imdb_id: string;
    facebook_id: null | string;
    freebase_mid: null | string;
    freebase_id: null | string;
    tvrage_id: null | number;
    twitter_id: null | string;
    id: number;
    instagram_id: null | string;
}
interface PeopleGetExternalIdsParams {
    language?: string;
}

interface PeopleGetImagesResponse {
    id: number;
    profiles: PeopleGetImagesProfile[];
}
interface PeopleGetImagesProfile {
    aspect_ratio: number;
    file_path: string;
    height: number;
    iso_639_1: null;
    vote_average: number;
    vote_count: number;
    width: number;
}

interface PeopleGetLatestResponse {
    adult: boolean;
    also_known_as: object[];
    biography: null | string;
    birthday: null | string;
    deathday: null | string;
    gender: number;
    homepage: null | string;
    id: number;
    imdb_id: null | string;
    place_of_birth: null | string;
    popularity: number;
    profile_path: null | string;
}
interface PeopleGetLatestParams {
    language?: string;
}

interface PeopleGetMovieCreditsResponse {
    cast: PeopleGetMovieCreditsCast[];
}
interface PeopleGetMovieCreditsCast {
    character: string;
    credit_id: string;
    release_date: string;
    vote_count: number;
    video: boolean;
    adult: boolean;
    vote_average: number;
    title: string;
    genre_ids: number[];
    original_language: string;
    original_title: string;
    popularity: number;
    id: number;
    backdrop_path: string;
    overview: string;
    poster_path: string;
}
interface PeopleGetMovieCreditsParams {
    language?: string;
}

interface PeopleGetPopularResponse {
    page: number;
    results: PeopleGetPopularResult[];
    total_results: number;
    total_pages: number;
}
interface PeopleGetPopularResult {
    profile_path: string;
    adult: boolean;
    id: number;
    known_for: PeopleGetPopularKnownFor[];
    name: string;
    popularity: number;
}
interface PeopleGetPopularKnownFor {
    poster_path: string;
    adult?: boolean;
    overview: string;
    release_date?: string;
    original_title?: string;
    genre_ids: number[];
    id: number;
    media_type: string;
    original_language: string;
    title?: string;
    backdrop_path: string;
    popularity: number;
    vote_count: number;
    video?: boolean;
    vote_average: number;
    first_air_date?: string;
    origin_country?: string[];
    name?: string;
    original_name?: string;
}
interface PeopleGetPopularParams {
    language?: string;
    page?: number;
}

interface PeopleGetTaggedImagesResponse {
    id: number;
    page: number;
    results: PeopleGetTaggedImagesResult[];
    total_pages: number;
    total_results: number;
}
interface PeopleGetTaggedImagesResult {
    aspect_ratio: number;
    file_path: string;
    height: number;
    id: string;
    iso_639_1: null | string;
    vote_average: number;
    vote_count: number;
    width: number;
    image_type: string;
    media: PeopleGetTaggedImagesMedia;
    media_type: string;
}
interface PeopleGetTaggedImagesMedia {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    _id: string;
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    release_date: string;
    poster_path: string;
    popularity: number;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
interface PeopleGetTaggedImagesParams {
    language?: string;
    page?: number;
}

interface PeopleGetTranslationsResponse {
    translations: PeopleGetTranslationsTranslation[];
    id: number;
}
interface PeopleGetTranslationsTranslation {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    data: PeopleGetTranslationsData;
    english_name: string;
}
interface PeopleGetTranslationsData {
    biography: string;
}
interface PeopleGetTranslationsParams {
    language?: string;
}

interface PeopleGetTvCreditsResponse {
    cast: PeopleGetTvCreditsCast[];
}
interface PeopleGetTvCreditsCast {
    credit_id: string;
    original_name: string;
    id: number;
    genre_ids: number[];
    character: string;
    name: string;
    poster_path: string;
    vote_count: number;
    vote_average: number;
    popularity: number;
    episode_count: number;
    original_language: string;
    first_air_date: string;
    backdrop_path: string;
    overview: string;
    origin_country: string[];
}
interface PeopleGetTvCreditsParams {
    language?: string;
}

interface ReviewsGetDetailsResponse {
    id: string;
    author: string;
    author_details: ReviewsGetDetailsAuthorDetails;
    content: string;
    created_at: string;
    iso_639_1: string;
    media_id: number;
    media_title: string;
    media_type: string;
    updated_at: string;
    url: string;
}
interface ReviewsGetDetailsAuthorDetails {
    name: string;
    username: string;
    avatar_path: string;
    rating: number;
}

interface SearchMultiSearchResponse {
    page: number;
    results: SearchMultiSearchResult[];
    total_results: number;
    total_pages: number;
}
interface SearchMultiSearchResult {
    poster_path?: null | string;
    popularity: number;
    id: number;
    overview?: string;
    backdrop_path?: null | string;
    vote_average?: number;
    media_type: string;
    first_air_date?: string;
    origin_country?: string[];
    genre_ids?: number[];
    original_language?: string;
    vote_count?: number;
    name?: string;
    original_name?: string;
    adult?: boolean;
    release_date?: string;
    original_title?: string;
    title?: string;
    video?: boolean;
    profile_path?: null | string;
    known_for?: SearchMultiSearchResult[];
}
interface SearchMultiSearchParams {
    query: string;
    language?: string;
    page?: number;
    include_adult?: boolean;
    region?: string;
}

interface SearchCollectionsResponse {
    page: number;
    results: SearchCollectionsResult[];
    total_pages: number;
    total_results: number;
}
interface SearchCollectionsResult {
    id: number;
    name: string;
    poster_path: null | string;
    backdrop_path: null | string;
}
interface SearchCollectionsParams {
    query: string;
    page?: number;
    language?: string;
}

interface SearchCompaniesResponse {
    page: number;
    results: SearchCompaniesResult[];
    total_pages: number;
    total_results: number;
}
interface SearchCompaniesResult {
    id: number;
    logo_path: null | string;
    name: string;
}
interface SearchCompaniesParams {
    query: string;
    page?: number;
}

interface SearchKeywordsResponse {
    page: number;
    results: SearchKeywordsResult[];
    total_pages: number;
    total_results: number;
}
interface SearchKeywordsResult {
    id: number;
    name: string;
}
interface SearchKeywordsParams {
    query: string;
    page?: number;
}

interface SearchMoviesResponse {
    page: number;
    results: SearchMoviesResult[];
    total_results: number;
    total_pages: number;
}
interface SearchMoviesResult {
    poster_path: null | string;
    adult: boolean;
    overview: string;
    release_date: string;
    genre_ids: number[];
    id: number;
    original_title: string;
    original_language: string;
    title: string;
    backdrop_path: null | string;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
}
interface SearchMoviesParams {
    query: string;
    language?: string;
    page?: number;
    include_adult?: boolean;
    region?: string;
    year?: number;
    primary_release_year?: number;
}

interface SearchPeopleResponse {
    page: number;
    results: SearchPeopleResult[];
    total_results: number;
    total_pages: number;
}
interface SearchPeopleResult {
    profile_path: null | string;
    adult: boolean;
    id: number;
    known_for: SearchPeopleKnownFor[];
    name: string;
    popularity: number;
}
interface SearchPeopleKnownFor {
    poster_path: string;
    adult?: boolean;
    overview: string;
    release_date?: string;
    original_title?: string;
    genre_ids: number[];
    id: number;
    media_type: string;
    original_language: string;
    title?: string;
    backdrop_path: null | string;
    popularity: number;
    vote_count: number;
    video?: boolean;
    vote_average: number;
    first_air_date?: string;
    origin_country?: string[];
    name?: string;
    original_name?: string;
}
interface SearchPeopleParams {
    query: string;
    language?: string;
    page?: number;
    include_adult?: boolean;
    region?: string;
}

interface SearchTVShowsResponse {
    page: number;
    results: SearchTVShowsResult[];
    total_results: number;
    total_pages: number;
}
interface SearchTVShowsResult {
    poster_path: string;
    popularity: number;
    id: number;
    backdrop_path: string;
    vote_average: number;
    overview: string;
    first_air_date: string;
    origin_country: string[];
    genre_ids: number[];
    original_language: string;
    vote_count: number;
    name: string;
    original_name: string;
}
interface SearchTVShowsParams {
    query: string;
    language?: string;
    page?: number;
    include_adult?: boolean;
    first_air_date_year?: number;
}

interface TrendingGetTrendingResponse {
    page: number;
    results: TrendingGetTrendingResult[];
    total_pages: number;
    total_results: number;
}
interface TrendingGetTrendingResult {
    adult?: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title?: string;
    overview: string;
    poster_path: string;
    release_date?: string;
    title?: string;
    video?: boolean;
    vote_average: number;
    vote_count: number;
    popularity: number;
    first_air_date?: string;
    name?: string;
    origin_country?: string[];
    original_name?: string;
}
interface TrendingGetTrendingParams {
    media_type: "all" | "movie" | "tv" | "person";
    time_window: "day" | "week";
    language?: string;
}

interface TVDeleteRatingResponse {
    status_code: number;
    status_message: string;
}
interface TVDeleteRatingParams {
    guest_session_id?: string;
    session_id?: string;
}

interface TVGetAccountStatesResponse {
    id: number;
    favorite: boolean;
    rated: {
        value: number;
    };
    watchlist: boolean;
}
interface TVGetAccountStatesParams {
    language?: string;
    guest_session_id?: string;
    session_id?: string;
}

interface TVGetAggregateCreditsResponse {
    cast: TVGetAggregateCreditsCast[];
}
interface TVGetAggregateCreditsCast {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    roles: TVGetAggregateCreditsRole[];
    total_episode_count: number;
    order: number;
}
interface TVGetAggregateCreditsRole {
    credit_id: string;
    character: string;
    episode_count: number;
}
interface TVGetAggregateCreditsParams {
    language?: string;
}

interface TVGetAlternativeTitlesResponse {
    id: number;
    results: TVGetAlternativeTitlesResult[];
}
interface TVGetAlternativeTitlesResult {
    iso_3166_1: string;
    title: string;
}
interface TVGetAlternativeTitlesParams {
    language?: string;
}

interface TVGetChangesResponse {
    changes: TVGetChangesChange[];
}
interface TVGetChangesChange {
    key: string;
    items: TVGetChangesItem[];
}
interface TVGetChangesItem {
    id: string;
    action: string;
    time: string;
    value?: TVGetChangesValueClass | string;
    iso_639_1?: string;
    original_value?: TVGetChangesOriginalValueClass | string;
}
interface TVGetChangesOriginalValueClass {
    id?: number;
    name?: string;
    credit_id?: string;
    person_id?: number;
    season_id?: number;
    poster?: TVGetChangesPoster;
    department?: string;
    job?: string;
}
interface TVGetChangesPoster {
    file_path: string;
    iso_639_1?: null | string;
}
interface TVGetChangesValueClass {
    season_id?: number;
    season_number?: number;
    id?: number;
    name?: string;
    add_to_every_season?: boolean;
    character?: string;
    credit_id?: string;
    order?: number;
    person_id?: number;
    poster?: TVGetChangesPoster;
    department?: string;
    job?: string;
}
interface TVGetChangesParams {
    start_date?: string;
    end_date?: string;
    page?: number;
}

interface TVGetContentRatingsResponse {
    results: TVGetContentRatingsResult[];
    id: number;
}
interface TVGetContentRatingsResult {
    iso_3166_1: string;
    rating: string;
}
interface TVGetContentRatingsParams {
    language?: string;
}

interface TVGetCreditsResponse {
    cast: TVGetCreditsCast[];
}
interface TVGetCreditsCast {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    character: string;
    credit_id: string;
    order: number;
}
interface TVGetCreditsParams {
    language?: string;
}

interface TVGetDetailsBaseResponse {
    backdrop_path: string;
    created_by: TVGetDetailsCreatedBy[];
    episode_run_time: number[];
    first_air_date: string;
    genres: TVGetDetailsGenre[];
    homepage: string;
    id: number;
    in_production: boolean;
    languages: string[];
    last_air_date: string;
    last_episode_to_air: TVGetDetailsLastEpisodeToAir;
    name: string;
    next_episode_to_air: null;
    networks: TVGetDetailsNetwork[];
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: TVGetDetailsNetwork[];
    production_countries: TVGetDetailsProductionCountry[];
    seasons: TVGetDetailsSeason[];
    spoken_languages: TVGetDetailsSpokenLanguage[];
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
}
interface TVGetDetailsCreatedBy {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string;
}
interface TVGetDetailsGenre {
    id: number;
    name: string;
}
interface TVGetDetailsLastEpisodeToAir {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    season_number: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
}
interface TVGetDetailsNetwork {
    name: string;
    id: number;
    logo_path: null | string;
    origin_country: string;
}
interface TVGetDetailsProductionCountry {
    iso_3166_1: string;
    name: string;
}
interface TVGetDetailsSeason {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
}
interface TVGetDetailsSpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}
interface TVGetDetailsParams<T extends TVAppendToResponse[]> {
    language?: string;
    append_to_response?: T;
}
type TVGetDetailsResponse<AppendToResponse extends TVAppendToResponse[] | undefined> = TVGetDetailsBaseResponse & AppendToResponseType<AppendToResponse>;

interface TVGetEpisodeGroupsResponse {
    results: TVGetEpisodeGroupsResult[];
    id: number;
}
interface TVGetEpisodeGroupsResult {
    description: string;
    episode_count: number;
    group_count: number;
    id: string;
    name: string;
    network: TVGetEpisodeGroupsNetwork | null;
    type: number;
}
interface TVGetEpisodeGroupsNetwork {
    id: number;
    logo_path: null | string;
    name: string;
    origin_country: string;
}
interface TVGetEpisodeGroupsParams {
    language?: string;
}

interface TVGetExternalIdsResponse {
    imdb_id: null | string;
    facebook_id: null | string;
    freebase_mid: null | string;
    freebase_id: null | string;
    tvrage_id: null | number;
    twitter_id: null | string;
    id: number;
    instagram_id: null | string;
}
interface TVGetExternalIdsParams {
    language?: string;
}

interface TVGetImagesResponse {
    backdrops: TVGetImagesBackdrop[];
    id: number;
    posters: TVGetImagesBackdrop[];
}
interface TVGetImagesBackdrop {
    aspect_ratio: number;
    file_path: string;
    height: number;
    iso_639_1: null | string;
    vote_average: number;
    vote_count: number;
    width: number;
}
interface TVGetImagesParams {
    language?: string;
}

interface TVGetKeywordsResponse {
    id: number;
    results: TVGetKeywordsResult[];
}
interface TVGetKeywordsResult {
    id: number;
    name: string;
}

interface TVGetLatestResponse {
    backdrop_path: null;
    created_by: unknown[];
    episode_run_time: number[];
    first_air_date: string;
    genres: TVGetLatestGenre[];
    homepage: string;
    id: number;
    in_production: boolean;
    languages: string[];
    last_air_date: string;
    name: string;
    networks: TVGetLatestGenre[];
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: null;
    popularity: number;
    poster_path: null;
    production_companies: unknown[];
    seasons: TVGetLatestSeason[];
    status: string;
    type: string;
    vote_average: number;
    vote_count: number;
}
interface TVGetLatestGenre {
    id: number;
    name: string;
}
interface TVGetLatestSeason {
    air_date: string;
    episode_count: number;
    id: number;
    poster_path: null;
    season_number: number;
}
interface TVGetLatestParams {
    language?: string;
}

interface TVGetPopularResponse {
    page: number;
    results: TVGetPopularResult[];
    total_results: number;
    total_pages: number;
}
interface TVGetPopularResult {
    poster_path: string;
    popularity: number;
    id: number;
    backdrop_path: string;
    vote_average: number;
    overview: string;
    first_air_date: string;
    origin_country: string[];
    genre_ids: number[];
    original_language: string;
    vote_count: number;
    name: string;
    original_name: string;
}
interface TVGetPopularParams {
    language?: string;
    page?: number;
}

interface TVGetRecommendationsResponse {
    page: number;
    results: TVGetRecommendationsResult[];
    total_pages: number;
    total_results: number;
}
interface TVGetRecommendationsResult {
    backdrop_path: string;
    first_air_date: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_name: string;
    overview: string;
    origin_country: string[];
    poster_path: string;
    popularity: number;
    name: string;
    vote_average: number;
    vote_count: number;
}
interface TVGetRecommendationsParams {
    language?: string;
    page?: number;
}

interface TVGetReviewsResponse {
    id: number;
    page: number;
    results: TVGetReviewsResult[];
    total_pages: number;
    total_results: number;
}
interface TVGetReviewsResult {
    author: string;
    author_details: TVGetReviewsAuthorDetails;
    content: string;
    created_at: string;
    id: string;
    updated_at: string;
    url: string;
}
interface TVGetReviewsAuthorDetails {
    name: string;
    username: string;
    avatar_path: null | string;
    rating: number;
}
interface TVGetReviewsParams {
    language?: string;
    page?: number;
}

interface TVGetScreenedTheatricallyResponse {
    id: number;
    results: TVGetScreenedTheatricallyResult[];
}
interface TVGetScreenedTheatricallyResult {
    id: number;
    episode_number: number;
    season_number: number;
}
interface TVGetScreenedTheatricallyParams {
    language?: string;
}

interface TVGetSimilarTVShowsResponse {
    page: number;
    results: TVGetSimilarTVShowsResult[];
    total_pages: number;
    total_results: number;
}
interface TVGetSimilarTVShowsResult {
    backdrop_path: string;
    first_air_date: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_name: string;
    overview: string;
    origin_country: string[];
    poster_path: string;
    popularity: number;
    name: string;
    vote_average: number;
    vote_count: number;
}
interface TVGetSimilarTVShowsParams {
    language?: string;
    page?: number;
}

interface TVGetTopRatedResponse {
    page: number;
    results: TVGetTopRatedResult[];
    total_results: number;
    total_pages: number;
}
interface TVGetTopRatedResult {
    poster_path: string;
    popularity: number;
    id: number;
    backdrop_path: string;
    vote_average: number;
    overview: string;
    first_air_date: string;
    origin_country: string[];
    genre_ids: number[];
    original_language: string;
    vote_count: number;
    name: string;
    original_name: string;
}
interface TVGetTopRatedParams {
    language?: string;
    page?: number;
}

interface TVGetTranslationsResponse {
    id: number;
    translations: TVGetTranslationsTranslation[];
}
interface TVGetTranslationsTranslation {
    iso_3166_1: string;
    iso_639_1: string;
    name: string;
    english_name: string;
    data: TVGetTranslationsData;
}
interface TVGetTranslationsData {
    name: string;
    overview: string;
    homepage: string;
}

interface TVGetTVAiringTodayResponse {
    page: number;
    results: TVGetTVAiringTodayResult[];
    total_results: number;
    total_pages: number;
}
interface TVGetTVAiringTodayResult {
    poster_path: null | string;
    popularity: number;
    id: number;
    backdrop_path: null | string;
    vote_average: number;
    overview: string;
    first_air_date: string;
    origin_country: string[];
    genre_ids: number[];
    original_language: string;
    vote_count: number;
    name: string;
    original_name: string;
}
interface TVGetTVAiringTodayParams {
    language?: string;
    page?: number;
}

interface TVGetTVOnTheAirResponse {
    page: number;
    results: TVGetTVOnTheAirResult[];
    total_results: number;
    total_pages: number;
}
interface TVGetTVOnTheAirResult {
    poster_path: string;
    popularity: number;
    id: number;
    backdrop_path: null | string;
    vote_average: number;
    overview: string;
    first_air_date: string;
    origin_country: string[];
    genre_ids: number[];
    original_language: string;
    vote_count: number;
    name: string;
    original_name: string;
}
interface TVGetTVOnTheAirParams {
    language?: string;
    page?: number;
}

interface TVGetVideosResponse {
    id: number;
    results: TVGetVideosResult[];
}
interface TVGetVideosResult {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
}
interface TVGetVideosParams {
    language?: string;
}

interface TVGetWatchProvidersResponse {
    id: number;
    results: TVGetWatchProvidersResults;
}
interface TVGetWatchProvidersResults {
    [key: string]: TVGetWatchProvidersAr | TVGetWatchProvidersAt | TVGetWatchProvidersRu;
}
interface TVGetWatchProvidersAr {
    link: string;
    flatrate: TVGetWatchProvidersFlatrate[];
}
interface TVGetWatchProvidersFlatrate {
    display_priority: number;
    logo_path: string;
    provider_id: number;
    provider_name: string;
}
interface TVGetWatchProvidersAt {
    link: string;
    buy?: TVGetWatchProvidersFlatrate[];
    flatrate: TVGetWatchProvidersFlatrate[];
    ads?: TVGetWatchProvidersFlatrate[];
    rent?: TVGetWatchProvidersFlatrate[];
}
interface TVGetWatchProvidersRu {
    link: string;
    flatrate: TVGetWatchProvidersFlatrate[];
    free: TVGetWatchProvidersFlatrate[];
}

interface TVRateTVShowsResponse {
    status_code: number;
    status_message: string;
}
interface TVRateTVShowsParams {
    guest_session_id?: string;
    session_id?: string;
}
interface TVRateTVShowsBody {
    value: number;
}

interface TVEpisodeGroupsGetDetailsResponse {
    description: string;
    episode_count: number;
    group_count: number;
    groups: TVEpisodeGroupsGetDetailsGroup[];
    id: string;
    name: string;
    network: TVEpisodeGroupsGetDetailsNetwork;
    type: number;
}
interface TVEpisodeGroupsGetDetailsGroup {
    id: string;
    name: string;
    order: number;
    episodes: TVEpisodeGroupsGetDetailsEpisode[];
    locked: boolean;
}
interface TVEpisodeGroupsGetDetailsEpisode {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: null;
    season_number: number;
    show_id: number;
    still_path: null | string;
    vote_average: number;
    vote_count: number;
    order: number;
}
interface TVEpisodeGroupsGetDetailsNetwork {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}
interface TVEpisodeGroupsGetDetailsParams {
    language?: string;
}

interface TVEpisodesDeleteRatingResponse {
    status_code: number;
    status_message: string;
}
interface TVEpisodesDeleteRatingParams {
    guest_session_id?: string;
    session_id?: string;
}

interface TVEpisodesGetAccountStatesResponse {
    id: number;
    rated: boolean | TVEpisodesGetAccountStatesRatedClass;
}
interface TVEpisodesGetAccountStatesRatedClass {
    value: number;
}
interface TVEpisodesGetAccountStatesParams {
    language?: string;
    guest_session_id?: string;
    session_id?: string;
}

interface TVEpisodesGetChangesResponse {
    changes: TVEpisodesGetChangesChange[];
}
interface TVEpisodesGetChangesChange {
    key: string;
    items: TVEpisodesGetChangesItem[];
}
interface TVEpisodesGetChangesItem {
    id: string;
    action: string;
    time: string;
    value: string;
    iso_639_1?: string;
    original_value?: string;
}
interface TVEpisodesGetChangesParams {
    start_date?: string;
    end_date?: string;
    page?: number;
}

interface TVEpisodesGetCreditsResponse {
    cast: TVEpisodesGetCreditsCast[];
    crew: TVEpisodesGetCreditsCast[];
    guest_stars: TVEpisodesGetCreditsCast[];
    id: number;
}
interface TVEpisodesGetCreditsCast {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: null | string;
    character?: string;
    credit_id: string;
    order?: number;
    department?: string;
    job?: string;
    character_name?: string;
}
interface TVEpisodesGetCreditsParams {
    language?: string;
}

interface TVEpisodesGetDetailsBaseResponse {
    air_date: string;
    crew: TVEpisodesGetDetailsCrew[];
    episode_number: number;
    guest_stars: TVEpisodesGetDetailsGuestStar[];
    name: string;
    overview: string;
    id: number;
    production_code: string;
    runtime: number;
    season_number: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
}
interface TVEpisodesGetDetailsCrew {
    department: string;
    job: string;
    credit_id: string;
    adult: boolean;
    gender: number;
    id: number;
    profile_path: null | string;
    name: string;
    original_name: string;
    known_for_department: string;
    popularity: number;
}
interface TVEpisodesGetDetailsGuestStar {
    character: string;
    credit_id: string;
    order: number;
    adult: boolean;
    id: number;
    name: string;
    known_for_department: string;
    profile_path: string;
    gender: number;
    original_name: string;
    popularity: number;
}
interface TVEpisodesGetDetailsParams<T extends TVEpisodesAppendToResponse[]> {
    language?: string;
    append_to_response?: T;
}
type TVEpisodesGetDetailsResponse<AppendToResponse extends TVEpisodesAppendToResponse[] | undefined> = TVEpisodesGetDetailsBaseResponse & AppendToResponseType<AppendToResponse>;

interface TVEpisodesGetExternalIDsResponse {
    id: number;
    imdb_id?: null | string;
    freebase_mid?: null | string;
    freebase_id?: null | string;
    tvdb_id?: null | number;
    tvrage_id?: null | number;
}

interface TVEpisodesGetImagesResponse {
    id: number;
    stills: TVEpisodesGetImagesStill[];
}
interface TVEpisodesGetImagesStill {
    aspect_ratio: number;
    file_path: string;
    height: number;
    iso_639_1: null | string;
    vote_average: number;
    vote_count: number;
    width: number;
}

interface TVEpisodesGetTranslationsResponse {
    id: number;
    translations: TVEpisodesGetTranslationsTranslation[];
}
interface TVEpisodesGetTranslationsTranslation {
    iso_3166_1: string;
    iso_639_1: string;
    name: string;
    english_name: string;
    data: TVEpisodesGetTranslationsData;
}
interface TVEpisodesGetTranslationsData {
    name: string;
    overview: string;
}

interface TVEpisodesGetVideosResponse {
    id: number;
    results: TVEpisodesGetVideosResult[];
}
interface TVEpisodesGetVideosResult {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    published_at: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    id: string;
}
interface TVEpisodesGetVideosParams {
    language?: string;
}

interface TVEpisodesRateTVEpisodeResponse {
    status_code: number;
    status_message: string;
}
interface TVEpisodesRateTVEpisodeParams {
    guest_session_id?: string;
    session_id?: string;
}
interface TVEpisodesRateTVEpisodeBody {
    value: number;
}

interface TVSeasonsGetAccountStatesResponse {
    id: number;
    results: TVSeasonsGetAccountStatesResult[];
}
interface TVSeasonsGetAccountStatesResult {
    id: number;
    episode_number: number;
    rated: boolean | TVSeasonsGetAccountStatesRatedClass;
}
interface TVSeasonsGetAccountStatesRatedClass {
    value: number;
}
interface TVSeasonsGetAccountStatesParams {
    language?: string;
    guest_session_id?: string;
    session_id?: string;
}

interface TVSeasonsGetAggregateCreditsResponse {
    cast: TVSeasonsGetAggregateCreditsCast[];
    crew: TVSeasonsGetAggregateCreditsCast[];
    id: number;
}
interface TVSeasonsGetAggregateCreditsCast {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: null | string;
    roles?: TVSeasonsGetAggregateCreditsRole[];
    total_episode_count: number;
    order?: number;
    jobs?: TVSeasonsGetAggregateCreditsJob[];
    department?: string;
}
interface TVSeasonsGetAggregateCreditsJob {
    credit_id: string;
    job: string;
    episode_count: number;
}
interface TVSeasonsGetAggregateCreditsRole {
    credit_id: string;
    character: string;
    episode_count: number;
}
interface TVSeasonsGetAggregateCreditsParams {
    language?: string;
}

interface TVSeasonsGetChangesResponse {
    changes: TVSeasonsGetChangesChange[];
}
interface TVSeasonsGetChangesChange {
    key: string;
    items: TVSeasonsGetChangesItem[];
}
interface TVSeasonsGetChangesItem {
    id: string;
    action: string;
    time: string;
    value?: TVSeasonsGetChangesValueClass | string;
    original_value?: string;
    iso_639_1?: string;
}
interface TVSeasonsGetChangesValueClass {
    episode_id: number;
    episode_number: number;
}
interface TVSeasonsGetChangesParams {
    start_date?: string;
    end_date?: string;
    page?: number;
}

interface TVSeasonsGetCreditsResponse {
    cast: TVSeasonsGetCreditsCast[];
    crew: TVSeasonsGetCreditsCast[];
    id: number;
}
interface TVSeasonsGetCreditsCast {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: null | string;
    character?: string;
    credit_id: string;
    order?: number;
    department?: string;
    job?: string;
}
interface TVSeasonsGetCreditsParams {
    language?: string;
}

interface TVSeasonsGetDetailsBaseResponse {
    _id: string;
    air_date: string;
    episodes: TVSeasonsGetDetailsEpisode[];
    name: string;
    overview: string;
    id: number;
    poster_path: string;
    season_number: number;
}
interface TVSeasonsGetDetailsEpisode {
    air_date: string;
    episode_number: number;
    crew: TVSeasonsGetDetailsCrew[];
    guest_stars: TVSeasonsGetDetailsCrew[];
    id: number;
    name: string;
    overview: string;
    production_code: string;
    season_number: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
    show_id: number;
    runtime: number;
}
interface TVSeasonsGetDetailsCrew {
    department?: string;
    job?: string;
    credit_id: string;
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: null | string;
    order?: number;
    character?: string;
}
interface TVSeasonsGetDetailsParams<T extends TVSeasonsAppendToResponse[]> {
    language?: string;
    append_to_response?: T;
}
type TVSeasonsGetDetailsResponse<AppendToResponse extends TVSeasonsAppendToResponse[] | undefined> = TVSeasonsGetDetailsBaseResponse & AppendToResponseType<AppendToResponse>;

interface TVSeasonsGetExternalIDsResponse {
    id: number;
    freebase_mid?: null | string;
    freebase_id?: null | string;
    tvdb_id?: null | number;
    tvrage_id?: null | number;
}
interface TVSeasonsGetExternalIDsParams {
    language?: string;
}

interface TVSeasonsGetImagesResponse {
    id: number;
    posters: TVSeasonsGetImagesPoster[];
}
interface TVSeasonsGetImagesPoster {
    aspect_ratio: number;
    file_path: string;
    height: number;
    iso_639_1: string;
    vote_average: number;
    vote_count: number;
    width: number;
}
interface TVSeasonsGetImagesParams {
    language?: string;
}

interface TVSeasonsGetTranslationsResponse {
    id: number;
    translations: TVSeasonsGetTranslationsTranslation[];
}
interface TVSeasonsGetTranslationsTranslation {
    iso_3166_1: string;
    iso_639_1: string;
    name: string;
    english_name: string;
    data: TVSeasonsGetTranslationsData;
}
interface TVSeasonsGetTranslationsData {
    name: string;
    overview: string;
}
interface TVSeasonsGetTranslationsParams {
    language?: string;
}

interface TVSeasonsGetVideosResponse {
    id: number;
    results: TVSeasonsGetVideosResult[];
}
interface TVSeasonsGetVideosResult {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
}
interface TVSeasonsGetVideosParams {
    language?: string;
}

interface WatchProvidersGetAvailableRegionsResponse {
    results: WatchProvidersGetAvailableRegionsResult[];
}
interface WatchProvidersGetAvailableRegionsResult {
    iso_3166_1: string;
    english_name: string;
    native_name: string;
}
interface WatchProvidersGetAvailableRegionsParams {
    language?: string;
}

interface WatchProvidersGetMovieProvidersResponse {
    results: WatchProvidersGetMovieProvidersResult[];
}
interface WatchProvidersGetMovieProvidersResult {
    display_priority: number;
    logo_path: string;
    provider_name: string;
    provider_id: number;
}
interface WatchProvidersGetMovieProvidersParams {
    language?: string;
    watch_region?: string;
}

interface WatchProvidersGetTVProvidersResponse {
    results: WatchProvidersGetTVProvidersResult[];
}
interface WatchProvidersGetTVProvidersResult {
    display_priority: number;
    logo_path: string;
    provider_name: string;
    provider_id: number;
}
interface WatchProvidersGetTVProvidersParams {
    language?: string;
    watch_region?: string;
}

type MoviesAppendToResponse = "account_states" | "alternative_titles" | "changes" | "credits" | "external_ids" | "images" | "keywords" | "latest" | "lists" | "recommendations" | "release_dates" | "reviews" | "similar" | "translations" | "videos" | "watch_providers";
interface MoviesAppendToResponseTypes {
    account_states: MoviesGetAccountStatesResponse;
    alternative_titles: MoviesGetAlternativeTitlesResponse;
    changes: MoviesGetChangesResponse;
    credits: MoviesGetCreditsResponse;
    external_ids: MoviesGetExternalIdsResponse;
    images: MoviesGetImagesResponse;
    keywords: MoviesGetKeywordsResponse;
    latest: MoviesGetLatestResponse;
    lists: MoviesGetListsResponse;
    recommendations: MoviesGetRecommendationsResponse;
    release_dates: MoviesGetReleaseDatesResponse;
    reviews: MoviesGetReviewsResponse;
    similar: MoviesGetSimilarMoviesResponse;
    translations: MoviesGetTranslationsResponse;
    videos: MoviesGetVideosResponse;
    watch_providers: MoviesGetWatchProvidersResponse;
}
type PeopleAppendToResponse = "changes" | "combined_credits" | "external_ids" | "images" | "latest" | "movie_credits" | "tv_credits" | "translations";
interface PeopleAppendToResponseTypes {
    changes: PeopleGetChangesResponse;
    combined_credits: PeopleGetCombinedCreditsResponse;
    external_ids: PeopleGetExternalIdsResponse;
    images: PeopleGetImagesResponse;
    latest: PeopleGetLatestResponse;
    movie_credits: PeopleGetMovieCreditsResponse;
    tv_credits: TVGetCreditsResponse;
    translations: PeopleGetTranslationsResponse;
}
type TVAppendToResponse = "account_states" | "aggregate_credits" | "alternative_titles" | "changes" | "content_ratings" | "credits" | "episode_groups" | "external_ids" | "images" | "keywords" | "latest" | "recommendations" | "reviews" | "screened_theatrically" | "similar" | "translations" | "videos";
interface TVAppendToResponseTypes {
    account_states: TVGetAccountStatesResponse;
    aggregate_credits: TVGetAggregateCreditsResponse;
    alternative_titles: TVGetAlternativeTitlesResponse;
    changes: TVGetChangesResponse;
    content_ratings: TVGetContentRatingsResponse;
    credits: TVGetCreditsResponse;
    episode_groups: TVGetEpisodeGroupsResponse;
    external_ids: TVGetExternalIdsResponse;
    images: TVGetImagesResponse;
    keywords: TVGetKeywordsResponse;
    latest: TVGetLatestResponse;
    recommendations: TVGetRecommendationsResponse;
    reviews: TVGetReviewsResponse;
    screened_theatrically: TVGetScreenedTheatricallyResponse;
    similar: TVGetSimilarTVShowsResponse;
    translations: TVGetTranslationsResponse;
    videos: TVGetVideosResponse;
    watch_providers: TVGetWatchProvidersResponse;
}
type TVSeasonsAppendToResponse = "account_states" | "aggregate_credits" | "changes" | "credits" | "external_ids" | "images" | "translations" | "videos" | "watch_providers";
interface TVSeasonsAppendToResponseTypes {
    account_states: TVSeasonsGetAccountStatesResponse;
    aggregate_credits: TVSeasonsGetAggregateCreditsResponse;
    changes: TVSeasonsGetChangesResponse;
    credits: TVSeasonsGetCreditsResponse;
    external_ids: TVGetExternalIdsResponse;
    images: TVSeasonsGetImagesResponse;
    translations: TVSeasonsGetTranslationsResponse;
    videos: TVSeasonsGetVideosResponse;
    watch_providers: TVGetWatchProvidersResponse;
}
type TVEpisodesAppendToResponse = "account_states" | "changes" | "credits" | "external_ids" | "images" | "translations" | "videos";
interface TVEpisodesAppendToResponseTypes {
    account_states: TVEpisodesGetAccountStatesResponse;
    changes: TVEpisodesGetChangesResponse;
    credits: TVEpisodesGetCreditsResponse;
    external_ids: TVGetExternalIdsResponse;
    images: TVEpisodesGetImagesResponse;
    translations: TVEpisodesGetTranslationsResponse;
    videos: TVEpisodesGetVideosResponse;
}
type ResponseTypeFor<T> = T extends keyof MoviesAppendToResponseTypes ? MoviesAppendToResponseTypes[T] : T extends keyof TVAppendToResponseTypes ? TVAppendToResponseTypes[T] : T extends keyof PeopleAppendToResponseTypes ? PeopleAppendToResponseTypes[T] : T extends keyof TVSeasonsAppendToResponseTypes ? TVSeasonsAppendToResponseTypes[T] : T extends keyof TVEpisodesAppendToResponseTypes ? TVEpisodesAppendToResponseTypes[T] : never;
type ExtractValidKeys<T> = T extends (infer U)[] ? U : never;
type AppendToResponseType<AppendToResponse extends (MoviesAppendToResponse | TVAppendToResponse | PeopleAppendToResponse | TVSeasonsAppendToResponse | TVEpisodesAppendToResponse)[] | undefined> = AppendToResponse extends undefined ? Record<string, never> : {
    [K in ExtractValidKeys<AppendToResponse>]: ResponseTypeFor<K>;
};

interface V4AccountGetFavoriteMoviesResponse {
    page: number;
    results: V4AccountGetFavoriteMoviesResult[];
    total_results: number;
    total_pages: number;
}
interface V4AccountGetFavoriteMoviesResult {
    poster_path: null | string;
    adult: boolean;
    overview: string;
    release_date: string;
    genre_ids: number[];
    id: number;
    original_title: string;
    original_language: string;
    title: string;
    backdrop_path: null;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
}
interface V4AccountGetFavoriteMoviesParams {
    page?: number;
    sort_by?: string;
}

interface V4AccountGetFavoriteTVShowsResponse {
    page: number;
    results: V4AccountGetFavoriteTVShowsResult[];
    total_results: number;
    total_pages: number;
}
interface V4AccountGetFavoriteTVShowsResult {
    poster_path: null;
    popularity: number;
    id: number;
    backdrop_path: null;
    vote_average: number;
    overview: string;
    first_air_date: string;
    origin_country: string[];
    genre_ids: number[];
    original_language: string;
    vote_count: number;
    name: string;
    original_name: string;
}
interface V4AccountGetFavoriteTVShowsParams {
    page?: number;
    sort_by?: string;
}

interface V4AccountGetListsResponse {
    page: number;
    total_results: number;
    total_pages: number;
    results: V4AccountGetListsResult[];
}
interface V4AccountGetListsResult {
    iso_639_1: string;
    id: number;
    featured: number;
    description: string;
    revenue: string;
    public: number;
    name: string;
    updated_at: string;
    created_at: string;
    sort_by: number;
    backdrop_path?: string;
    runtime: number;
    average_rating: number;
    iso_3166_1: string;
    adult: number;
    number_of_items: number;
    poster_path?: string;
}
interface V4AccountGetListsParams {
    page?: number;
}

interface V4AccountGetMovieRecommendationsResponse {
    page: number;
    results: V4AccountGetMovieRecommendationsResult[];
    total_results: number;
    total_pages: number;
}
interface V4AccountGetMovieRecommendationsResult {
    poster_path: null | string;
    adult: boolean;
    overview: string;
    release_date: string;
    genre_ids: number[];
    id: number;
    original_title: string;
    original_language: string;
    title: string;
    backdrop_path: null;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
}
interface V4AccountGetMovieRecommendationsParams {
    page?: number;
    sort_by?: string;
}

interface V4AccountGetMovieWatchlistResponse {
    page: number;
    results: V4AccountGetMovieWatchlistResult[];
    total_results: number;
    total_pages: number;
}
interface V4AccountGetMovieWatchlistResult {
    poster_path: null | string;
    adult: boolean;
    overview: string;
    release_date: string;
    genre_ids: number[];
    id: number;
    original_title: string;
    original_language: string;
    title: string;
    backdrop_path: null;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
}
interface V4AccountGetMovieWatchlistParams {
    page?: number;
    sort_by?: string;
}

interface V4AccountGetRatedMoviesResponse {
    page: number;
    total_results: number;
    total_pages: number;
    results: V4AccountGetRatedMoviesResult[];
}
interface V4AccountGetRatedMoviesResult {
    account_rating: V4AccountGetRatedMoviesAccountRating;
    popularity: number;
    vote_count: number;
    video: boolean;
    poster_path: string;
    id: number;
    adult: boolean;
    backdrop_path: string;
    original_language: string;
    original_title: string;
    genre_ids: number[];
    title: string;
    vote_average: number;
    overview: string;
    release_date: string;
}
interface V4AccountGetRatedMoviesAccountRating {
    value: number;
    created_at: string;
}
interface V4AccountGetRatedMoviesParams {
    page?: number;
    sort_by?: string;
}

interface V4AccountGetRatedTVShowsResponse {
    page: number;
    total_results: number;
    total_pages: number;
    results: V4AccountGetRatedTVShowsResult[];
}
interface V4AccountGetRatedTVShowsResult {
    original_name: string;
    genre_ids: number[];
    account_rating: V4AccountGetRatedTVShowsAccountRating;
    name: string;
    popularity: number;
    origin_country: string[];
    vote_count: number;
    first_air_date: string;
    backdrop_path: string;
    original_language: string;
    id: number;
    vote_average: number;
    overview: string;
    poster_path: string;
}
interface V4AccountGetRatedTVShowsAccountRating {
    value: number;
    created_at: string;
}
interface V4AccountGetRatedTVShowsParams {
    page?: number;
    sort_by?: string;
}

interface V4AccountGetTVShowRecommendationsResponse {
    page: number;
    results: V4AccountGetTVShowRecommendationsResult[];
    total_results: number;
    total_pages: number;
}
interface V4AccountGetTVShowRecommendationsResult {
    poster_path: null;
    popularity: number;
    id: number;
    backdrop_path: null;
    vote_average: number;
    overview: string;
    first_air_date: string;
    origin_country: string[];
    genre_ids: number[];
    original_language: string;
    vote_count: number;
    name: string;
    original_name: string;
}
interface V4AccountGetTVShowRecommendationsParams {
    page?: number;
    sort_by?: string;
}

interface V4AccountGetTVShowWatchlistResponse {
    page: number;
    results: V4AccountGetTVShowWatchlistResult[];
    total_results: number;
    total_pages: number;
}
interface V4AccountGetTVShowWatchlistResult {
    poster_path: null;
    popularity: number;
    id: number;
    backdrop_path: null;
    vote_average: number;
    overview: string;
    first_air_date: string;
    origin_country: string[];
    genre_ids: number[];
    original_language: string;
    vote_count: number;
    name: string;
    original_name: string;
}
interface V4AccountGetTVShowWatchlistParams {
    page?: number;
    sort_by?: string;
}

interface V4AuthCreateAccessTokenResponse {
    status_message: string;
    access_token: string;
    success: boolean;
    status_code: number;
    account_id: string;
}
interface V4AuthCreateAccessTokenBody {
    request_token: string;
}

interface V4AuthCreateRequestTokenResponse {
    status_message: string;
    request_token: string;
    success: boolean;
    status_code: number;
}
interface V4AuthCreateRequestTokenBody {
    redirect_to?: string;
}

interface V4AuthDeleteAccessTokenResponse {
    status_message: string;
    success: boolean;
    status_code: number;
}
interface V4AuthDeleteAccessTokenBody {
    access_token: string;
}

interface V4ListAddItemsResponse {
    status_message: string;
    results: V4ListAddItemsResult[];
    success: boolean;
    status_code: number;
}
interface V4ListAddItemsResult {
    media_type: string;
    media_id: number;
    success: boolean;
}
interface V4ListAddItemsBody {
    items: V4ListAddItemsItem[];
}
interface V4ListAddItemsItem {
    media_type: string;
    media_id: number;
}

interface V4ListCheckItemStatusResponse {
    media_type: string;
    success: boolean;
    status_message: string;
    id: number;
    media_id: number;
    status_code: number;
}
interface V4ListCheckItemStatusParams {
    media_id: number;
    media_type: string;
}

interface V4ListClearListResponse {
    items_deleted: number;
    status_message: string;
    id: number;
    status_code: number;
    success: boolean;
}

interface V4ListCreateListResponse {
    status_message: string;
    id: number;
    success: boolean;
    status_code: number;
}
interface V4ListCreateListBody {
    name: string;
    iso_639_1: string;
    description?: string;
    public?: boolean;
    iso_3166_1?: string;
}

interface V4ListDeleteListResponse {
    status_message: string;
    success: boolean;
    status_code: number;
}

interface V4ListGetListResponse {
    poster_path: string;
    id: number;
    backdrop_path: string;
    total_results: number;
    public: boolean;
    revenue: string;
    page: number;
    results: V4ListGetListResult[];
    object_ids: V4ListGetListComments;
    iso_639_1: string;
    total_pages: number;
    description: string;
    created_by: V4ListGetListCreatedBy;
    iso_3166_1: string;
    average_rating: number;
    runtime: number;
    name: string;
    comments: V4ListGetListComments;
}
interface V4ListGetListComments {
    [key: string]: null | string;
}
interface V4ListGetListCreatedBy {
    gravatar_hash: string;
    name: string;
    username: string;
}
interface V4ListGetListResult {
    poster_path: string;
    adult: boolean;
    overview: string;
    release_date: string;
    original_title: string;
    genre_ids: number[];
    id: number;
    media_type: string;
    original_language: string;
    title: string;
    backdrop_path: string;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
}
interface V4ListGetListParams {
    page?: number;
    language?: string;
    sort_by?: string;
}

interface V4ListRemoveItemsResponse {
    status_message: string;
    results: V4ListRemoveItemsResult[];
    success: boolean;
    status_code: number;
}
interface V4ListRemoveItemsResult {
    media_type: string;
    media_id: number;
    success: boolean;
}
interface V4ListRemoveItemsBody {
    items: V4ListRemoveItemsItem[];
}
interface V4ListRemoveItemsItem {
    media_type: string;
    media_id: number;
}

interface V4ListUpdateItemsResponse {
    status_message: string;
    results: V4ListUpdateItemsResult[];
    success: boolean;
    status_code: number;
}
interface V4ListUpdateItemsResult {
    media_type: string;
    media_id: number;
    success: boolean;
}
interface V4ListUpdateItemsBody {
    items: V4ListUpdateItemsItem[];
}
interface V4ListUpdateItemsItem {
    media_type: string;
    media_id: number;
    comment: string;
}

interface V4ListUpdateListResponse {
    status_message: string;
    success: boolean;
    status_code: number;
}
interface V4ListUpdateListBody {
    description?: string;
    name?: string;
    public?: boolean;
    sort_by?: string;
}

interface TMDBApiError {
    status_code: number;
    status_message: string;
}

interface IAccount {
    getDetails: (params: AccountGetDetailsParams) => Promise<AccountGetDetailsResponse>;
    getCreatedLists: (params: AccountGetCreatedListsParams, accountId?: number) => Promise<AccountGetCreatedListsResponse>;
    getFavoriteMovies: (params: AccountGetFavoriteMoviesParams, accountId?: number) => Promise<AccountGetFavoriteMoviesResponse>;
    getFavoriteTVShows: (params: AccountGetFavoriteTVShowsParams, accountId?: number) => Promise<AccountGetFavoriteTVShowsResponse>;
    markAsFavorite: (params: AccountMarkAsFavoriteParams, body: AccountMarkAsFavoriteBody, accountId?: number) => Promise<AccountMarkAsFavoriteResponse>;
    getRatedMovies: (params: AccountGetRatedMoviesParams, accountId?: number) => Promise<AccountGetRatedMoviesResponse>;
    getRatedTVShows: (params: AccountGetRatedTVShowsParams, accountId?: number) => Promise<AccountGetRatedTVShowsResponse>;
    getRatedTVEpisodes: (params: AccountGetRatedTVEpisodesParams, accountId?: number) => Promise<AccountGetRatedTVEpisodesResponse>;
    getMovieWatchlist: (params: AccountGetMovieWatchlistParams, accountId?: number) => Promise<AccountGetMovieWatchlistResponse>;
    getTVShowWatchlist: (params: AccountGetTVShowWatchlistParams, accountId?: number) => Promise<AccountGetTVShowWatchlistResponse>;
    addToWatchlist: (params: AccountAddToWatchlistParams, body: AccountAddToWatchlistBody, accountId?: number) => Promise<AccountAddToWatchlistResponse>;
}
interface IAuthentication {
    createGuestSession: () => Promise<AuthenticationCreateGuestSessionResponse>;
    createRequestToken: () => Promise<AuthenticationCreateRequestTokenResponse>;
    createSession: (body: AuthenticationCreateSessionBody) => Promise<AuthenticationCreateSessionResponse>;
    createSessionWithLogin: (body: AuthenticationCreateSessionWithLoginBody) => Promise<AuthenticationCreateSessionWithLoginResponse>;
    createSessionFromV4AccessToken: (body: AuthenticationCreateSessionFromV4AccessTokenBody) => Promise<AuthenticationCreateSessionFromV4AccessTokenResponse>;
    deleteSession: (body: AuthenticationDeleteSessionBody) => Promise<AuthenticationDeleteSessionResponse>;
}
interface ICertifications {
    getMovieCertifications: () => Promise<CertificationsGetMovieCertificationResponse>;
    getTVShowCertifications: () => Promise<CertificationsGetTVCertificationResponse>;
}
interface IChanges {
    getMovieChangeList: (params?: ChangesGetMovieChangeListParams) => Promise<ChangesGetMovieChangeListResponse>;
    getTVChangeList: (params?: ChangesGetTVChangeListParams) => Promise<ChangesGetTVChangeListResponse>;
    getPersonChangeList: (params?: ChangesGetPersonChangeListParams) => Promise<ChangesGetPersonChangeListResponse>;
}
interface ICollections {
    getDetails: (collectionId: number, params?: CollectionsGetDetailsParams) => Promise<CollectionsGetDetailsResponse>;
    getImages: (collectionId: number, params?: CollectionsGetImagesParams) => Promise<CollectionsGetImagesResponse>;
    getTranslations: (collectionId: number, params?: CollectionsGetTranslationsParams) => Promise<CollectionsGetTranslationsResponse>;
}
interface ICompanies {
    getDetails: (companyId: number) => Promise<CompaniesGetDetailsResponse>;
    getAlternativeNames: (companyId: number) => Promise<CompaniesGetAlternativeNamesResponse>;
    getImages: (companyId: number) => Promise<CompaniesGetImagesResponse>;
}
interface IConfiguration {
    getAPIConfiguration: () => Promise<ConfigurationGetApiConfigurationResponse>;
    getCountries: () => Promise<ConfigurationGetCountriesResponse>;
    getJobs: () => Promise<ConfigurationGetJobsResponse>;
    getLanguages: () => Promise<ConfigurationGetLanguagesResponse>;
    getPrimaryTranslations: () => Promise<ConfigurationGetPrimaryTranslationsResponse>;
    getTimezones: () => Promise<ConfigurationGetTimezonesResponse>;
}
interface ICredits {
    getDetails: (creditId: string) => Promise<CreditsGetDetailsResponse>;
}
interface IDiscover {
    movieDiscover: (params?: DiscoverMovieDiscoverParams) => Promise<DiscoverMovieDiscoverResponse>;
    tvDiscover: (params?: DiscoverTVDiscoverParams) => Promise<DiscoverTVDiscoverResponse>;
}
interface IFind {
    findById: (externalId: string, params: FindFindByIdParams) => Promise<FindFindByIdResponse>;
}
interface IGenres {
    getMovieList: (params?: GenresGetMovieListParams) => Promise<GenresGetMovieListResponse>;
    getTVList: (params?: GenresGetTVListParams) => Promise<GenresGetTVListResponse>;
}
interface IGuestSessions {
    getRatedMovies: (guestSessionId: string, params?: GuestSessionsGetRatedMoviesParams) => Promise<GuestSessionsGetRatedMoviesResponse>;
    getRatedTVShows: (guestSessionId: string, params?: GuestSessionsGetRatedTVShowsParams) => Promise<GuestSessionsGetRatedTVShowsResponse>;
    getRatedTVEpisodes: (guestSessionId: string, params?: GuestSessionsGetRatedTVEpisodesParams) => Promise<GuestSessionsGetRatedTVEpisodesResponse>;
}
interface IKeywords {
    getDetails: (keywordId: number) => Promise<KeywordsGetDetailsResponse>;
    getMovies: (keywordId: number, params?: KeywordsGetMoviesParams) => Promise<KeywordsGetMoviesResponse>;
}
interface ILists {
    getDetails: (listId: string, params?: ListsGetDetailsParams) => Promise<ListsGetDetailsResponse>;
    checkItemStatus: (listId: string, params: ListsCheckItemStatusParams) => Promise<ListsCheckItemStatusResponse>;
    createList: (body: ListsCreateListBody, params: ListsCreateListParams) => Promise<ListsCreateListResponse>;
    addMovie: (listId: string, body: ListsAddMovieBody, params: ListsAddMovieParams) => Promise<ListsAddMovieResponse>;
    removeMovie: (listId: string, body: ListsRemoveMovieBody, params: ListsRemoveMovieParams) => Promise<ListsRemoveMovieResponse>;
    clearList: (listId: string, params: ListsClearListParams) => Promise<ListsClearListResponse>;
    deleteList: (listId: string, params: ListsDeleteListParams) => Promise<ListsDeleteListResponse>;
}
interface IMovies {
    getDetails: <T extends MoviesAppendToResponse[]>(movieId: number, params?: MoviesGetDetailsParams<T>) => Promise<MoviesGetDetailsResponse<T>>;
    getAccountStates: (movieId: number, params: MoviesGetAccountStatesParams) => Promise<MoviesGetAccountStatesResponse>;
    getAlternativeTitles: (movieId: number, params?: MoviesGetAlternativeTitlesParams) => Promise<MoviesGetAlternativeTitlesResponse>;
    getChanges: (movieId: number, params?: MoviesGetChangesParams) => Promise<MoviesGetChangesResponse>;
    getCredits: (movieId: number, params?: MoviesGetCreditsParams) => Promise<MoviesGetCreditsResponse>;
    getExternalIds: (movieId: number) => Promise<MoviesGetExternalIdsResponse>;
    getImages: (movieId: number, params?: MoviesGetImagesParams) => Promise<MoviesGetImagesResponse>;
    getKeywords: (movieId: number) => Promise<MoviesGetKeywordsResponse>;
    getLists: (movieId: number, params?: MoviesGetListsParams) => Promise<MoviesGetListsResponse>;
    getRecommendations: (movieId: number, params?: MoviesGetRecommendationsParams) => Promise<MoviesGetRecommendationsResponse>;
    getReleaseDates: (movieId: number) => Promise<MoviesGetReleaseDatesResponse>;
    getReviews: (movieId: number, params?: MoviesGetReviewsParams) => Promise<MoviesGetReviewsResponse>;
    getSimilarMovies: (movieId: number, params?: MoviesGetSimilarMoviesParams) => Promise<MoviesGetSimilarMoviesResponse>;
    getTranslations: (movieId: number) => Promise<MoviesGetTranslationsResponse>;
    getVideos: (movieId: number, params?: MoviesGetVideosParams) => Promise<MoviesGetVideosResponse>;
    getWatchProviders: (movieId: number) => Promise<MoviesGetWatchProvidersResponse>;
    rateMovie: (movieId: number, body: MoviesRateMovieBody, params?: MoviesRateMovieParams) => Promise<MoviesRateMovieResponse>;
    deleteRating: (movieId: number, params?: MoviesDeleteRatingParams) => Promise<MoviesDeleteRatingResponse>;
    getLatest: () => Promise<MoviesGetLatestResponse>;
    getNowPlaying: (params?: MoviesGetNowPlayingParams) => Promise<MoviesGetNowPlayingResponse>;
    getPopular: (params?: MoviesGetPopularParams) => Promise<MoviesGetPopularResponse>;
    getTopRated: (params?: MoviesGetTopRatedParams) => Promise<MoviesGetTopRatedResponse>;
    getUpcoming: (params?: MoviesGetUpcomingParams) => Promise<MoviesGetUpcomingResponse>;
}
interface INetworks {
    getDetails: (networkId: number) => Promise<NetworksGetDetailsResponse>;
    getAlternativeNames: (networkId: number) => Promise<NetworksGetAlternativeNamesResponse>;
    getImages: (networkId: number) => Promise<NetworksGetImagesResponse>;
}
interface ITrending {
    getTrending: (mediaType: TrendingGetTrendingParams["media_type"], timeWindow: TrendingGetTrendingParams["time_window"], language?: TrendingGetTrendingParams["language"]) => Promise<TrendingGetTrendingResponse>;
}
interface IPeople {
    getDetails: <T extends PeopleAppendToResponse[]>(personId: number, params?: PeopleGetDetailsParams<T>) => Promise<PeopleGetDetailsResponse<T>>;
    getChanges: (personId: number, params?: PeopleGetChangesParams) => Promise<PeopleGetChangesResponse>;
    getMovieCredits: (personId: number, params?: PeopleGetMovieCreditsParams) => Promise<PeopleGetMovieCreditsResponse>;
    getTVCredits: (personId: number, params?: PeopleGetTvCreditsParams) => Promise<PeopleGetTvCreditsResponse>;
    getCombinedCredits: (personId: number, params?: PeopleGetCombinedCreditsParams) => Promise<PeopleGetCombinedCreditsResponse>;
    getExternalIds: (personId: number) => Promise<PeopleGetExternalIdsResponse>;
    getImages: (personId: number) => Promise<PeopleGetImagesResponse>;
    getTaggedImages: (personId: number, params?: PeopleGetTaggedImagesParams) => Promise<PeopleGetTaggedImagesResponse>;
    getTranslations: (personId: number, params?: PeopleGetTranslationsParams) => Promise<PeopleGetTranslationsResponse>;
    getLatest: (params?: PeopleGetLatestParams) => Promise<PeopleGetLatestResponse>;
    getPopular: (params?: PeopleGetPopularParams) => Promise<PeopleGetPopularResponse>;
}
interface IReviews {
    getDetails: (reviewId: string) => Promise<ReviewsGetDetailsResponse>;
}
interface ISearch {
    searchCompanies: (params: SearchCompaniesParams) => Promise<SearchCompaniesResponse>;
    searchCollections: (params: SearchCollectionsParams) => Promise<SearchCollectionsResponse>;
    searchKeywords: (params: SearchKeywordsParams) => Promise<SearchKeywordsResponse>;
    searchMovies: (params: SearchMoviesParams) => Promise<SearchMoviesResponse>;
    searchMulti: (params: SearchMultiSearchParams) => Promise<SearchMultiSearchResponse>;
    searchPeople: (params: SearchPeopleParams) => Promise<SearchPeopleResponse>;
    searchTV: (params: SearchTVShowsParams) => Promise<SearchTVShowsResponse>;
}
interface ITV {
    getDetails: <T extends TVAppendToResponse[]>(tvId: number, params?: TVGetDetailsParams<T>) => Promise<TVGetDetailsResponse<T>>;
    getAccountStates: (tvId: number, params?: TVGetAccountStatesParams) => Promise<TVGetAccountStatesResponse>;
    getAggregateCredits: (tvId: number, params?: TVGetAggregateCreditsParams) => Promise<TVGetAggregateCreditsResponse>;
    getAlternativeTitles: (tvId: number, params?: TVGetAlternativeTitlesParams) => Promise<TVGetAlternativeTitlesResponse>;
    getChanges: (tvId: number, params?: TVGetChangesParams) => Promise<TVGetChangesResponse>;
    getContentRatings: (tvId: number, params?: TVGetContentRatingsParams) => Promise<TVGetContentRatingsResponse>;
    getCredits: (tvId: number, params?: TVGetCreditsParams) => Promise<TVGetCreditsResponse>;
    getEpisodeGroups: (tvId: number, params?: TVGetEpisodeGroupsParams) => Promise<TVGetEpisodeGroupsResponse>;
    getExternalIds: (tvId: number, params?: TVGetExternalIdsParams) => Promise<TVGetExternalIdsResponse>;
    getImages: (tvId: number, params?: TVGetImagesParams) => Promise<TVGetImagesResponse>;
    getKeywords: (tvId: number) => Promise<TVGetKeywordsResponse>;
    getRecommendations: (tvId: number, params?: TVGetRecommendationsParams) => Promise<TVGetRecommendationsResponse>;
    getReviews: (tvId: number, params?: TVGetReviewsParams) => Promise<TVGetReviewsResponse>;
    getScreenedTheatrically: (tvId: number, params?: TVGetScreenedTheatricallyParams) => Promise<TVGetScreenedTheatricallyResponse>;
    getSimilarTVShows: (tvId: number, params?: TVGetSimilarTVShowsParams) => Promise<TVGetSimilarTVShowsResponse>;
    getTranslations: (tvId: number) => Promise<TVGetTranslationsResponse>;
    getVideos: (tvId: number, params?: TVGetVideosParams) => Promise<TVGetVideosResponse>;
    getWatchProviders: (tvId: number) => Promise<TVGetWatchProvidersResponse>;
    rateTVShow: (tvId: number, body: TVRateTVShowsBody, params?: TVRateTVShowsParams) => Promise<TVRateTVShowsResponse>;
    deleteRating: (tvId: number, params?: TVDeleteRatingParams) => Promise<TVEpisodesDeleteRatingResponse>;
    getLatest: (params?: TVGetLatestParams) => Promise<TVGetLatestResponse>;
    getTVAiringToday: (params?: TVGetTVAiringTodayParams) => Promise<TVGetTVAiringTodayResponse>;
    getTVOnTheAir: (params?: TVGetTVOnTheAirParams) => Promise<TVGetTVOnTheAirResponse>;
    getPopular: (params?: TVGetPopularParams) => Promise<TVGetPopularResponse>;
    getTopRated: (params?: TVGetTopRatedParams) => Promise<TVGetTopRatedResponse>;
}
interface ITVSeasons {
    getDetails: <T extends TVSeasonsAppendToResponse[]>(tvId: number, seasonNumber: number, params?: TVSeasonsGetDetailsParams<T>) => Promise<TVSeasonsGetDetailsResponse<T>>;
    getAccountStates: (tvId: number, seasonNumber: number, params?: TVSeasonsGetAccountStatesParams) => Promise<TVSeasonsGetAccountStatesResponse>;
    getAggregateCredits: (tvId: number, seasonNumber: number, params?: TVSeasonsGetAggregateCreditsParams) => Promise<TVSeasonsGetAggregateCreditsResponse>;
    getChanges: (tvId: number, seasonNumber: number, params?: TVSeasonsGetChangesParams) => Promise<TVSeasonsGetChangesResponse>;
    getCredits: (tvId: number, seasonNumber: number, params?: TVSeasonsGetCreditsParams) => Promise<TVSeasonsGetCreditsResponse>;
    getExternalIds: (tvId: number, seasonNumber: number, params?: TVSeasonsGetExternalIDsParams) => Promise<TVSeasonsGetExternalIDsResponse>;
    getImages: (tvId: number, seasonNumber: number, params?: TVSeasonsGetImagesParams) => Promise<TVSeasonsGetImagesResponse>;
    getTranslations: (tvId: number, seasonNumber: number) => Promise<TVSeasonsGetTranslationsResponse>;
    getVideos: (tvId: number, seasonNumber: number, params?: TVSeasonsGetVideosParams) => Promise<TVSeasonsGetVideosResponse>;
}
interface ITVEpisodes {
    getDetails: <T extends TVEpisodesAppendToResponse[]>(tvId: number, seasonNumber: number, episodeNumber: number, params?: TVEpisodesGetDetailsParams<T>) => Promise<TVEpisodesGetDetailsResponse<T>>;
    getAccountStates: (tvId: number, seasonNumber: number, episodeNumber: number, params?: TVEpisodesGetAccountStatesParams) => Promise<TVEpisodesGetAccountStatesResponse>;
    getChanges: (tvId: number, seasonNumber: number, episodeNumber: number, params?: TVEpisodesGetChangesParams) => Promise<TVEpisodesGetChangesResponse>;
    getCredits: (tvId: number, seasonNumber: number, episodeNumber: number, params?: TVEpisodesGetCreditsParams) => Promise<TVEpisodesGetCreditsResponse>;
    getExternalIds: (tvId: number, seasonNumber: number, episodeNumber: number) => Promise<TVEpisodesGetExternalIDsResponse>;
    getImages: (tvId: number, seasonNumber: number, episodeNumber: number) => Promise<TVEpisodesGetImagesResponse>;
    getTranslations: (tvId: number, seasonNumber: number, episodeNumber: number) => Promise<TVEpisodesGetTranslationsResponse>;
    rateTVEpisode: (tvId: number, seasonNumber: number, episodeNumber: number, body: TVEpisodesRateTVEpisodeBody, params?: TVEpisodesRateTVEpisodeParams) => Promise<TVEpisodesRateTVEpisodeResponse>;
    deleteRating: (tvId: number, seasonNumber: number, episodeNumber: number, params?: TVEpisodesDeleteRatingParams) => Promise<TVEpisodesDeleteRatingResponse>;
    getVideos: (tvId: number, seasonNumber: number, episodeNumber: number, params?: TVEpisodesGetVideosParams) => Promise<TVEpisodesGetVideosResponse>;
}
interface ITVEpisodeGroups {
    getDetails: (id?: string, params?: TVEpisodeGroupsGetDetailsParams) => Promise<TVEpisodeGroupsGetDetailsResponse>;
}
interface IWatchProviders {
    getAvailableRegions: (params?: WatchProvidersGetAvailableRegionsParams) => Promise<WatchProvidersGetAvailableRegionsResponse>;
    getMovieProviders: (params?: WatchProvidersGetMovieProvidersParams) => Promise<WatchProvidersGetMovieProvidersResponse>;
    getTVProviders: (params?: WatchProvidersGetTVProvidersParams) => Promise<WatchProvidersGetTVProvidersResponse>;
}
interface V4IAccount {
    getLists: (accountId: string, params?: V4AccountGetListsParams) => Promise<V4AccountGetListsResponse>;
    getFavoriteMovies: (accountId: string, params?: V4AccountGetFavoriteMoviesParams) => Promise<V4AccountGetFavoriteMoviesResponse>;
    getFavoriteTVShows: (accountId: string, params?: V4AccountGetFavoriteTVShowsParams) => Promise<V4AccountGetFavoriteTVShowsResponse>;
    getMovieRecommendations: (accountId: string, params?: V4AccountGetMovieRecommendationsParams) => Promise<V4AccountGetMovieRecommendationsResponse>;
    getTVShowRecommendations: (accountId: string, params?: V4AccountGetTVShowRecommendationsParams) => Promise<V4AccountGetTVShowRecommendationsResponse>;
    getMovieWatchlist: (accountId: string, params?: V4AccountGetMovieWatchlistParams) => Promise<V4AccountGetMovieWatchlistResponse>;
    getTVShowWatchlist: (accountId: string, params?: V4AccountGetTVShowWatchlistParams) => Promise<V4AccountGetTVShowWatchlistResponse>;
    getRatedMovies: (accountId: string, params?: V4AccountGetRatedMoviesParams) => Promise<V4AccountGetRatedMoviesResponse>;
    getRatedTVShows: (accountId: string, params?: V4AccountGetRatedTVShowsParams) => Promise<V4AccountGetRatedTVShowsResponse>;
}
interface V4IAuth {
    createRequestToken: (body?: V4AuthCreateRequestTokenBody) => Promise<V4AuthCreateRequestTokenResponse>;
    createAccessToken: (body: V4AuthCreateAccessTokenBody) => Promise<V4AuthCreateAccessTokenResponse>;
    deleteAccessToken: (body: V4AuthDeleteAccessTokenBody) => Promise<V4AuthDeleteAccessTokenResponse>;
}
interface V4IList {
    getList: (params?: V4ListGetListParams, listId?: string) => Promise<V4ListGetListResponse>;
    createList: (body: V4ListCreateListBody) => Promise<V4ListCreateListResponse>;
    updateList: (body: V4ListUpdateListBody, listId?: string) => Promise<V4ListUpdateListResponse>;
    clearList: (listId?: string) => Promise<V4ListClearListResponse>;
    deleteList: (listId?: string) => Promise<V4ListDeleteListResponse>;
    addItems: (body: V4ListAddItemsBody, listId?: string) => Promise<V4ListAddItemsResponse>;
    updateItems: (body: V4ListUpdateItemsBody, listId?: string) => Promise<V4ListUpdateItemsResponse>;
    removeItems: (body: V4ListRemoveItemsBody, listId?: string) => Promise<V4ListRemoveItemsResponse>;
    checkItemStatus: (params: V4ListCheckItemStatusParams, listId?: string) => Promise<V4ListCheckItemStatusResponse>;
}
interface ITMDBAPI {
    v3: {
        account: IAccount;
        authentication: IAuthentication;
        certifications: ICertifications;
        changes: IChanges;
        collections: ICollections;
        companies: ICompanies;
        configuration: IConfiguration;
        credits: ICredits;
        discover: IDiscover;
        find: IFind;
        genres: IGenres;
        guestSessions: IGuestSessions;
        keywords: IKeywords;
        lists: ILists;
        movies: IMovies;
        networks: INetworks;
        trending: ITrending;
        people: IPeople;
        reviews: IReviews;
        search: ISearch;
        tv: ITV;
        tvSeasons: ITVSeasons;
        tvEpisodes: ITVEpisodes;
        tvEpisodeGroups: ITVEpisodeGroups;
        watchProviders: IWatchProviders;
    };
    v4: {
        account: V4IAccount;
        auth: V4IAuth;
        list: V4IList;
    };
}
interface Http {
    get<TResponse>(url: string, accessToken?: string): Promise<TResponse>;
    post<TResponse, TBody = undefined>(url: string, body?: TBody, accessToken?: string): Promise<TResponse>;
    put<TResponse, TBody>(url: string, body: TBody, accessToken?: string): Promise<TResponse>;
    delete<TResponse, TBody = undefined>(url: string, body?: TBody, accessToken?: string): Promise<TResponse>;
}
declare class TMDBAPI implements ITMDBAPI {
    private v3Url;
    private v4Url;
    v3: ITMDBAPI["v3"];
    v4: ITMDBAPI["v4"];
    private client;
    private apiKey;
    private accessToken?;
    setApiKey(apiKey: string): void;
    setAccessToken(accessToken: string): void;
    constructor(client: Http, apiKey: string, accessToken?: string);
}

declare class TMDBWebAPI extends TMDBAPI implements ITMDBAPI {
    constructor(apiKey: string, accessToken?: string);
}

export { AccountAddToWatchlistBody, AccountAddToWatchlistParams, AccountAddToWatchlistResponse, AccountGetCreatedListsParams, AccountGetCreatedListsResponse, AccountGetDetailsAvatar, AccountGetDetailsGravatar, AccountGetDetailsParams, AccountGetDetailsResponse, AccountGetFavoriteMoviesParams, AccountGetFavoriteMoviesResponse, AccountGetFavoriteMoviesResult, AccountGetFavoriteTVShowsParams, AccountGetFavoriteTVShowsResponse, AccountGetFavoriteTVShowsResult, AccountGetMovieWatchlistParams, AccountGetMovieWatchlistResponse, AccountGetMovieWatchlistResult, AccountGetRatedMoviesParams, AccountGetRatedMoviesResponse, AccountGetRatedMoviesResult, AccountGetRatedTVEpisodesParams, AccountGetRatedTVEpisodesResponse, AccountGetRatedTVEpisodesResult, AccountGetRatedTVShowsParams, AccountGetRatedTVShowsResponse, AccountGetRatedTVShowsResult, AccountGetTVShowWatchlistParams, AccountGetTVShowWatchlistResponse, AccountGetTVShowWatchlistResult, AccountMarkAsFavoriteBody, AccountMarkAsFavoriteParams, AccountMarkAsFavoriteResponse, AppendToResponseType, AuthenticationCreateGuestSessionResponse, AuthenticationCreateRequestTokenResponse, AuthenticationCreateSessionBody, AuthenticationCreateSessionFromV4AccessTokenBody, AuthenticationCreateSessionFromV4AccessTokenResponse, AuthenticationCreateSessionResponse, AuthenticationCreateSessionWithLoginBody, AuthenticationCreateSessionWithLoginResponse, AuthenticationDeleteSessionBody, AuthenticationDeleteSessionResponse, BelongsToConnection, Certification, Certifications, CertificationsGetMovieCertificationResponse, CertificationsGetTVCertificationResponse, ChangesGetMovieChangeListParams, ChangesGetMovieChangeListResponse, ChangesGetMovieChangeListResult, ChangesGetPersonChangeListParams, ChangesGetPersonChangeListResponse, ChangesGetPersonChangeListResult, ChangesGetTVChangeListParams, ChangesGetTVChangeListResponse, ChangesGetTVChangeListResult, CollectionsGetDetailsParams, CollectionsGetDetailsPart, CollectionsGetDetailsResponse, CollectionsGetImagesBackdrop, CollectionsGetImagesParams, CollectionsGetImagesResponse, CollectionsGetTranslationsData, CollectionsGetTranslationsParams, CollectionsGetTranslationsResponse, CollectionsGetTranslationsTranslation, CompaniesGetAlternativeNamesResponse, CompaniesGetAlternativeNamesResult, CompaniesGetDetailsResponse, CompaniesGetImagesLogo, CompaniesGetImagesResponse, ConfigurationGetApiConfigurationImages, ConfigurationGetApiConfigurationResponse, ConfigurationGetCountriesResponse, ConfigurationGetCountriesResult, ConfigurationGetJobsResponse, ConfigurationGetJobsResult, ConfigurationGetLanguagesResponse, ConfigurationGetLanguagesResult, ConfigurationGetPrimaryTranslationsResponse, ConfigurationGetTimezonesResponse, ConfigurationGetTimezonesResult, CreditsGetDetailsMedia, CreditsGetDetailsPerson, CreditsGetDetailsResponse, CreditsGetDetailsSeason, DiscoverMovieDiscoverParams, DiscoverMovieDiscoverResponse, DiscoverMovieDiscoverResult, DiscoverTVDiscoverParams, DiscoverTVDiscoverResponse, DiscoverTVDiscoverResult, FindFindByIdMovieResult, FindFindByIdParams, FindFindByIdPersonResult, FindFindByIdPersonResultKnownForMovie, FindFindByIdPersonResultKnownForTV, FindFindByIdResponse, FindFindByIdTvEpisodeResult, FindFindByIdTvResult, FindFindByIdTvSeasonResult, GenresGetMovieListGenre, GenresGetMovieListParams, GenresGetMovieListResponse, GenresGetTVListGenre, GenresGetTVListParams, GenresGetTVListResponse, GuestSessionsGetRatedMoviesParams, GuestSessionsGetRatedMoviesResponse, GuestSessionsGetRatedMoviesResult, GuestSessionsGetRatedTVEpisodesParams, GuestSessionsGetRatedTVEpisodesResponse, GuestSessionsGetRatedTVEpisodesResult, GuestSessionsGetRatedTVShowsParams, GuestSessionsGetRatedTVShowsResponse, GuestSessionsGetRatedTVShowsResult, Http, ITMDBAPI, KeywordsGetDetailsResponse, KeywordsGetMoviesParams, KeywordsGetMoviesResponse, KeywordsGetMoviesResult, ListsAddMovieBody, ListsAddMovieParams, ListsAddMovieResponse, ListsCheckItemStatusParams, ListsCheckItemStatusResponse, ListsClearListParams, ListsClearListResponse, ListsCreateListBody, ListsCreateListParams, ListsCreateListResponse, ListsDeleteListParams, ListsDeleteListResponse, ListsGetDetailsItem, ListsGetDetailsParams, ListsGetDetailsResponse, ListsRemoveMovieBody, ListsRemoveMovieParams, ListsRemoveMovieResponse, MoviesAppendToResponse, MoviesAppendToResponseTypes, MoviesDeleteRatingParams, MoviesDeleteRatingResponse, MoviesGetAccountStatesParams, MoviesGetAccountStatesResponse, MoviesGetAlternativeTitlesParams, MoviesGetAlternativeTitlesResponse, MoviesGetAlternativeTitlesTitle, MoviesGetChangesChange, MoviesGetChangesItem, MoviesGetChangesParams, MoviesGetChangesResponse, MoviesGetCreditsCast, MoviesGetCreditsParams, MoviesGetCreditsResponse, MoviesGetDetailsBaseResponse, MoviesGetDetailsGenre, MoviesGetDetailsParams, MoviesGetDetailsProductionCompany, MoviesGetDetailsProductionCountry, MoviesGetDetailsResponse, MoviesGetDetailsSpokenLanguage, MoviesGetExternalIdsResponse, MoviesGetImagesBackdrop, MoviesGetImagesParams, MoviesGetImagesResponse, MoviesGetKeywordsKeyword, MoviesGetKeywordsResponse, MoviesGetLatestGenre, MoviesGetLatestParams, MoviesGetLatestResponse, MoviesGetListsParams, MoviesGetListsResponse, MoviesGetListsResult, MoviesGetNowPlayingDates, MoviesGetNowPlayingParams, MoviesGetNowPlayingResponse, MoviesGetNowPlayingResult, MoviesGetPopularParams, MoviesGetPopularResponse, MoviesGetPopularResult, MoviesGetRecommendationsParams, MoviesGetRecommendationsResponse, MoviesGetRecommendationsResult, MoviesGetReleaseDatesReleaseDate, MoviesGetReleaseDatesResponse, MoviesGetReleaseDatesResult, MoviesGetReviewsAuthorDetails, MoviesGetReviewsParams, MoviesGetReviewsResponse, MoviesGetReviewsResult, MoviesGetSimilarMoviesParams, MoviesGetSimilarMoviesResponse, MoviesGetSimilarMoviesResult, MoviesGetTopRatedParams, MoviesGetTopRatedResponse, MoviesGetTopRatedResult, MoviesGetTranslationsData, MoviesGetTranslationsResponse, MoviesGetTranslationsTranslation, MoviesGetUpcomingParams, MoviesGetUpcomingResponse, MoviesGetUpcomingResult, MoviesGetVideosParams, MoviesGetVideosResponse, MoviesGetVideosResult, MoviesGetWatchProvidersAr, MoviesGetWatchProvidersBuy, MoviesGetWatchProvidersResponse, MoviesGetWatchProvidersResults, MoviesGetWatchProvidersRo, MoviesRateMovieBody, MoviesRateMovieParams, MoviesRateMovieResponse, NetworksGetAlternativeNamesResponse, NetworksGetAlternativeNamesResult, NetworksGetDetailsResponse, NetworksGetImagesLogo, NetworksGetImagesResponse, PeopleAppendToResponse, PeopleAppendToResponseTypes, PeopleGetChangesChange, PeopleGetChangesItem, PeopleGetChangesOriginalValue, PeopleGetChangesParams, PeopleGetChangesProfile, PeopleGetChangesResponse, PeopleGetCombinedCreditsCast, PeopleGetCombinedCreditsParams, PeopleGetCombinedCreditsResponse, PeopleGetDetailsBaseResponse, PeopleGetDetailsParams, PeopleGetDetailsResponse, PeopleGetExternalIdsParams, PeopleGetExternalIdsResponse, PeopleGetImagesProfile, PeopleGetImagesResponse, PeopleGetLatestParams, PeopleGetLatestResponse, PeopleGetMovieCreditsCast, PeopleGetMovieCreditsParams, PeopleGetMovieCreditsResponse, PeopleGetPopularKnownFor, PeopleGetPopularParams, PeopleGetPopularResponse, PeopleGetPopularResult, PeopleGetTaggedImagesMedia, PeopleGetTaggedImagesParams, PeopleGetTaggedImagesResponse, PeopleGetTaggedImagesResult, PeopleGetTranslationsData, PeopleGetTranslationsParams, PeopleGetTranslationsResponse, PeopleGetTranslationsTranslation, PeopleGetTvCreditsCast, PeopleGetTvCreditsParams, PeopleGetTvCreditsResponse, Result, ReviewsGetDetailsAuthorDetails, ReviewsGetDetailsResponse, SearchCollectionsParams, SearchCollectionsResponse, SearchCollectionsResult, SearchCompaniesParams, SearchCompaniesResponse, SearchCompaniesResult, SearchKeywordsParams, SearchKeywordsResponse, SearchKeywordsResult, SearchMoviesParams, SearchMoviesResponse, SearchMoviesResult, SearchMultiSearchParams, SearchMultiSearchResponse, SearchMultiSearchResult, SearchPeopleKnownFor, SearchPeopleParams, SearchPeopleResponse, SearchPeopleResult, SearchTVShowsParams, SearchTVShowsResponse, SearchTVShowsResult, TMDBApiError, TMDBWebAPI, TVAppendToResponse, TVAppendToResponseTypes, TVDeleteRatingParams, TVDeleteRatingResponse, TVEpisodeGroupsGetDetailsEpisode, TVEpisodeGroupsGetDetailsGroup, TVEpisodeGroupsGetDetailsNetwork, TVEpisodeGroupsGetDetailsParams, TVEpisodeGroupsGetDetailsResponse, TVEpisodesAppendToResponse, TVEpisodesAppendToResponseTypes, TVEpisodesDeleteRatingParams, TVEpisodesDeleteRatingResponse, TVEpisodesGetAccountStatesParams, TVEpisodesGetAccountStatesRatedClass, TVEpisodesGetAccountStatesResponse, TVEpisodesGetChangesChange, TVEpisodesGetChangesItem, TVEpisodesGetChangesParams, TVEpisodesGetChangesResponse, TVEpisodesGetCreditsCast, TVEpisodesGetCreditsParams, TVEpisodesGetCreditsResponse, TVEpisodesGetDetailsBaseResponse, TVEpisodesGetDetailsCrew, TVEpisodesGetDetailsGuestStar, TVEpisodesGetDetailsParams, TVEpisodesGetDetailsResponse, TVEpisodesGetExternalIDsResponse, TVEpisodesGetImagesResponse, TVEpisodesGetImagesStill, TVEpisodesGetTranslationsData, TVEpisodesGetTranslationsResponse, TVEpisodesGetTranslationsTranslation, TVEpisodesGetVideosParams, TVEpisodesGetVideosResponse, TVEpisodesGetVideosResult, TVEpisodesRateTVEpisodeBody, TVEpisodesRateTVEpisodeParams, TVEpisodesRateTVEpisodeResponse, TVGetAccountStatesParams, TVGetAccountStatesResponse, TVGetAggregateCreditsCast, TVGetAggregateCreditsParams, TVGetAggregateCreditsResponse, TVGetAggregateCreditsRole, TVGetAlternativeTitlesParams, TVGetAlternativeTitlesResponse, TVGetAlternativeTitlesResult, TVGetChangesChange, TVGetChangesItem, TVGetChangesOriginalValueClass, TVGetChangesParams, TVGetChangesPoster, TVGetChangesResponse, TVGetChangesValueClass, TVGetContentRatingsParams, TVGetContentRatingsResponse, TVGetContentRatingsResult, TVGetCreditsCast, TVGetCreditsParams, TVGetCreditsResponse, TVGetDetailsBaseResponse, TVGetDetailsCreatedBy, TVGetDetailsGenre, TVGetDetailsLastEpisodeToAir, TVGetDetailsNetwork, TVGetDetailsParams, TVGetDetailsProductionCountry, TVGetDetailsResponse, TVGetDetailsSeason, TVGetDetailsSpokenLanguage, TVGetEpisodeGroupsNetwork, TVGetEpisodeGroupsParams, TVGetEpisodeGroupsResponse, TVGetEpisodeGroupsResult, TVGetExternalIdsParams, TVGetExternalIdsResponse, TVGetImagesBackdrop, TVGetImagesParams, TVGetImagesResponse, TVGetKeywordsResponse, TVGetKeywordsResult, TVGetLatestGenre, TVGetLatestParams, TVGetLatestResponse, TVGetLatestSeason, TVGetPopularParams, TVGetPopularResponse, TVGetPopularResult, TVGetRecommendationsParams, TVGetRecommendationsResponse, TVGetRecommendationsResult, TVGetReviewsAuthorDetails, TVGetReviewsParams, TVGetReviewsResponse, TVGetReviewsResult, TVGetScreenedTheatricallyParams, TVGetScreenedTheatricallyResponse, TVGetScreenedTheatricallyResult, TVGetSimilarTVShowsParams, TVGetSimilarTVShowsResponse, TVGetSimilarTVShowsResult, TVGetTVAiringTodayParams, TVGetTVAiringTodayResponse, TVGetTVAiringTodayResult, TVGetTVOnTheAirParams, TVGetTVOnTheAirResponse, TVGetTVOnTheAirResult, TVGetTopRatedParams, TVGetTopRatedResponse, TVGetTopRatedResult, TVGetTranslationsData, TVGetTranslationsResponse, TVGetTranslationsTranslation, TVGetVideosParams, TVGetVideosResponse, TVGetVideosResult, TVGetWatchProvidersAr, TVGetWatchProvidersAt, TVGetWatchProvidersFlatrate, TVGetWatchProvidersResponse, TVGetWatchProvidersResults, TVGetWatchProvidersRu, TVRateTVShowsBody, TVRateTVShowsParams, TVRateTVShowsResponse, TVSeasonsAppendToResponse, TVSeasonsAppendToResponseTypes, TVSeasonsGetAccountStatesParams, TVSeasonsGetAccountStatesRatedClass, TVSeasonsGetAccountStatesResponse, TVSeasonsGetAccountStatesResult, TVSeasonsGetAggregateCreditsCast, TVSeasonsGetAggregateCreditsJob, TVSeasonsGetAggregateCreditsParams, TVSeasonsGetAggregateCreditsResponse, TVSeasonsGetAggregateCreditsRole, TVSeasonsGetChangesChange, TVSeasonsGetChangesItem, TVSeasonsGetChangesParams, TVSeasonsGetChangesResponse, TVSeasonsGetChangesValueClass, TVSeasonsGetCreditsCast, TVSeasonsGetCreditsParams, TVSeasonsGetCreditsResponse, TVSeasonsGetDetailsBaseResponse, TVSeasonsGetDetailsCrew, TVSeasonsGetDetailsEpisode, TVSeasonsGetDetailsParams, TVSeasonsGetDetailsResponse, TVSeasonsGetExternalIDsParams, TVSeasonsGetExternalIDsResponse, TVSeasonsGetImagesParams, TVSeasonsGetImagesPoster, TVSeasonsGetImagesResponse, TVSeasonsGetTranslationsData, TVSeasonsGetTranslationsParams, TVSeasonsGetTranslationsResponse, TVSeasonsGetTranslationsTranslation, TVSeasonsGetVideosParams, TVSeasonsGetVideosResponse, TVSeasonsGetVideosResult, TrendingGetTrendingParams, TrendingGetTrendingResponse, TrendingGetTrendingResult, V4AccountGetFavoriteMoviesParams, V4AccountGetFavoriteMoviesResponse, V4AccountGetFavoriteMoviesResult, V4AccountGetFavoriteTVShowsParams, V4AccountGetFavoriteTVShowsResponse, V4AccountGetFavoriteTVShowsResult, V4AccountGetListsParams, V4AccountGetListsResponse, V4AccountGetListsResult, V4AccountGetMovieRecommendationsParams, V4AccountGetMovieRecommendationsResponse, V4AccountGetMovieRecommendationsResult, V4AccountGetMovieWatchlistParams, V4AccountGetMovieWatchlistResponse, V4AccountGetMovieWatchlistResult, V4AccountGetRatedMoviesAccountRating, V4AccountGetRatedMoviesParams, V4AccountGetRatedMoviesResponse, V4AccountGetRatedMoviesResult, V4AccountGetRatedTVShowsAccountRating, V4AccountGetRatedTVShowsParams, V4AccountGetRatedTVShowsResponse, V4AccountGetRatedTVShowsResult, V4AccountGetTVShowRecommendationsParams, V4AccountGetTVShowRecommendationsResponse, V4AccountGetTVShowRecommendationsResult, V4AccountGetTVShowWatchlistParams, V4AccountGetTVShowWatchlistResponse, V4AccountGetTVShowWatchlistResult, V4AuthCreateAccessTokenBody, V4AuthCreateAccessTokenResponse, V4AuthCreateRequestTokenBody, V4AuthCreateRequestTokenResponse, V4AuthDeleteAccessTokenBody, V4AuthDeleteAccessTokenResponse, V4IAccount, V4IAuth, V4IList, V4ListAddItemsBody, V4ListAddItemsItem, V4ListAddItemsResponse, V4ListAddItemsResult, V4ListCheckItemStatusParams, V4ListCheckItemStatusResponse, V4ListClearListResponse, V4ListCreateListBody, V4ListCreateListResponse, V4ListDeleteListResponse, V4ListGetListComments, V4ListGetListCreatedBy, V4ListGetListParams, V4ListGetListResponse, V4ListGetListResult, V4ListRemoveItemsBody, V4ListRemoveItemsItem, V4ListRemoveItemsResponse, V4ListRemoveItemsResult, V4ListUpdateItemsBody, V4ListUpdateItemsItem, V4ListUpdateItemsResponse, V4ListUpdateItemsResult, V4ListUpdateListBody, V4ListUpdateListResponse, WatchProvidersGetAvailableRegionsParams, WatchProvidersGetAvailableRegionsResponse, WatchProvidersGetAvailableRegionsResult, WatchProvidersGetMovieProvidersParams, WatchProvidersGetMovieProvidersResponse, WatchProvidersGetMovieProvidersResult, WatchProvidersGetTVProvidersParams, WatchProvidersGetTVProvidersResponse, WatchProvidersGetTVProvidersResult };
