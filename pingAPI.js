const URL = 'http://localhost:5000'

const main = async () => {
  const interval = setInterval(
    () =>
      fetch(URL)
        .then((r) =>
          r.status == 200 ? r.text() : console.log(Date.now(), 'KO', r.status)
        )
        .then((r) => r && console.log(Date.now(), r, 200))
        .catch((err) => console.log(Date.now(), 'KO', err.message)),
    500
  )
}

main()
