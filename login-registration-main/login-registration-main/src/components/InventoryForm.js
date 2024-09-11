import React, { useState } from "react";
import "../App.css"; // Asegúrate de que los estilos están en este archivo

const InventoryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí se enviará el formulario al backend
    console.log("Form data submitted:", formData);
    // Ejemplo de envío de datos:
    // const formDataToSend = new FormData();
    // Object.keys(formData).forEach(key => {
    //   formDataToSend.append(key, formData[key]);
    // });
    // fetch('http://localhost:5000/addProduct', {
    //   method: 'POST',
    //   body: formDataToSend,
    // })
    // .then(response => response.json())
    // .then(data => console.log('Success:', data))
    // .catch(error => console.error('Error:', error));
  };

  return (
    <div className="form-container">
      <h2>Agregar Producto al Inventario</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre del Producto</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Precio</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock">Cantidad en Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Categoría</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una categoría</option>
            <option value="clothing">Ropa</option>
            <option value="accessories">Accesorios</option>
            <option value="shoes">Zapatos</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="image">Imagen del Producto</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            padding: "10px 20px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Agregar Producto
        </button>
      </form>
    </div>
  );
};

export default InventoryForm;
