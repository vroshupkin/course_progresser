import { off } from 'process';

export class Debagger 
{
  constructor(private running: boolean) 
  {}

  log(str?: any): void 
  {
    if (this.running) 
    {
      console.log(str);
    }
  }

  off(): void 
  {
    this.running = false;
  }

  on(): void 
  {
    this.running = true;
  }
}
