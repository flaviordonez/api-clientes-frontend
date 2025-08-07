const API_URL = "http://localhost:8080/api/clientes";
const modal = new bootstrap.Modal(document.getElementById('modalCliente'));

document.addEventListener("DOMContentLoaded", listarClientes);

function listarClientes() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
        const tbody = document.getElementById("tabla-clientes"); tbody.innerHTML = "";
        data.forEach(c => {
        const tr = document.createElement("tr"); tr.innerHTML = `
        <td>${c.id}</td>
        <td>${c.ci}</td>
        <td>${c.nombres}</td>
        <td>${c.apellidos}</td>
        <td>${c.direccion}</td>
        <td>
        <button class="btn btn-sm btn-warning me-2" onclick="editarCliente(${c.id})">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="eliminarCliente(${c.id})">Eliminar</button>
        </td>
        `; tbody.appendChild(tr);
        });
    });
}

function abrirModalNuevo() { 
    limpiarFormulario(); modal.show();
}

function guardarCliente() {
    const id = document.getElementById("cliente-id").value; 
    const cliente = {
    ci: document.getElementById("ci").value,
    nombres: document.getElementById("nombres").value,
    apellidos: document.getElementById("apellidos").value,    
    direccion: document.getElementById("direccion").value
    };

    const method = id ? "PUT" : "POST";
    const url = id ? `${API_URL}/${id}` : API_URL;

    fetch(url, { 
        method,
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(cliente)
    })
    .then(() => {
        modal.hide(); listarClientes();
    });
}

function editarCliente(id) { 
    fetch(`${API_URL}/${id}`)
    .then(r => r.json())
    .then(c => {    
        document.getElementById("cliente-id").value = c.id; 
        document.getElementById("ci").value = c.ci; 
        document.getElementById("nombres").value = c.nombres;
        document.getElementById("apellidos").value = c.apellidos;        
        document.getElementById("direccion").value = c.direccion; 
        modal.show();
    });
}

function eliminarCliente(id) {
    if (confirm("¿Eliminar este cliente?")) 
        { fetch(`${API_URL}/${id}`, { method: "DELETE" })
    .then(() => listarClientes());
    }
}

function limpiarFormulario() { 
    document.getElementById("cliente-id").value = ""; 
    document.getElementById("ci").value= "";
    document.getElementById("nombres").value = ""; 
    document.getElementById("apellidos").value = ""; 
    document.getElementById("direccion").value = "";
}
