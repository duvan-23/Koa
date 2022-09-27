// const faker  = require( '@faker-js/faker');
const {login,faillogin,logout,info,infozip,infodebug,randoms,postOrigen,origen,failregister,register,registerVery,loginVery,deserializeUser,connection,nodefinida} = require("./controlador/controlador.js");
const util = require( 'util');
const dotenv = require( 'dotenv/config')

const { createServer } = require( "http");

const { Server } = require( "socket.io");
const IO = require( 'koa-socket' )
//passport
// const passport = require( "passport");
const { Strategy: LocalStrategy } = require('passport-local')
//session



//------
const parseArgs = require( 'minimist');

const cluster = require( 'cluster');
const os = require( 'os');
const compression = require('compression');
const logger = require( './scripts/logger.js');
const {routerOps}=require('./routes/rutas.js');

const Koa = require('koa');
const koaBody = require('koa-body');
const alumnosRoutes = require('./routes/alumnos.js');
const koaPug = require('koa-pug-view');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const passport = require('koa-passport');
const app = new Koa();
const httpServer = new createServer()
const io = new Server(httpServer)
// koaPug(app); // default
koaPug(app, 'public/views', false, 'render'); // using listed arguments

app.use(koaBody());



// PASSPORT REGISTER
// passport.use('register', new  LocalStrategy({
//     passReqToCallback: true
// }, async (ctx, username, password, done) => {
//     await registerVery(ctx, username, password, done);
// }))

// //---------------------------------------------------//
// // PASSPORT LOGIN
// passport.use('login', new  LocalStrategy(async(username, password, done) => {
//     await loginVery(username, password, done);
// }))
// // ---------------------------------------------------//
// // SERIALIZAR Y DESERIALIZAR

// passport.serializeUser(function(user, done) {
//     done(null, user.username)
// })

// passport.deserializeUser(async function(username, done) {
//     await deserializeUser(username, done);
// })

app.keys = ['shhhhhhhhhhhhhh']
// app.use(session({}, app));
// app.use(bodyParser())
// app.use(passport.initialize());
// app.use(passport.session());


io.on('connection', async (socket) => {
    console.log("fa");
    await connection(socket,io);
})
// process.on('uncaughtException', function (err) {
//     logger.error(err);
// });
app.use(routerOps.routes());

const PORT =8080;
// httpServer.listen(PORT, err => {
//     if(err){
//         logger.error(err);
//         console.log(err);
//     }else{
//         logger.info('Iniciando en el puerto: ' + PORT+' modo:ff pid:'+process.pid);
//         // console.log('Iniciando en el puerto: ' + PORT+' modo:'+modo+ ' pid:'+process.pid);
//     }
// })
app.listen(PORT, err => {
    if(err){
        logger.error(err);
        console.log(err);
    }else{
        logger.info('Iniciando en el puerto: ' + PORT+' modo:ff pid:'+process.pid);
        // console.log('Iniciando en el puerto: ' + PORT+' modo:'+modo+ ' pid:'+process.pid);
    }
})