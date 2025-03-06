declare module 'llamaai' {
    export default class LlamaAI {
        constructor(apiToken: string);
        run(request: any): Promise<any>;
    }
}