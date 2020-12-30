import axios from 'axios';
export class ProductoService{
    baseUrl="http://localhost:8080/producto/";
    obtenerTodosProductosNoEliminados(){
        return axios.get(this.baseUrl + "obtener_todos_productos_no_eliminados").then(res=>{console.log(res.data)});
    }
}