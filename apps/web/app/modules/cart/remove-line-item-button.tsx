import { useMutation } from "@tanstack/react-query"
import { FC } from "react"
import { backendClient } from "../backend-client"

interface RemoveLineItemButtonProps {
  cartId: number
  lineItemId: number
  onRemoved?: () => void
}

export const RemoveLineItemButton: FC<RemoveLineItemButtonProps> = (props) => {
  const removeLineItemMutation = useMutation({
    async mutationFn() {
      await backendClient.storeDeleteCartLineItem(
        props.cartId,
        props.lineItemId,
      )
    }
  })
  return <button onClick={async () => {
    await removeLineItemMutation.mutateAsync()
    props.onRemoved?.()
  }}>Remove</button>
}
