export interface IOpcionesMenu {
    titulo: string,
    url : String,
    icono : String,
    urlAssetIcono? : String,
    subopciones : IOpcionesSubmenu[]
}

export interface IOpcionesSubmenu {
    titulo: string,
    url : String,
    icono : String,
    urlAssetIcono? : String
}