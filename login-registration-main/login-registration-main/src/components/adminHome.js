import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faSearch,
  faEdit,
  faHome,
  faUser,
  faSignOutAlt,
  faBox,
  faTimes,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "../App.css";
import SignUp from "./signup_component"; // Asegúrate de que la ruta sea correcta

export default function AdminHome() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModule, setActiveModule] = useState("home");
  const [showForm, setShowForm] = useState(false); // Estado para mostrar el formulario de agregar usuario
  const [showInventoryForm, setShowInventoryForm] = useState(false); // Estado para mostrar el formulario de inventario

  useEffect(() => {
    if (activeModule === "users") {
      getAllUser();
    }
  }, [searchQuery, activeModule]);

  const getAllUser = () => {
    fetch(`http://localhost:5000/getAllUser?search=${searchQuery}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setData(data.data);
      });
  };

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./login";
  };

  const deleteUser = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      fetch("http://localhost:5000/deleteUser", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          userid: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.data);
          getAllUser();
        });
    }
  };

  function handleSearch(e) {
    setSearchQuery(e.target.value);
  }

  const renderUserTable = () => (
    <div>
      <h3>Usuarios</h3>
      <div style={{ position: "relative", marginBottom: 10 }}>
        <FontAwesomeIcon
          icon={faSearch}
          style={{ position: "absolute", left: 10, top: 13, color: "black" }}
        />
        <input
          type="text"
          placeholder="Buscar..."
          onChange={handleSearch}
          style={{
            padding: "8px 32px 8px 32px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "100%",
            boxSizing: "border-box",
          }}
        />
        <span
          style={{ position: "absolute", right: 10, top: 8, color: "#aaa" }}
        >
          {searchQuery.length > 0
            ? `Registros encontrados ${data.length}`
            : `Total de registros ${data.length}`}
        </span>
      </div>
      <button
        onClick={() => setShowForm(true)}
        style={{
          marginBottom: "20px",
          backgroundColor: "#f44336" /* Rojo */,
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Agregar Nuevo Usuario
      </button>
      <table style={{ width: "100%", maxWidth: "700px", margin: "0 auto" }}>
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th>#</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Tipo de Usuario</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {data.map((i, index) => (
            <tr style={{ textAlign: "center" }} key={i._id}>
              <td>{index + 1}</td>
              <td>{i.fname}</td>
              <td>{i.email}</td>
              <td>{i.userType}</td>
              <td>
                <FontAwesomeIcon
                  icon={faEdit}
                  style={{ cursor: "pointer", color: "#f0ad4e" }}
                />
              </td>
              <td>
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{ cursor: "pointer", color: "#d9534f" }}
                  onClick={() => deleteUser(i._id, i.fname)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm && (
        <div className="overlay">
          <div className="form-container">
            <span className="close-button" onClick={() => setShowForm(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
            <h2>Agregar Nuevo Usuario</h2>
            <SignUp /> {/* Componente de registro de usuario */}
          </div>
        </div>
      )}
    </div>
  );

  const renderInventoryForm = () => (
    <div className="overlay">
      <div className="form-container">
        <span
          className="close-button"
          onClick={() => setShowInventoryForm(false)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </span>
        <h2>Agregar Producto al Inventario</h2>
        <form>
          <div className="form-group">
            <label htmlFor="productName">Nombre del Producto</label>
            <input
              type="text"
              id="productName"
              placeholder="Nombre del Producto"
            />
          </div>
          <div className="form-group">
            <label htmlFor="productCategory">Categoría</label>
            <input type="text" id="productCategory" placeholder="Categoría" />
          </div>
          <div className="form-group">
            <label htmlFor="productPrice">Precio</label>
            <input type="number" id="productPrice" placeholder="Precio" />
          </div>
          <div className="form-group">
            <label htmlFor="productDescription">Descripción</label>
            <textarea
              id="productDescription"
              placeholder="Descripción"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="productStock">Stock</label>
            <input type="number" id="productStock" placeholder="Stock" />
          </div>
          <div className="form-group">
            <label htmlFor="productSKU">SKU</label>
            <input type="text" id="productSKU" placeholder="SKU" />
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: "#f44336",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            Agregar Producto
          </button>
        </form>
      </div>
    </div>
  );

  const renderContent = () => {
    if (activeModule === "users") {
      return <div>{renderUserTable()}</div>;
    } else if (activeModule === "inventory") {
      return (
        <div>
          <button
            onClick={() => setShowInventoryForm(true)}
            style={{
              marginBottom: "20px",
              backgroundColor: "#f44336" /* Rojo */,
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            <FontAwesomeIcon icon={faPlus} /> Agregar Producto
          </button>
          {showInventoryForm && renderInventoryForm()}
        </div>
      );
    } else if (activeModule === "home") {
      return <h2>Bienvenido al panel de administración</h2>;
    } else if (activeModule === "logout") {
      logOut();
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <ul>
          <li>
            <a
              href="#home"
              className={activeModule === "home" ? "active" : ""}
              onClick={() => setActiveModule("home")}
            >
              <FontAwesomeIcon icon={faHome} className="icon" />
              Home
            </a>
          </li>
          <li>
            <a
              href="#users"
              className={activeModule === "users" ? "active" : ""}
              onClick={() => setActiveModule("users")}
            >
              <FontAwesomeIcon icon={faUser} className="icon" />
              Usuarios
            </a>
          </li>
          <li>
            <a
              href="#inventory"
              className={activeModule === "inventory" ? "active" : ""}
              onClick={() => setActiveModule("inventory")}
            >
              <FontAwesomeIcon icon={faBox} className="icon" />
              Inventario
            </a>
          </li>
          <li>
            <button onClick={() => setActiveModule("logout")}>
              <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
              Logout
            </button>
          </li>
        </ul>
      </div>
      <div className="admin-content">{renderContent()}</div>
    </div>
  );
}
