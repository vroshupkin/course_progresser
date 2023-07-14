import { api } from '../../api';

export const get_avatar = async(userName: string) => 
{
  const res = await api.get(`/users/get-avatar_${userName}`);

  if(res instanceof Response)
  {
    return URL.createObjectURL(await res.blob()); 
  }
  else
  {
    return res;
  }
};

  