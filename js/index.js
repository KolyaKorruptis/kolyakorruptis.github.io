const [userName, setUserName] = useState(() => '')
const [userMessage, setUserMessage] = useState(() => '')
const wait = ms => new Promise((r, j) => setTimeout(r, ms))

let changing = 0 // to create a buffer to avoid changing state always, the browser gets slow otherwise
const changeUserName = async (e, { value }) => {
  changing++
  let prev_changing = changing
  await wait(100)
  if (prev_changing === changing) setUserName(value)
}

const changeuserMessage = async (e, { value }) => {
  changing++
  let prev_changing = changing
  await wait(100)
  if (prev_changing === changing) setUserMessage(value)
}

const onSubmit = async e => {
  e.preventDefault()
  const formdata = new FormData()
  formdata.set('fields[name]', userName)
  formdata.set('fields[message]', userMessage)
  const json = {}
  formdata.forEach((value, prop) => (json[prop] = value))
  const formBody = Object.keys(json)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(json[key]))
    .join('&')

  // in the repo, create a folder named 'comments'
  const response = await fetch(
    'https://dev.staticman.net/v3/entry/github/KolyaKorruptis/kolyakorruptis.github.io/master/comments/',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formBody,
    }
  )
  console.log(response)
}