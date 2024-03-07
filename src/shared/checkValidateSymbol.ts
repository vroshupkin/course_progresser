export const checkVaidate = (str: string) => 
{
  
  const valid_symb = '$-_.+!*\'(), /:%';

  const validators = [
    /[0-9]/,
    /[A-z]/,
    /[А-я]/,
    /[\s]/

  ];
  

  const excess_chars = [ ...str ].map(ch => 
  {

    return validators.some(reg_ex => reg_ex.test(ch))? '' : ch; 
  }

  );

  return excess_chars.reduce((a, b) => `${a}${b}`);
};

export const discogsValidate = [
  234163,  // name: Joël
  46,           // Håkan Lidbo, Laid

];


const multiplexer_char = (ch: string) => 
{
  const code = ch.charCodeAt(0);

  const or_array = (val: number, ...arr: number[]) =>
  {
    return arr.some((v) => v == val);
  };

  const in_interval = (start: number, end?: number) => (ch: string) => 
  { 
    if(end === undefined) 
    {
      end = start;
    }

    return start <= code && code <= end;
  };

/* eslint-disable */  
  if(in_interval(192, 254))
  {
    
    return    in_interval(192, 197)   ? 'A' :     // À, Á, Â, Ã, Ä, Å eslint-disable
            in_interval(199)        ? 'C' :     // Ç    
            in_interval(200, 203)   ? 'E' :     // È, É, Ê, Ë eslint-disable-line
            in_interval(204, 207)   ? 'I' :     // Ì, Í, Î, Ï
            in_interval(208)        ? 'D' :     // Ð
            in_interval(209)        ? 'N' :     // Ñ
            in_interval(210, 214)   ? 'N' :     // Ò, Ó, Ô, Õ, Ö
            in_interval(216)        ? 'O' :     // Ø
            in_interval(217, 220)   ? 'U' :     // Ù Ú Û Ü
            in_interval(221)        ? 'Y' :     // Ý
            in_interval(223)        ? 'b' :     // ß
            in_interval(224, 229)   ? 'a' :     // à á â ã ä å
            in_interval(231)        ? 'a' :     // ç
            in_interval(232, 235)   ? 'e' :     // è é ê ë
            in_interval(236, 239)   ? 'i' :     // ì í î ï
            in_interval(240)        ? 'd' :     // ð
            in_interval(241)        ? 'n' :     // ñ
            in_interval(242, 246)   ? 'o' :     // ò ó ô õ ö
            in_interval(248)        ? 'o' :     // ø
            in_interval(249, 252)   ? 'u' :     // ù ú û ü
            in_interval(253)        ? 'y' :     // ý
            in_interval(254)        ? 'b' :     // þ
            ''
  }
  // eslint-enable

  // eslint-disable
  if(in_interval(256, 382))
  {
    if(or_array(code, 256, 258, 260))                   { return 'A' }      // Ā Ă Ą
    else if(or_array(code, 257, 259, 261))              { return 'a' }      // ā ă ą
    else if(or_array(code, 262, 264, 266, 268))         { return 'C' }      // Ć Ĉ Ċ Č 
    else if(or_array(code, 263, 265, 267, 269))         { return 'c' }      // ć ĉ ċ č
    else if(or_array(code, 270, 272))                   { return 'D' }      // Ď Đ
    else if(or_array(code, 271, 272))                   { return 'd' }
    else if(or_array(code, 274, 276, 278, 280, 282))    { return 'E' }
    else if(or_array(code, 275, 277, 279, 281, 283))    { return 'e' }
    else if(or_array(code, 284, 286, 288, 290))         { return 'G' }
    else if(or_array(code, 285, 287, 289, 291))         { return 'g' }
    else if(or_array(code, 292, 294))                   { return 'H' }
    else if(or_array(code, 293, 295))                   { return 'h' }
    else if(in_interval(296, 305))
    {
        return (code & 1) == 0 ? 'I' : 'i'
    }
    else if(code === 306)               { return 'IJ' }
    else if(code === 307)               { return 'ij' }
    else if(code === 308)               { return 'J'  }
    else if(code === 309)               { return 'J'  }
    else if(code === 310)               { return 'K'  }
    else if(in_interval(311, 312))      { return 'k'  }
    else if(in_interval(313, 322))
    {
        return (code & 1) == 0 ? 'l' : 'L'
    }
    else if(in_interval(323, 331))
    {
        return (code & 1) == 0 ? 'n' : 'N'
    }
    else if(in_interval(332, 337))
    {
        return (code & 1) == 0 ? 'O' : 'o'
    }
    else if(in_interval(340, 345))
    {
        return (code & 1) == 0 ? 'R' : 'r'
    }
    else if(in_interval(346, 353))
    {
        return (code & 1) == 0 ? 'S' : 's'
    }
    else if(in_interval(354, 359))
    {
        return (code & 1) == 0 ? 'T' : 't'
    }
    else if(in_interval(360, 371))
    {
        return (code & 1) == 0 ? 'U' : 'u'
    }
    else if(in_interval(372, 373))
    {
        return (code & 1) == 0 ? 'W' : 'w'
    }
    else if(in_interval(374, 376))
    {
        return (code & 1) == 0 ? 'Y' : 'y'
    }
    else if(in_interval(377, 382))
    {
        return (code & 1) == 0 ? 'z' : 'Z'
    }
        
  }
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            


            


};