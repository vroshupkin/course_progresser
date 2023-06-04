import Cookie from 'universal-cookie';
import { REACT_APP_BACKEND_URL_DEV } from './constants';

const cookie = new Cookie();

// Example POST method implementation:
export async function post(url = '', body = {}, check_token = true) 
{
    
  url = REACT_APP_BACKEND_URL_DEV + url;
  

  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(body), // body data type must match "Content-Type" header
  });
  
  
  return response; // parses JSON response into native JavaScript objects
}


export const api = 
{
  post: post
};

