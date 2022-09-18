const faker  = require( '@faker-js/faker');
const {login,faillogin,logout,info,infozip,infodebug,randoms,postOrigen,origen,failregister,register,registerVery,loginVery,deserializeUser,connection,nodefinida} = require("./controlador/controlador.js");
const util = require( 'util');
const dotenv = require( 'dotenv/config');
const Koa = require('koa');
const koaBody = require('koa-body');
faker.locale = 'es';

const Router = require('koa-router');

const { createServer } = require( "http");

const { Server } = require( "socket.io");
//passport
const passport = require( "passport");
const { Strategy: LocalStrategy } = require('passport-local')
//session

const session = require( 'koa-session');

// --------------------------------------//
// const MongoStore = require( 'connect-mongo')
//------

const parseArgs = require( 'minimist');

const cluster = require( 'cluster');
const os = require( 'os');
const compression = require('compression');
const logger = require( './scripts/logger.js');
const {routerOps}=require('./rutas/rutas.js');
// const GraphQLController = require ("./controlador/GraphQLCrontroller.js");
const routerInfo = new Router();
const serve = require('koa-static');
var views = require('koa-views');
const options_puerto ={
    alias:{
        p:'puerto',
        m:'modo'
    },
    default:{
        puerto:8080,
        modo:"FORK"
    }
}
//-------
const { fork } = require( 'child_process')
const path = require( 'path')
//-------
const { puerto }= parseArgs(process.argv.slice(2),options_puerto);
const { modo }= parseArgs(process.argv.slice(2),options_puerto);
//--------
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true }
//--------------------
const numCpus= os.cpus().length;
const modoCluster = process.argv[3] == 'CLUSTER';
if(cluster.isPrimary && modo =="CLUSTER" || modoCluster && cluster.isPrimary){
    // console.log('Numero de procesadores: ' + numCpus);
    // console.log('PID:' + process.pid);
    for (let i = 0; i < numCpus; i++) {
        cluster.fork();   
    }
    cluster.on('exit', worker => {
        // console.log('Worker1 ' + process.pid + ' murio');
        cluster.fork();
    })
}else{
    function isAuth(ctx, next) {
        if (ctx.request.isAuthenticated()) {
        next()
        } else {
        ctx.redirect('/login')
        }
    }
    const usuarios = [];
    //---------------------------------------------------//

    // PASSPORT REGISTER
    passport.use('register', new  LocalStrategy({
        passReqToCallback: true
    }, async (req, username, password, done) => {
        await registerVery(req, username, password, done);
    }))

    //---------------------------------------------------//
    // PASSPORT LOGIN
    passport.use('login', new  LocalStrategy(async(username, password, done) => {
        await loginVery(username, password, done);
    }))
    //---------------------------------------------------//
    // SERIALIZAR Y DESERIALIZAR

    passport.serializeUser(function(user, done) {
        done(null, user.username)
    })
    
    passport.deserializeUser(async function(username, done) {
        await deserializeUser(username, done);
    })


    const app = new Koa();
    app.use(koaBody());
    // app.use(
    // session({
    //     secret: 'shhhhhhhhhhhhhh',
    //     resave: false,
    //     saveUninitialized: false,
    //     cookie: {
    //         maxAge: 600000,
    //     },
    //     rolling: true,
    // })
    // )


    //---------------------------------------------------//
    // MIDDLEWARES DE PASSPORT
    app.use(passport.initialize())
    app.keys = ['Shh, its a secret!'];

    app.use(passport.session(app))
    //--------------------------------
    const httpServer = new createServer(app)
    const io = new Server(httpServer)

    //----------------
    app.use(serve('./public'))
    // app.use(Koa.urlencoded({extended:true}))
    // app.use(Koa.json())
    app.use(views(path.join(__dirname, 'views'), { extension: 'pug' }))


    //info sin compression 
    routerInfo.get('/', async(ctx) => {
        await info(ctx,process,numCpus);
    })
    //info con compression 
    routerInfo.get('/infozip', compression(), async(ctx) => {
        await infozip(ctx,process,numCpus);
        
        })
    //info con debug
    routerInfo.get('/infodebug', async(ctx) => {
        await infodebug(ctx,process,numCpus);
    })
    //node --max-old-space-size=8192 server -p 8085 d 33
    // app.get('/api/randoms', isAuth, compression(), async(ctx) => {
    //     await randoms(ctx,process,modoCluster,PORT);
    // })

    
    io.on('connection', async (socket) => {
        await connection(socket,io);
    })
    process.on('uncaughtException', function (err) {
        logger.error(err);
    });
    // app.use('/info', routerInfo);
    // app.use("/graphql", new GraphQLController().routes());
    app.use( routerOps.routes());
    const PORT = process.env.PORT || parseInt(process.argv[2]) || 8080
    httpServer.listen(PORT, err => {
        if(err){
            logger.error(err);
            // console.log(err);
        }else{
            logger.info('Iniciando en el puerto: ' + PORT+' modo:'+modo+ ' pid:'+process.pid);
            // console.log('Iniciando en el puerto: ' + PORT+' modo:'+modo+ ' pid:'+process.pid);
        }
    })
}

//para correr lo de autocanon
//consola 1
//0x server.js

//consola 2 
//node benchmark.js
