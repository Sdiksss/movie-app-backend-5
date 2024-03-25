const app = require('../app')
const request = require('supertest')

let id = 0

test('GET /genres debe traer todos los generos', async() => {
    const res = await request(app).get('/genres')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
})

test('POST /genres debe de crear un genero', async() => {
    const body = {
            name: "comedy"
    }
    const res = await request(app).post('/genres').send(body)
    id = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.name).toBe(body.name)
    expect(res.body.id).toBeDefined()
})


test('PUT /genres/:id debe de actualizar un genero', async() => {
    const body = {
       name: "comedyNew"

    }
    const res = await request(app).put(`/genres/${id}`).send(body)
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(body.name)
  
})

test('DELETE /genres/:id debe de eliminar un genero', async() => {
    const res = await request(app).delete(`/actors/${id}`)
    console.log(res)
    expect(res.status).toBe(204)
})
