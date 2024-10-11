"use client"

import { deleteUser } from "@/actions/delete-user-action";
import { User } from "@prisma/client";
import React, { useState } from "react";
import { toast } from "react-toastify";

type DeleteUserButtonProps = {
  id: User['id'];
};

const DeleteUserButton: React.FC<DeleteUserButtonProps> = ({ id }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await deleteUser(id);
      if (response.success) {
        toast.success("Usuario eliminado correctamente", {theme: 'dark'});

      } else {
        toast.error("Error al Eliminar el Usuario.", { theme: 'dark' });
      }
    } catch (error) {
      console.error("Error al Eliminar el Usuario:", error);
      toast.error("Error al Eliminar el Usuario.", { theme: 'dark' });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p className="mb-4">¿Estás seguro de que deseas eliminar esta Usuario?</p>
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

export default DeleteUserButton;
