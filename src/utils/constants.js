import { TMDB_ACCESS_TOKEN } from "../env/env";

export const LOGIN_IMAGE_PREFIX =
  "https://img10.hotstar.com/image/upload/f_auto,q_90,w_192/sources/r1/cms/prod/";
export const uniqueParts = [
  "3440/1712744243440-v",
  "4564/1713892604564-v",
  "5239/875239-v",
  "5150/875150-v",
  "6597/1711007636597-v",
  "2484/942484-v",
  "7539/617539-v",
  "5157/875157-v",
  "6597/1711007636597-v",
  "7539/617539-v",
  "4362/184362-v",
  "4898/1514898-v-d2603b9637b5",
  "5180/875180-v",
  "3589/763589-v",
  "5199/875199-v",
  "6699/1026699-v-cb786ee970de",
  "8442/1478442-v-c0f317dcf6a8",
  "4719/994719-v",
  "7539/617539-v",
  "3145/813145-v",
  "4564/1713892604564-v",
  "5239/875239-v",
  "5150/875150-v",
  "6597/1711007636597-v",
  "2484/942484-v",
  "7539/617539-v",
  "5157/875157-v",
  "6597/1711007636597-v",
  "7539/617539-v",
  "4362/184362-v",
];

export const API_PREFIX = "https://api.themoviedb.org/3/movie";
export const API_SEARCH_PREFIX =
  "https://api.themoviedb.org/3/search/movie?query=";

export const LOGO_HEADER =
  "https://img.hotstar.com/image/upload/v1737554969/web-assets/prod/images/rebrand/logo.png";

export const PROFILE_AVATAR =
  "https://xsgames.co/randomusers/avatar.php?g=pixel";

export const GET_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + TMDB_ACCESS_TOKEN,
  },
};

export const MOVIE_DETAILS_PREFIX = "https://api.themoviedb.org/3/movie/";
export const VIDEO_IMAGE_PREFIX = "https://image.tmdb.org/t/p/original";
export const GEMINI_BACKEND_API = "https://stream-mind-backend.vercel.app/";
