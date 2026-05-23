import app from './app'

const start = async () => {
  try {
    await app.listen({
      port: Number(process.env.PORT || 4000),
      host: '0.0.0.0'
    })

    console.log('Backend running on port 4000')
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

start()