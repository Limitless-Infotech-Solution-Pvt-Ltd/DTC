"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { BanknoteIcon as Bank, CreditCard, Edit, MoreVertical, Trash } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ShoppingCartIcon as PaypalIcon } from "lucide-react"

interface PaymentMethodCardProps {
  type: "bank" | "card" | "paypal"
  name: string
  details: string
  isDefault: boolean
}

export default function PaymentMethodCard({ type, name, details, isDefault }: PaymentMethodCardProps) {
  const { toast } = useToast()

  const handleSetDefault = () => {
    toast({
      title: "Default payment method updated",
      description: `${name} is now your default payment method.`,
    })
  }

  const handleEdit = () => {
    toast({
      title: "Edit payment method",
      description: "This feature is not implemented in this demo.",
    })
  }

  const handleDelete = () => {
    toast({
      title: "Delete payment method",
      description: "This feature is not implemented in this demo.",
    })
  }

  const getIcon = () => {
    switch (type) {
      case "bank":
        return <Bank className="h-5 w-5" />
      case "card":
        return <CreditCard className="h-5 w-5" />
      case "paypal":
        return <PaypalIcon className="h-5 w-5" />
      default:
        return <CreditCard className="h-5 w-5" />
    }
  }

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-muted p-2">{getIcon()}</div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{name}</h3>
              {isDefault && <Badge variant="outline">Default</Badge>}
            </div>
            <p className="text-sm text-muted-foreground">{details}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!isDefault && (
            <Button variant="outline" size="sm" onClick={handleSetDefault}>
              Set as Default
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleEdit}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  )
}

