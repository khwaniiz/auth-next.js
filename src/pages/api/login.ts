import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken';
import cookie from 'cookie';
import { NextApiResponse, NextApiRequest } from 'next'
import sqlite from 'sqlite'
import { secret } from '../../../api/secret'


export default async function login(req: NextApiRequest, res: NextApiResponse) {
    const db = await sqlite.open('./mydb.sqlite');

    if (req.method === 'POST') {
        const person: any = await db.get('select * from person where email = ?', [
            req.body.email
        ]);
        // Load hash from your password DB.
        compare(req.body.password, person.password, function (err, result) {
            if (!err && result) {
                const claims = { sub: person.id, myPersonEmail: person.email }
                const jwt = sign(claims, secret, { expiresIn: '1h' })

                // set cookies
                res.setHeader('Set-cookie', cookie.serialize('auth', jwt, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    sameSite: 'strict',
                    maxAge: 3600,
                    path: '/'
                }))
                res.json({ message: 'Welcome to the app' })

                // res.json({ message: 'OK' })
            } else {
                res.json({ message: 'Something went wrong' })
            }
            // result == true
        });


    }
    else {
        res.status(405).json({ message: 'Support POST only' })
    }


}