function Register() {
    return(
        <>
        <h2>Register</h2>
        <form>
            <label htmlFor="name">Name</label>
           <input type="text" name="name" required/> 

            <label htmlFor="email">Email Address</label>
           <input type="email" name="email" required/> 

           <label htmlFor="password">Password</label>
           <input type="password" name="password" required/>
        </form>
        </>
    )
}

export default Register