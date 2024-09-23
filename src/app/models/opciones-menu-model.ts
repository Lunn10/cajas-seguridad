export interface IOpcionesMenu {
    titulo: string,
    url : string,
    icono : string,
    urlAssetIcono? : string,
    subopciones : IOpcionesSubmenu[]
}

export interface IOpcionesSubmenu {
    titulo: string,
    url : string,
    icono : string,
    urlAssetIcono? : string
}