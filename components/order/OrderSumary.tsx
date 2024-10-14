'use client'

import { useStore } from "@/src/store"
import ProductDetails from "./ProductDetails"
import { useEffect, useMemo, useState, useCallback } from "react"
import { formatCurrency } from "@/src/utils"
import { createOrder } from "@/actions/create-order-action"
import { OrderSchema } from "@/src/schemas"
import { toast } from "react-toastify"
import { UserButton } from "../auth/user-button"
import { useParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { requestBill } from "@/actions/request-bill-action"
import FeedbackModal from "../feedback/FeedbackModel"

type PaymentMethod = "efectivo" | "transferencia" | "tarjeta"

export default function OrderSummary() {
  const order = useStore((state) => state.order)
  const tableId = useStore((state) => state.tableId)
  const dailyOrderTotal = useStore((state) => state.dailyOrderTotal)
  const setDailyOrderTotal = useStore((state) => state.setDailyOrderTotal)
  const clearOrder = useStore((state) => state.clearOrder)
  const [isBillRequested, setIsBillRequested] = useState(false)
  const [isPolling, setIsPolling] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("efectivo")
  const [cashAmount, setCashAmount] = useState<string>("")
  const [showPaymentOptions, setShowPaymentOptions] = useState(false)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)


  const total = useMemo(
    () => order.reduce((total, item) => total + item.price * item.quantity, 0),
    [order]
  )

  const params = useParams<{ restaurant: string }>()
  
  const { data: session } = useSession()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)

    const paramTableId = urlParams.get("table") 
    if (paramTableId) {
      useStore.getState().setTableId(paramTableId)
    }
  }, [])

  const fetchDailyOrderTotal = useCallback(async () => {
    if (tableId) {
      try {
        const response = await fetch(`/api/daily-order-total?tableId=${tableId}`)
        const data = await response.json()
        
        if (data.total !== undefined) {
          setDailyOrderTotal(data.total)
        }
        
        setIsBillRequested(data.isBillRequested || false)
        return data.isBillRequested
      } catch (error) {
        console.error("Error fetching daily order total:", error)
      }
    }
    return false
  }, [tableId, setDailyOrderTotal])

  useEffect(() => {
    fetchDailyOrderTotal()
  }, [fetchDailyOrderTotal])

  const resetState = useCallback(() => {
    setIsBillRequested(false)
    setIsPolling(false)
    setShowPaymentOptions(false)
    clearOrder()
    fetchDailyOrderTotal()
  }, [clearOrder, fetchDailyOrderTotal])

  useEffect(() => {
    let intervalId: NodeJS.Timeout

    if (isPolling) {
      intervalId = setInterval(async () => {
        const billStillRequested = await fetchDailyOrderTotal()
        if (!billStillRequested) {
          resetState()
          setShowFeedbackModal(true)
          toast.success(
            "La cuenta ha sido pagada. Puede realizar nuevos pedidos.",
            { theme: "dark" }
          )
        }
      }, 5000)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isPolling, fetchDailyOrderTotal, resetState])

  const handleCreateOrder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isBillRequested) {
      toast.error(
        "La cuenta ha sido solicitada. No se pueden crear nuevas órdenes.",
        { theme: "dark" }
      )
      return
    }

    const formData = new FormData(event.currentTarget)
    const data = {
      name: session?.user?.name || formData.get("name"),
      total,
      order,
      tableId: tableId,
      restaurantID: params.restaurant,
    }

    const result = OrderSchema.safeParse(data)
    if (!result.success) {
      console.error('Order validation failed:', result.error)
      result.error.issues.forEach((issue) => {
        toast.error(issue.message, { theme: "dark" })
      })
      return
    }

    const response = await createOrder(data)

    if (response?.error) {
      toast.error(response.error, { theme: "dark" })
    } else if (response?.success) {
      toast.success("Pedido Realizado Correctamente", { theme: "dark" })
      clearOrder()
      
      if (response.dailyOrderTotal !== undefined) {
        setDailyOrderTotal(response.dailyOrderTotal)
      } else {
        fetchDailyOrderTotal()
      }
    }
  }

  const handleRequestBill = async () => {
    setShowPaymentOptions(true)
    setCashAmount("")
  }

  const handleConfirmBillRequest = async () => {
    if (paymentMethod === "efectivo") {
      const cashAmountValue = parseFloat(cashAmount)
      if (isNaN(cashAmountValue) || cashAmountValue < dailyOrderTotal) {
        toast.error(
          `El monto ingresado (${formatCurrency(cashAmountValue)}) es insuficiente. El total es ${formatCurrency(dailyOrderTotal)}. Por favor, ingrese un monto mayor o igual al total.`,
          { theme: "dark" }
        )
        return
      }
    }

    const response = await requestBill(
      tableId,
      paymentMethod,
      paymentMethod === "efectivo" ? parseFloat(cashAmount) : undefined
    )

    if (response.error) {
      toast.error(response.error, { theme: "dark" })
    } else {
      toast.success("Cuenta solicitada correctamente", { theme: "dark" })
      setIsBillRequested(true)
      setIsPolling(true)
      setShowPaymentOptions(false)
      await fetchDailyOrderTotal()
    }
  }

  const handleFeedbackSubmit = async (rating: number, comment: string) => {
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          restaurantID: params.restaurant,
          rating,
          comment,
        }),
      })

      if (response.ok) {
        toast.success("Gracias por tu feedback anónimo!", { theme: "dark" })
      } else {
        toast.error("No se pudo enviar el feedback. Por favor, intenta de nuevo.", { theme: "dark" })
      }
    } catch (error) {
      console.error('Error submitting feedback:', error)
      toast.error("Ocurrió un error al enviar el feedback.", { theme: "dark" })
    }
  }

  return (
    <aside className="w-full md:w-64 lg:w-96 h-auto lg:h-screen lg:overflow-y-scroll p-5 bg-white">
      <UserButton />
      <h1 className="text-4xl text-center font-black">Mi Pedido</h1>

      {order.length === 0 ? (
        <p className="text-center my-10">El pedido está vacío</p>
      ) : (
        <div className="mt-5">
          {order.map((item) => (
            <ProductDetails key={item.id} item={item} />
          ))}

          <p className="text-2xl mt-8 text-center">
            Total a Pagar: {""}
            <span className="font-bold">{formatCurrency(total)}</span>
          </p>

          <form className="w-full mt-10 space-y-5" onSubmit={handleCreateOrder}>
            {session?.user ? (
              <h2 className="text-xl font-semibold text-center">
                Orden a Nombre de:
                <br />
                <span className="font-normal capitalize">
                  {session.user.name}
                </span>
              </h2>
            ) : (
              <input
                type="text"
                placeholder="Ingresa Tu Nombre"
                className="bg-white border border-gray-200 p-2 w-full rounded-xl"
                name="name"
                required
              />
            )}

            <input
              type="submit"
              className={`py-2 rounded-xl uppercase text-white bg-black hover:bg-slate-800 w-full text-center cursor-pointer ${
                isBillRequested ? "opacity-50 cursor-not-allowed" : ""
              }`}
              value="Confirmar Pedido"
              disabled={isBillRequested}
            />
          </form>
        </div>
      )}

      <div className="mt-8 border-t pt-4">
        <p className="text-2xl text-center font-bold">
          Total del Día: {formatCurrency(dailyOrderTotal)}
        </p>
        {!isBillRequested && !showPaymentOptions && dailyOrderTotal > 0 && (
          <button
            onClick={handleRequestBill}
            className="mt-4 py-2 rounded-xl uppercase text-white bg-purple-800 hover:bg-purple-600 w-full text-center cursor-pointer"
          >
            Solicitar Cuenta
          </button>
        )}
        {showPaymentOptions && (
          <div className="mt-4 space-y-4">
            <select
              value={paymentMethod}
              onChange={(e) =>
                setPaymentMethod(e.target.value as PaymentMethod)
              }
              className="w-full p-2 border border-gray-300 rounded-md"
              aria-label="Método de pago"
            >
              <option value="efectivo">Efectivo</option>
              <option value="transferencia">Transferencia</option>
              <option value="tarjeta">Tarjeta</option>
            </select>
            {paymentMethod === "efectivo" && (
              <input
                type="number"
                value={cashAmount}
                onChange={(e) => setCashAmount(e.target.value)}
                placeholder="Monto en efectivo"
                className="w-full p-2 border border-gray-300 rounded-md"
                aria-label="Monto en efectivo"
                step="0.01"
                required
              />
            )}
            <button
              onClick={handleConfirmBillRequest}
              className="py-2 rounded-xl uppercase text-white bg-green-600 hover:bg-green-700 w-full text-center cursor-pointer"
            >
              Confirmar Solicitud de Cuenta
            </button>
          </div>
        )}
        {isBillRequested && (
          <p className="mt-4 text-center text-lg font-semibold text-emerald-600">
            Cuenta solicitada. Por favor, espere a que un mesero la procese.
          </p>
        )}
      </div>

      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        restaurantID={params.restaurant}
      />
    </aside>
  )
}