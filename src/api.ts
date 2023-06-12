import Cookie from 'universal-cookie';
import { REACT_APP_BACKEND_URL_DEV } from './constants';
import { userStore } from './components/stores/user.store';
import Mime from 'mime/Mime';

const cookie = new Cookie();


// Example POST method implementation:
async function post(url = '', body = {}, content_type = 'application/json') 
{
    
  url = REACT_APP_BACKEND_URL_DEV + url;
  
  let response: Response;

  const headers: HeadersInit = 
  {
    'Content-Type': content_type,
    'Authorization': `Bearer ${userStore.token !== null? userStore.token: ''}`
        
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
    
    
    return e as Error;
  }
  
  return response; // parses JSON response into native JavaScript objects
}

export async function get(url = '') 
{
    
  url = REACT_APP_BACKEND_URL_DEV + url;
  
  let response: Response;

  const headers: HeadersInit = 
  {
    // 'Content-Type': content_type,
    'Authorization': `Bearer ${userStore.token !== null? userStore.token: ''}`
  };

  
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
    return e as Error;
  }
  
  return response; // parses JSON response into native JavaScript objects
}

const upload_file = async(url = '', body: FormData) => 
{
  url = REACT_APP_BACKEND_URL_DEV + url;
  

  const headers: HeadersInit = 
  {
    'Authorization': `Bearer ${userStore.token !== null? userStore.token: ''}`,
    // 'Content-Type': `multipart/form-data`
  };


  let response: Response;

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
      body: body, // body data type must match "Content-Type" header
    });
    
  }
  catch(e)
  {
    console.log('sd');
    console.log(typeof e);
    
    return e as Error;
  }
  
  if(response.status === 401 && response.statusText === 'Unauthorized')
  {
    userStore.setToken(null);
    console.log(userStore.token);
  }
  
  console.log(response);
  
  return response; // parses JSON response into native JavaScript objects
  
};

export const api = 
{
  get: get,
  post: post,
  
  upload_file: upload_file
};

