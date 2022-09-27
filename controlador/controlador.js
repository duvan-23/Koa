const logger = require( '../scripts/logger.js');
const services = require( '../negocio/negocio.js');
const { fork } = require( 'child_process');
const bcrypt = require( 'bcrypt');
const { normalize, denormalize, schema } = require( 'normalizr');
const login = async (ctx) => {
    const { url, method } = ctx.request;
    logger.info(`Ruta ${url}, Metodo ${method}`);
    // res.sendFile('index.pug', {root: __dirname})
    logger.info(await services.conectarse());
    // if (ctx.isAuthenticated()) {
    //     ctx.redirect('/');
    // }else{
        ctx.render('login.pug')
    // }
}
const faillogin = async (ctx) => {
    const { url, method } = ctx.request;
    logger.info(`Ruta ${url}, Metodo ${method}`);
    ctx.render('login-error.pug')
}
const logout = async (ctx) => {
    const { url, method } = ctx.request;
    logger.info(`Ruta ${url}, Metodo ${method}`);
    ctx.request.logout(err => {
        ctx.redirect('/login')
    })
}
const info = async (ctx,process,numCpus) => {
    const args = process.argv;
    const argumentos = args.slice(2);
    const ejecutable = process.execPath.split('/').pop();
    const pid = process.pid;
    const carpeta = process.cwd();
    const rss = process.memoryUsage.rss();
    const plataforma = process.platform;
    const node_v = process.version;
    const { url, method } = ctx.request;
    logger.info(`Ruta ${url}, Metodo ${method}`);
    ctx.render('info.pug',{datos:[argumentos , ejecutable, pid, carpeta, rss, plataforma, node_v, numCpus]})
}
const infozip = async (ctx,process,numCpus) => {
    const args = process.argv;
    const argumentos = args.slice(2);
    const ejecutable = process.execPath.split('/').pop();
    const pid = process.pid;
    const carpeta = process.cwd();
    const rss = process.memoryUsage.rss();
    const plataforma = process.platform;
    const node_v = process.version;
    const { url, method } = ctx.request;
    logger.info(`Ruta ${url}, Metodo ${method}`);
    ctx.render('info.pug',{datos:[argumentos , ejecutable, pid, carpeta, rss, plataforma, node_v, numCpus]})
}
const infodebug = async (ctx,process,numCpus) => {
    const args = process.argv;
    const argumentos = args.slice(2);
    const ejecutable = process.execPath.split('/').pop();
    const pid = process.pid;
    const carpeta = process.cwd();
    const rss = process.memoryUsage.rss();
    const plataforma = process.platform;
    const node_v = process.version;
    const { url, method } = ctx.request;
    logger.info(`Ruta ${url}, Metodo ${method}`);
    console.log({datos:[argumentos , ejecutable, pid, carpeta, rss, plataforma, node_v, numCpus]});
    ctx.render('info.pug',{datos:[argumentos , ejecutable, pid, carpeta, rss, plataforma, node_v, numCpus]})
}
const randoms = async (ctx,process,modoCluster,PORT) => {
    const { url, method } = ctx.request;
    logger.info(`Ruta ${url}, Metodo ${method}`);
    const numero =ctx.request.query.cant;
    let numero1 = parseInt (numero);
    console.log(`Server en PORT(${PORT}) - PID(${process.pid}) - FYH(${new Date().toLocaleString()}) -- ${modoCluster}`);
    if(!(numero1>0)){
        numero1=100000000;
    }
}
const postOrigen = async (ctx) => {
    const { url, method } = ctx.request;
    logger.info(`Ruta ${url}, Metodo ${method}`);
    let datos = ctx.request.body.nombre;
    if (ctx.request.user.contador) {
        ctx.request.user.contador++
        ctx.redirect('/');
    } else if(ctx.request.body.nombre){
        ctx.request.user.contador = 1;
        ctx.request.user.username = datos;

        ctx.redirect('/');
    }else{
        ctx.redirect('/login');
    }
}
const origen = async (ctx) => {
    // if (!ctx.request.user.contador) {
    //     ctx.request.user.contador = 0
    // }
    // let contador =ctx.request.user.contador+1;
    // await services.actualizarUsuarios(ctx.request.user.username,contador);
    logger.info(await services.conectarse());
    const { url, method } = ctx.request;
    logger.info(`Ruta ${url}, Metodo ${method}`);
    ctx.render('mensajes.pug',{nombre:'Juan'})
}
const failregister = async (ctx) => {
    const { url, method } = ctx.request;
    logger.info(`Ruta ${url}, Metodo ${method}`);
    ctx.render('register-error.pug')
}
const register = async (ctx) => {
    const { url, method } = ctx.request;
    logger.info(`Ruta ${url}, Metodo ${method}`);
    ctx.render('register.pug');
}
const productos = async (ctx) => {
    ctx.send(await services.mostrarProductos());
}
const productosinsert = async (ctx) => {
    const {data} = ctx.request.body;
    await services.grabarProductos(data);
    ctx.send("Agrego producto");
}
const productosdelete = async (ctx) => {
    const {data} = ctx.request.body;
    await services.borrarProductos(data);
    ctx.send("Borro producto");
}
const productosupdate = async (ctx) => {
    const {data,id} = ctx.request.body;
    await services.actualizarProductos(data,id);
    ctx.send("Actualizo producto");
}
const registerVery = async (ctx, username, password, done) => {
    const { direccion } = ctx.body
    

    console.log("entro");
    const usuario = await services.getNombre(username);
    console.log(usuario);
    if (usuario.username) {
    return done('user already registered')
    }
    const rounds = 10;
    bcrypt.hash(password, rounds, async(err, hash) => {
        if (err) {
        console.error(err)
        return
        }
        const contador=0;
        password=hash;
        const user = {
        username,
        password,
        direccion,
        contador
        }
        await services.agregarUsuarios(user);

        return done(null, user)
    })   
}
const loginVery = async (username, password, done) => {
    const user =await  services.getNombre(username);
    if (!user.username) {
    return done(null, false)
    }
    let respuesta;
    bcrypt.compare(password, user.password, (err, res) => {
        if (err) {
        console.error(err)
        return
        }
        respuesta=res; //true or false
        if (!respuesta) {
            return done(null, false)
        }
        user.contador = 0
        return done(null, user)
    })  
}
const deserializeUser=async(username, done) =>{
    const usuario =await  services.getNombre(username);
    done(null, usuario)
}
const connection=async(socket,io) =>{
    console.log('Un cliente se ha conectado!')
    //normalizr 
    const user = new schema.Entity('users');

    const comment = new schema.Entity('comments', {
        commenter: user
    })

    const post = new schema.Entity('posts', {
        author: user,
        comments: [comment]
    })

    const blog = new schema.Entity('blog', {
        posts: [post]
    })


        

    function print(objeto) {
        // console.log(util.inspect(objeto,false,12,true))
    }
    const consulta =await services.mostrarMensajes();
    const datos ={
        id: "10000",
        posts:consulta
    }
    console.log('Objeto normalizado')
    const normalizedHolding = normalize(datos, blog)


    socket.emit('messages', normalizedHolding)

    socket.on('new-message', async data => {
        let mensajes;
        await services.grabarMensajes(data);

        const consulta =await services.mostrarMensajes();
        const user = new schema.Entity('users');

    const comment1 = new schema.Entity('comments', {
        commenter: user
    })

    const post1 = new schema.Entity('posts', {
        author: user,
        comments: [comment1]
    })

    const blog1 = new schema.Entity('blog', {
        posts: [post1]
    })
        const datos1 ={
            id: "10000",
            posts:consulta
        }

        const normalizedHolding1 = normalize(datos1, blog1)

        io.sockets.emit('messages', normalizedHolding1)
    })

    socket.emit('products', await services.mostrarProductos())

    socket.on('new-product', async data => {
        await services.grabarProductos(data);
        io.sockets.emit('products',  await services.mostrarProductos())
    })
}
const nodefinida=async(ctx) =>{
    const { url, method } = ctx.request;
    logger.warn(`Ruta ${method} ${url} no implementada`)
    ctx.send(`Ruta ${method} ${url} no implementada`)
}

module.exports={login,logout,info,faillogin,infozip,infodebug,randoms,postOrigen,origen,failregister,register,registerVery,loginVery,deserializeUser,connection,nodefinida,productos,productosinsert,productosdelete,productosupdate};