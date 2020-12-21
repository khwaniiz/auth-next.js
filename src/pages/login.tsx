import { useRef, useState } from 'react'
export default function Login() {
    const emailRef = useRef<HTMLInputElement>(null)
    const passRef = useRef<HTMLInputElement>(null)
    const [msg, setMsg] = useState<any>(null)

    async function handleLogin() {
        const res = await fetch('http://localhost:3000/api/login', {
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
        {JSON.stringify(msg)}
        <input type='text' placeholder='email' ref={emailRef} />
        <input type='password' placeholder='password' ref={passRef} />
        <button onClick={handleLogin}>Login</button>
    </div>)
}