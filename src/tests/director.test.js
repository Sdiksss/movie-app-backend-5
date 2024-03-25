const app = require('../app')
const request = require('supertest')

let id = 0

test('GET /directors debe traer todos los directores', async() => {
    const res = await request(app).get('/directors')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
})

test('POST /directors debe de crear un director', async() => {
    const body = {
        firstName: "director.firstName ",
        lastName: "director.lastName ",
        nationality: "director.nationality ",
        image: "director.image ",
        birthday: "director.birthday "
    }
    const res = await request(app).post('/directors').send(body)
    id = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.firstName).toBe(body.firstName)
    expect(res.body.id).toBeDefined()
})


test('PUT /directors/:id debe de actualizar un director', async() => {
    const body = {
        firstName: "director.firstNameNEWWWW ",
        lastName: "director.lastName ",
        nationality: "director.nationality ",
        image: "director.image ",
        birthday: "director.birthday "
    }
    const res = await request(app).put(`/directors/${id}`).send(body)
    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(body.firstName)
  
})

test('DELETE /directors/:id debe de eliminar un director', async() => {
    const res = await request(app).delete(`/directors/${id}`)
    console.log(res)
    expect(res.status).toBe(204)
})
