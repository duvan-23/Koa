const faker  = require( '@faker-js/faker');
const {login,faillogin,logout,info,infozip,infodebug,randoms,postOrigen,origen,failregister,register,registerVery,loginVery,deserializeUser,connection,nodefinida,productos,productosinsert,productosdelete,productosupdate} = require("../controlador/controlador.js");
const util = require( 'util');
const dotenv = require( 'dotenv/config');
const Koa = require('koa');
const Router = require('koa-router');
faker.locale = 'es';



const { createServer } = require( "http");

const { Server } = require( "socket.io");
//passport
const passport = require( "passport");
const { Strategy: LocalStrategy } = require('passport-local')
//session
const session = require( 'koa-session')
// --------------------------------------//

//------
const parseArgs = require( 'minimist');

const cluster = require( 'cluster');
const os = require( 'os');
const compression = require('compression');
const logger = require( '../scripts/logger.js');

const router = new Router({
    prefix: '/'
});
function isAuth(ctx, next) {
    if (ctx.request.isAuthenticated()) {
    next()
    } else {
    ctx.redirect('/login')
    }
}
router.get('/register', compression(), async ctx => {
    await register(ctx);
})
router.post('/register', passport.authenticate('register', { failureRedirect: '/failregister', successRedirect: '/'}))

router.get('/failregister', compression(), async ctx => {
    await failregister(ctx);
})

router.get('/', isAuth, compression(), async ctx => {
    await origen(ctx);
})

router.post('/', async ctx => {
    await postOrigen(ctx); 
})

router.get('/login', compression(), async ctx => {
    await login(ctx);
})
router.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin', successRedirect: '/'}))

router.get('/faillogin', compression(), async ctx => {
    await faillogin(ctx);
})

router.get('/logout', compression(), async ctx => {
    await logout(ctx);
})
router.get('/productos', compression(), async ctx => {
    await productos(ctx);
})
router.post('/productos', compression(), async ctx => {
    await productosinsert(ctx);
})
router.delete('/productos', compression(), async ctx => {
    await productosdelete(ctx);
})
router.put('/productos', compression(), async ctx => {
    await productosupdate(ctx);
})



// router.all('*', async ctx => {
//     await nodefinida(ctx);
// })

const routerOps=router;
module.exports={routerOps};