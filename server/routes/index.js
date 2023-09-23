const routes = require('express').Router()
const AuthenticateController = require('../controllers/authenticate.controller')
const PeopleController = require('../controllers/people.controller')
const PostController = require('../controllers/post.controller')

/************************** authentication routes ***************************** */
routes.post('/signup', AuthenticateController.signup)
routes.get('/verify/:token', AuthenticateController.verifyToken)
routes.post('/login', AuthenticateController.login)
routes.post('/session', AuthenticateController.validateSession)

/**************************** people routes ********************************** */
routes.get('/people', AuthenticateController.verifyJwt, PeopleController.fetchPeople)
routes.get('/my-people', AuthenticateController.verifyJwt, PeopleController.fetchMyPeople)
routes.post('/follow/:userId', AuthenticateController.verifyJwt, PeopleController.followPeople)
routes.post('/unfollow/:userId', AuthenticateController.verifyJwt, PeopleController.unfollowPeople)

/***************************** post routes *********************************** */
routes.post('/posts', AuthenticateController.verifyJwt, PostController.createPost)
routes.get('/posts', AuthenticateController.verifyJwt, PostController.getPosts)
routes.post('/like/:postId', AuthenticateController.verifyJwt, PostController.likePost)
routes.post('/unlike/:postId', AuthenticateController.verifyJwt, PostController.unlikePost)
routes.post('/comment/:postId', AuthenticateController.verifyJwt, PostController.commentPost)

module.exports = routes