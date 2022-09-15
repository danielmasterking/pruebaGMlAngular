import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = `${environment.protocol}://${environment.ApiUrl}`;
  constructor(private http: HttpClient) { }

  getUsuario() {
    return this.http.get(this.url + 'usuario');
  }

  getUsuarioId(id:number) {
    return this.http.get(this.url + 'usuario/' + id);
  }

  getPaises() {
    return this.http.get(this.url + 'paisesList');
  }

  buscarUsuario(buscar:string) {
    return this.http.get(this.url + 'buscar/' + buscar);
  }

  guardar(datos:object){
    return this.http.post(this.url + 'usuario/', datos);
  }

  actualizar(datos:object,id:number){
    return this.http.post(this.url + 'usuario/' + id, datos);
  }

  eliminar(id:number) {
    return this.http.delete(this.url + 'usuario/' + id);
  }
}
