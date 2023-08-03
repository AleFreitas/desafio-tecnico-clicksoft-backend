export async function doLogin(client, email: string, password: string) {
  const login = await client.post('api/login').json({
    email: email,
    password: password,
  })
  return `Bearer ${login.response._body.token}`
}
