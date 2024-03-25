const app = require('../app')
const request = require('supertest')
const { create } = require('../controllers/genre.controllers')
const Actor = require('../models/Actor')
const Director = require('../models/Director')
const Genre = require('../models/Genre')

let id = 0

test('GET /movies debe traer todos los movies', async() => {
    const res = await request(app).get('/movies')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
})

test('POST /movies debe de crear un movie', async() => {
    const body = {
        name: "movie.name ",
        image: "movie.image ",
        synopsis: "movie.synopsis ",
        releaseYear: "movie.releaseYear" 
    }
    const res = await request(app).post('/movies').send(body)
    id = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.name).toBe(body.name)
    expect(res.body.id).toBeDefined()
})


test('PUT /movies/:id debe de actualizar un movie', async() => {
    const body = {
        name: "movie.nameNEWWWWW ",
        image: "movie.image ",
        synopsis: "movie.synopsis ",
        releaseYear: "movie.releaseYear" 
    }
    const res = await request(app).put(`/movies/${id}`).send(body)
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(body.name)
  
})

test('POST /movies/:id/actors debe de insertar un actor en movies', async() => {
    const actor = await Actor.create({
        firstName: "lucia",
        lastName: "gutierrez",
        nationality: "peru",
        image: "actor.image",
        birthday: "2020-05-10"
    } )
    const res = await request(app).post(`/movies/${id}/actors`).send([actor.id])
        await actor.destroy()
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
    expect(res.body[0].firstName).toBe("lucia")
    expect(res.body.length).toBe(1)
})


test("POST /movies/:id/directos este test debe de crear un director en una movie", async() => {
    const director = await Director.create ({
            firstName: "lucio example",
            lastName: "director.lastName ",
            nationality: "director.nationality ",
            image: "director.image ",
            birthday: "director.birthday "
        
    })
    const res = await request(app).post(`/movies/${id}/directors`).send([director.id])
        await director.destroy()
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
    expect(res.body[0].firstName).toBe("lucio example")
    expect(res.body.length).toBe(1)
})


test("POST /movies/:id/genre debe de crear un genero en una movie", async() => {
    const genre = await Genre.create({
        name: "comedyTest"
    })
    const res = await request(app).post(`/movies/${id}/genres`).send([genre.id])
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
    expect(res.body[0].name).toBe("comedyTest")
    expect(res.body.length).toBe(1)
})

test('DELETE /movies/:id debe de eliminar un movie', async() => {
    const res = await request(app).delete(`/movies/${id}`)
    console.log(res)
    expect(res.status).toBe(204)
})
