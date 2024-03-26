import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comuna, Persona, Region, Referencia } from '../interfaces/persona.interface';
import { environments } from '../../../environments/environments';



@Injectable({providedIn: 'root'})
export class PersonasService {

  private baseUrl : string = environments.baseUrl

  constructor(private http: HttpClient) { }

  getPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${ this.baseUrl }/api/personas`)
  }

  postPersona(persona: Persona)  {
    return this.http.post<Persona>( `${this.baseUrl}/api/personas/post-persona`, persona)
  }

  putPersona(persona:Persona) {
    return this.http.put<Persona>(`${this.baseUrl}/api/personas/put-persona/`, persona)
  }

  getPersona(id:string | null) : Observable<Persona> {
    return this.http.get<Persona>(`${this.baseUrl}/api/personas/persona/${id}`)
  }

  deletePersona (id:number) : Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/personas/delete-persona/${id}`)
  }

  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(`${this.baseUrl}/api/personas/regiones`)
  }

  getComunas(): Observable<Comuna[]> {
    return this.http.get<Comuna[]>(`${this.baseUrl}/api/personas/comunas`)
  }

  getReferencias(id:string | null) : Observable<Referencia[]> {
    return this.http.get<Referencia[]>(`${this.baseUrl}/api/personas/referencias/${id}`)
  }
}
