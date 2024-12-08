/**
 * Express router paths go here.
 */

export default {
  Base: '/api',
  Auth: {
    Base: '/auth',
    Login: '/login',
    Logout: '/logout',
    Signup: '/signup',
    VerifyEmail: '/verify-email',
    ResendEmail: '/resend-email',
    googleSignup: '/google-signup',
  },
  Users: {
    Base: '/users/user',
    Get: '/all',
    // Add: '/add',
    // Update: '/update',
    // Delete: '/delete/:id',
    UpdateDetails: '/update-details',
    uploadImage: '/upload-image',
    uploadComicsFile: '/upload-comics-file',
    getComicsFileUrl: '/get-comics-file-url',
    getUser: '/get-user',
  },
  Comics: {
    Base: '/comics',
    uploadComic: '/comic/upload',
    uploadToMarketPlace: '/comic/upload-to-market-place',
    allComic: '/all',
    userComics: '/comics/user',
    getComic: '/comic/:id',
    checkComic: '/check-comic',
    uploadComicAsPic: '/upload-comic-as-pic',
    uploadComicAsPdf: '/upload-comic-as-pdf',
    marketPlaceComics: '/market-place',
  },
} as const;
