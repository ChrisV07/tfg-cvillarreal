"use client"

import { deleteRestaurant } from "@/actions/delete-restaurant-action";
import { Restaurant } from "@prisma/client";
import React, { useState } from "react";
import { toast } from "react-toastify";

type DeleteRestaurantButtonProps = {
  id: Restaurant['id'];
};

const DeleteRestaurantButton: React.FC<DeleteRestaurantButtonProps> = ({ id }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await deleteRestaurant(id);
      if (response.success) {
        toast.success("Restaurante eliminado correctamente", {theme: 'dark'});

      } else {
        toast.error("Error al Restaurante el Restaurante.", { theme: 'dark' });
      }
    } catch (error) {
      console.error("Error al eliminar Restaurante:", error);
      toast.error("Error al eliminar Restaurante.", { theme: 'dark' });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p className="mb-4">¿Estás seguro de que deseas eliminar esta Restaurante?</p>
            <div className="flex justify-center">
              
            <button
                className="bg-violet-800 text-white px-4 py-2 mr-2 rounded-lg"
                onClick={() => setShowConfirmation(false)}
              >
                Cancelar
              </button>
              
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                Sí, eliminar
              </button>
              
            </div>
          </div>
        </div>
      )}
      <button
        type="button"
        className="text-red-600 hover:text-red-800"
        onClick={() => setShowConfirmation(true)}
        disabled={isDeleting}
      >
        {isDeleting ? "Eliminando..." : "Eliminar"}
      </button>
    </>
  );
};

export default DeleteRestaurantButton;
