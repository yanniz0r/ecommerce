import { useMutation } from "@tanstack/react-query"
import { FC } from "react"
import { cartsStoreApiControllerDeleteItemFromCart } from "@ecommerce/backend-client"

interface RemoveLineItemButtonProps {
  cartId: number
  lineItemId: number
  onRemoved?: () => void
}

export const RemoveLineItemButton: FC<RemoveLineItemButtonProps> = (props) => {
  const removeLineItemMutation = useMutation({
    async mutationFn() {
      await cartsStoreApiControllerDeleteItemFromCart(
        props.cartId,
        props.lineItemId,
        {
          baseUrl: "http://localhost:3000",
        }
      )
    }
  })
  return <button onClick={async () => {
    await removeLineItemMutation.mutateAsync()
    props.onRemoved?.()
  }}>Remove</button>
}
