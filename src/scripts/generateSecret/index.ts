import generator from 'generate-password'

function main() {
  const secret = generator.generate({
    length: 20,
    numbers: true
  })
  console.log(secret)
}

main()
