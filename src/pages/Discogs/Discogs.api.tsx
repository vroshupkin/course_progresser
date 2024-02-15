import { ENV } from '../../env';


export class DiscogsApiBackend
{
  static save_release = async (id: number) => 
  {    
    const url = ENV.BACKEND_URL + `discogs/save-release?id=${id}`;
    const res = await fetch(url, { method: 'GET' });
  
    return res.json();
  };

  static get_release = async (id: number) => 
  {    
    const url = ENV.BACKEND_URL + `discogs/get-release-pool?id=${id}`;
    const res = await fetch(url, { method: 'GET' });
  
    return res.text();
  };

}


// export const get_release = async (id: number) => 
// {

// };