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
    const response = await fetch(url, { method: 'GET' });
    
    if(response.status === 404)
    {
      return { json: await response.text(), status: response.status };
    }

    return { json: await response.json(), status: response.status };
  };

}


// export const get_release = async (id: number) => 
// {

// };