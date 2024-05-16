export interface IRespuestaServer {
    error : boolean;
    message : string;
    data: any[]
}

export interface IRespuestaServerSimple {
    error : boolean;
    message : string;
    data: any
}