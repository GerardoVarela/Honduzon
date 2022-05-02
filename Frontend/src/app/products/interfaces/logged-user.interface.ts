export interface ResponseLoggedUser{
    loggedUser: LoggedUser;
    mensaje?: string;
    suscripciones: boolean;
    categoriasSuscritas?: number[];
}

export interface LoggedUser{
    nombreCompleto: string;
    imagenPerfil: null;
    idUsuario: number;
}