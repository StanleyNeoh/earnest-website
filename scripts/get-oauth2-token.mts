import { google } from 'googleapis';
import * as dotenv from 'dotenv';
import path from 'path';
import http from 'http';

// Load environment variables from next/.env
const envPath = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../next/.env');
console.log('\x1b[32m%s\x1b[0m', 'Resolved path to .env:', envPath);
dotenv.config({ path: envPath });

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = 'http://localhost:8080'; // Adjust this if needed

if (!clientId || !clientSecret) {
    console.error('CLIENT_ID or CLIENT_SECRET is missing in the environment variables.');
    process.exit(1);
}


const serverPromise = new Promise<string>((resolve, reject) => {
    const server = http.createServer((req, res) => {
        const url = new URL(req.url || '', `http://${req.headers.host}`);
        const code = url.searchParams.get('code');

        if (code) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Authorization code received. You can close this window.');
            resolve(code);
        } else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Authorization code not found.');
            reject(new Error('Authorization code not found.'));
        }
        // console.debug('Received request:', req.method, req.url);
        server.close(() => {
            // console.debug('Server closed.');
        });
    });

    server.listen(8080, () => {
        // console.debug('Server is running on http://localhost:8080');
    });
});

const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

async function getAccessToken() {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: [
            'https://mail.google.com/' // Nodemailer requires this scope
            // 'https://www.googleapis.com/auth/gmail.send',
        ],
    });

    console.log('\x1b[32m%s\x1b[0m', 'Authorize this app by visiting this URL:', authUrl);

    try {
        const auth_code = await serverPromise;
        oauth2Client.getToken(auth_code, (err, token) => {
            if (err) {
                console.error('\x1b[31m%s\x1b[0m', 'Error retrieving access token', err);
                return;
            }
            if (token) {
                console.log('\x1b[32m%s\x1b[0m', 'Access Token:', token.access_token);
                console.log('\x1b[32m%s\x1b[0m', 'Refresh Token:', token.refresh_token);
            } else {
                console.error('\x1b[31m%s\x1b[0m', 'No token received.');
            }
        });
    } catch (error) {
        console.error('\x1b[31m%s\x1b[0m', 'Error during server setup:', error);
        process.exit(1);
    }
}

getAccessToken();