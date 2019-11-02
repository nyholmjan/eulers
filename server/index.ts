import * as express from 'express'
const Firestore = require('@google-cloud/firestore')

const app = express()

// user google keyfile for secrets
const db = new Firestore({
    projectId: 'euler-projects',
    keyFilename: 'keyfile.json'
})

const port = process.env.PORT || 8000

app.use(express.json())

app.use(express.static('dist/frontend'))

app.get('/answers', (req, res) => {
    db.collection('answers')
        .get()
        .then((answers: any) => {
            const docs: any = []
            answers.forEach((doc: any) => {
                docs.push(doc.data())
            })
            console.log(`Found ${docs.length} documents`)
            res.send(docs)
        })
        .catch((error: any) => res.send(error))

})
app.post('/answer', async (req, res) => {
    try {
        db.collection('answers')
            .add({ problem: req.body.problem, answer: req.body.answer })
            .then((documentReference: any) => {
                documentReference.get()
                    .then(async (item: any) => res.json(item.data()))
            })
    } catch (error) {
        console.log('error adding item: ', error)
        res.status(400).send(error)
    }
})
app.listen(port, () => {
    console.log(`Eulers listening at ${port}`)
})
