const app = require('../app')
const request = require('supertest')

let id = 0

test('GET /actors debe traer todos los actores', async() => {
    const res = await request(app).get('/actors')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
})

test('POST /actors debe de crear un actor', async() => {
    const body = {
            firstName: "lucia",
            lastName: "gutierrez",
            nationality: "peru",
            image: "actor.image",
            birthday: "2020-05-10"
    }
    const res = await request(app).post('/actors').send(body)
    id = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.firstName).toBe(body.firstName)
    expect(res.body.id).toBeDefined()
})


test('PUT /actors/:id', async() => {
    const body = {
        firstName: "luciaNew",
            lastName: "gutierrez",
            nationality: "peru",
            image: "actor.image",
            birthday: "2020-05-10"

    }
    const res = await request(app).put(`/actors/${id}`).send(body)
    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(body.firstName)
  
})

test('DELETE /actors/:id', async() => {
    const res = await request(app).delete(`/actors/${id}`)
    console.log(res)
    expect(res.status).toBe(204)
})
