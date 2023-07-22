import { api } from '../../api';

/**
 * Download from backend image and create url this object
 */
export const load_avatar = async(userName: string) => 
{
  const res = await api.get(`/users/get-avatar_${userName}`);

  if(res instanceof Response)
  {
    return URL.createObjectURL(await res.blob()); 
  }
  else
  {
    return '';
  }
};

  