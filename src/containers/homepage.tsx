import Link from 'next/link'

export function Homepage() {
    return (<div>
        <h1>Index page</h1>
        <Link href='/people'><a>People</a></Link><br />
        <Link href='/vehicles'><a>Vehicles</a></Link>
    </div >)
}