
export interface Persona {
  id_persona: number;
  nombre: string;
  apellido: string;
  rut: string;
  sexo: number;
  telefono: number;
  direccion: string;
  fec_nacimiento: Date;
  email: string;
  id_comuna: number;
  id_refencia?:number;
}


export interface Region {
  id_region: number;
  nombre_region: string;
}

export interface Comuna {
  id_comuna:number;
  nombre_comuna:number;
  id_region: number;
}

export interface Referencia {
  id: number;
  persona_id: number;
  persona_referenciada_id: number;
}
