const Router = require('koa-router');



const router = new Router();

const alumnos =[
    {dni: 32313432, nombre: 'Juan Perez', materia: 'Fisica', nota: 6},
    {dni: 53433222, nombre: 'Celia Gomez', materia: 'Matematicas', nota: 7},
    {dni: 76423442, nombre: 'Cintia fernadnez', materia: 'Fisica', nota: 4},
    {dni: 96323441, nombre: 'Diego Mei', materia: 'Matematicas', nota: 8}
]

router.get('/', ctx =>{
    ctx.body = {alumnos};
})
router.get('/login',ctx =>{
    ctx.render('login.pug');
})

router.get('/promedio', ctx =>{
    const materia = ctx.request.query.materia;

    let suma= 0;
    const cant = alumnos
        .filter(alumno => alumno.materia == materia)
        .map(alumno => suma += alumno.nota)
        .length
    ctx.body = {
        promedio: cant? suma/cant : 'No hay alumnos en esta materia'
    }
})


router.get('/:dni', ctx =>{
    const alumno =alumnos.filter(alumno => alumno.dni == ctx.params.dni)
    if(!alumnos.length){
        ctx.response.status= 404;
        ctx.body ={
            status: 'error',
            message: 'Alumno not found'
        }
        return
    }

    ctx.body = alumno[0]
})

router.post('/', ctx =>{
    if(!ctx.request.body.dni ||
       !ctx.request.body.nombre ||
       !ctx.request.body.materia ||
       !ctx.request.body.nota){
        ctx.response.status =400;
        ctx.body = {
            status: 'error',
            message: 'No se envio la totalidad de la información'
        }
        return
    }
    const newAlumno = {
        dni: ctx.request.body.dni,
        nombre: ctx.request.body.nombre,
        materia: ctx.request.body.materia,
        nota: ctx.request.body.nota
    }

    alumnos.push(newAlumno);
    ctx.response.status =201;
    ctx.body = {
        status: 'success',
        message: 'Alumno creado'
    }
})



router.put('/:dni', ctx =>{
    if(!ctx.request.body.dni ||
       !ctx.request.body.nombre ||
       !ctx.request.body.materia ||
       !ctx.request.body.nota){
        ctx.response.status =400;
        ctx.body = {
            status: 'error',
            message: 'No se envio la totalidad de la información'
        }
        return
    }
    const dni = ctx.params.dni;

    const index = alumnos.findIndex(alumno => alumno.dni == dni);
    alumnos.splice(index, 1, ctx.request.body);

    ctx.response.status =200;
    ctx.body = {
        status: 'success',
        message: 'Alumno Actualizado'
    }
})

router.delete('/:dni', ctx =>{
    const dni = ctx.params.dni;
    const index = alumnos.findIndex(alumno => alumno.dni == dni);
    alumnos.splice(index, 1);
    ctx.response.status =200;
    ctx.body = {
        status: 'success',
        message: 'Alumno Eliminado'
    }
})


module.exports = router;
