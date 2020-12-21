import { useRef, useState } from 'react'
export default function Signup() {
    const emailRef = useRef<HTMLInputElement>(null)
    const passRef = useRef<HTMLInputElement>(null)
    const [msg, setMsg] = useState<any>(null)

    async function handleLogin() {
        const res = await fetch('http://localhost:3000/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailRef.current?.value,
                password: passRef.current?.value
            })
        })
        const json = await res.json();
        setMsg(json)

    }

    return (<div>
        <h1>Create a new user</h1>
        {JSON.stringify(msg)}
        <input type='text' placeholder='email' ref={emailRef} />
        <input type='password' placeholder='password' ref={passRef} />
        <button onClick={handleLogin}>Sign up</button>
    </div>)
}