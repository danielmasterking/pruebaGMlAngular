import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../servicios/usuario.service';
import { Validators, FormBuilder } from '@angular/forms';
declare var $;
interface Usuarios {
  list:Array<ListUsuarios>;
  categorias?:Array<Categorias>;
  paises?:Array<string>;
}

interface ListUsuarios {
  id:number;
  nombres:string;
  apellidos:number;
  pais:string;
  email:string;
  cedula:string;
  direccion:string;
  celular:string;
  categoria_id:number;
  categorias?:Array<Categorias>;

}


interface Categorias {
  id:number;
  nombreCategoria:string;
}

interface responseApi{
  code: number;
  errors?:Array<string>;
  mensaje?:string;
}

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})

export class UsuarioComponent implements OnInit {
  usuarioList:ListUsuarios[];
  paises:Array<any>;
  categoriasList:Categorias[];
  paisesList:Array<string>;
  inputBuscar:string;
  usuarioData:ListUsuarios;
  idUsusario:number;

  formInsert = this.fb.group({
    nombres: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    pais: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    cedula: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    celular: ['', [Validators.required]],
    categoria_id: ['', [Validators.required]]
  });


  formUpdate = this.fb.group({
    nombres: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    pais: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    cedula: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    celular: ['', [Validators.required]],
    categoria_id: ['', [Validators.required]]
  });


  constructor(
    private usuarioServicio: UsuarioService,
    private fb: FormBuilder
  ) {
    this.getUsuarios()
    this.getPaises()

  }

  ngOnInit(): void {

  }


  getUsuarios(){
    this.usuarioServicio.getUsuario().
    subscribe((result:Usuarios) =>{
      this.usuarioList = result.list
    });
  }

  getPaises(){
    this.usuarioServicio.getPaises().subscribe((result:Array<string>) =>{
      this.paises = result;

      console.log('paises' , this.paises)
    });
  }

  submit(){

      console.log(this.formInsert.value)
      this.usuarioServicio.guardar(this.formInsert.value).subscribe((result:responseApi) =>{
        console.log(result);
        if(result.code == 200){
          alert(result.mensaje)
          this.getUsuarios()
        }else{
          alert(result.errors)
        }
        $('#modalNuevo').modal('hide')
      });

  }


  submitUpdate(){

    console.log(this.formInsert.value)
    this.usuarioServicio.actualizar(this.formUpdate.value , this.idUsusario).subscribe((result:responseApi) =>{
      console.log(result);
      if(result.code == 200){
        alert(result.mensaje)
        this.getUsuarios()
      }else{
        alert(result.errors)
      }

      $('#modalEditar').modal('hide')
    });

}

 eliminar(id:number){
    let confirmar = confirm('Seguro desea eliminar');
    if(confirmar){
      this.usuarioServicio.eliminar(id).subscribe((result:responseApi) =>{
        console.log(result);
        if(result.code == 200){
          alert(result.mensaje)
          this.getUsuarios()
        }else{
          alert(result.errors)
        }
      });
    }
 }

  buscar(){
    this.usuarioServicio.buscarUsuario(this.inputBuscar).
    subscribe((result:Array<ListUsuarios>) =>{
      this.usuarioList = result
      console.log('usuarios busqueda ' , this.usuarioList)
      //this.categoriasList = result.categorias;
      //this.paises = result.paises;

    });
  }


  editar(id:number){
    this.idUsusario = id;
    this.usuarioServicio.getUsuarioId(id).subscribe((result:ListUsuarios) =>{
      this.usuarioData = result;
      console.log("nombe del usuario" , this.usuarioData.nombres)
    });
  }
}
