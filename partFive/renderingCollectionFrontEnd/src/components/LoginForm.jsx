export default function LoginForm({
  handleLogin,
  username,
  password,
}) {
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <fieldset>
          <label>
            username
            <input type='text' ref={username}></input>
          </label>
        </fieldset>
        <fieldset>
          <label>
            password
            <input type='password' ref={password}></input>
          </label>
        </fieldset>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}