import Cookie from 'universal-cookie';

import { userStore } from './components/stores/user.store';
import Mime from 'mime/Mime';
import { ENV } from './env';

const cookie = new Cookie();

function clearToken()
{ 
  userStore.token = '';
  // cookie.remove('token');
  // cookie.remove('userName');
}

const AuthorizationHeader = 
{
  get Authorization()
  {
    return `Bearer ${userStore.token? userStore.token: ''}`;
  }
};


// Example POST method implementation:
async function post(url = '', body = {}, content_type = 'application/json') 
{
    
  url = ENV.BACKEND_URL + url;
  
  let response: Response;

  const headers: HeadersInit = 
  {
    'Content-Type': content_type,
    ...AuthorizationHeader
  };

  
  try
  {
    response =  await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: headers,

      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(body), // body data type must match "Content-Type" header
    });
    
  }
  catch(e)
  {
    
    console.log(e);

    return e as Error;
  }
  
  
  return response; // parses JSON response into native JavaScript objects
}

export async function get(url = '') 
{
  url = ENV.BACKEND_URL + url;
  
  const headers: HeadersInit = 
  {
    ...AuthorizationHeader
  };

  let response: Response;

  console.log(url);
  try
  {
    response =  await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: headers,

      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
  
  }
  catch(e)
  {
    console.log(e);
    
    return e as Error;
  }
  
  
  // clearToken();
  
  return response; // parses JSON response into native JavaScript objects
}

const upload_file = async(url = '', body: FormData) => 
{
  url = ENV.BACKEND_URL + url;
  

  const headers: HeadersInit = 
  {
    ...AuthorizationHeader
    // 'Content-Type': `multipart/form-data`
  };


  let response: Response;

  console.log('start fetch');
  try
  {
    response =  await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, *cors, same-origin
      // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, *same-origin, omit
      headers: headers,

      // redirect: 'follow', // manual, *follow, error
      // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: body, // body data type must match "Content-Type" header
    });
    
  }
  catch(e)
  {
    console.log('sd');
    console.log(typeof e);
    
    return e as Error;
  }
  
  
  return response; // parses JSON response into native JavaScript objects
  
};

export const api = 
{
  get: get,
  post: post,
  
  upload_file: upload_file
};

