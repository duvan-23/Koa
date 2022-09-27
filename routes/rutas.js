const faker  = require( '@faker-js/faker');
const {login,faillogin,logout,info,infozip,infodebug,randoms,postOrigen,origen,failregister,register,registerVery,loginVery,deserializeUser,connection,nodefinida,productos,productosinsert,productosdelete,productosupdate} = require("../controlador/controlador.js");
const util = require( 'util');
const dotenv = require( 'dotenv/config')
faker.locale = 'es';



const Router = require('koa-router');


const { createServer } = require( "http");

const { Server } = require( "socket.io");
//passport
const passport = require('koa-passport');
const { Strategy: LocalStrategy } = require('passport-local')
//session
// --------------------------------------//
const MongoStore = require( 'connect-mongo')
//------
const parseArgs = require( 'minimist');

const cluster = require( 'cluster');
const os = require( 'os');
const compression = require('compression');
const logger = require( '../scripts/logger.js');

const app = new Router();

// function isAuth(ctx,next) {
//     if (ctx.isAuthenticated()) {
//         next()
//     } else {
//         ctx.redirect('/login')
//     }
// }
app.get('/register', async(ctx) => {
    await register(ctx);
})

app.post('/register', (ctx)=>{ passport.authenticate('register', { failureRedirect: '/failregister', successRedirect: '/'})(ctx)})


app.get('/failregister', async(ctx) => {
    await failregister(ctx);
})

app.get('/',  async(ctx) => {
    await origen(ctx);
})

app.post('/', async(ctx) => {
    await postOrigen(ctx); 
})

app.get('/login', async(ctx) => {
    await login(ctx);
})
// app.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin', successRedirect: '/'}))
app.post('/login' , async(ctx) => {
    await login(ctx);
})

app.get('/faillogin', async(ctx) => {
    await faillogin(ctx);
})

app.get('/logout', async(ctx) => {
    await logout(ctx);
})
app.get('/productos', async(ctx) => {
    await productos(ctx);
})
app.post('/productos', async(ctx) => {
    await productosinsert(ctx);
})
app.delete('/productos', async(ctx) => {
    await productosdelete(ctx);
})
app.put('/productos', async(ctx) => {
    await productosupdate(ctx);
})



// app.all('*', async(ctx) => {
//     await nodefinida(ctx);
// })

const routerOps=app;
module.exports={routerOps};