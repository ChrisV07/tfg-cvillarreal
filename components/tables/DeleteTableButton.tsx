"use client"

import { deleteTable } from "@/actions/delete-table-action";
import { Table } from "@prisma/client";
import React, { useState } from "react";
import { toast } from "react-toastify";

type DeleteTableButtonProps = {
  id: Table['id'];
};

const DeleteTableButton: React.FC<DeleteTableButtonProps> = ({ id }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await deleteTable(id);
      if (response.success) {
        toast.success("Mesa eliminada correctamente", {theme: 'dark'});

      } else {
        toast.error("Error al eliminar la mesa.", { theme: 'dark' });
      }
    } catch (error) {
      console.error("Error al eliminar la mesa:", error);
      toast.error("Error al eliminar la mesa.", { theme: 'dark' });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p className="mb-4">¿Estás seguro de que deseas eliminar esta mesa?</p>
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

export default DeleteTableButton;
