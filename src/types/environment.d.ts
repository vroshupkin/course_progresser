export {};

declare global {
    namespace NodeJS{
        interface ProcessEnv{
            REACT_APP_BACKEND_URL_DEV: string,
            ENV: 'dev' | 'prod',
            PORT: number,
            
        }
    }
}