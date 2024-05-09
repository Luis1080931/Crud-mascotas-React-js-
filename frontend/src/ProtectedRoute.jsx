import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Swal from "sweetalert2";

function ProtectedRoute() {

    const navigate = Navigate()

  const auth = window.localStorage.getItem("token");
  const [modalOpen, setModalOpen] = useState(false)

  return (
    auth ? <Outlet /> : 
    Swal.fire({
        title: 'Error!',
        text: 'Error !, debes validarte para poder acceder a la ruta',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
  )
}

export default ProtectedRoute;